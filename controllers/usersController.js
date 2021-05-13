const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SECRET } = process.env;

// @route GET api/auth/login
// @desc  Auth user(student, tutor, admin) and get Token
// @access public
exports.getLoggedInUser = async (req, res) => {
  try {
    //Get user from db
    const user = await User.findById(req.user.id).select("password");
    // return user
    res.json({
      statusCode: 200,
      message: "user gotten successfully",
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");``
  }
};
// @route POST api/auth/login
// @desc  Auth user(student, tutor, admin) and get Token
// @access public
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // else
  // destructure request body

  const { email, password } = req.body;
  console.log({ email, password });

    try {
      // initialise user
      let user = await User.findOne({ email: email });

      if (!user)
        return res
          .status(400)
          .json({ statusCode: 400, message: "Invalid credentials" });

      //  else..123
      //  check the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          statusCode: 400,
          message: "invalid credentials",
        });
      //   else
      // there's a match, send token
      // send playload, and signed token
      const playload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        playload,
        SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            statusCode: 200,
            message: "Login in successfully",
            user: {
              firstName: user.firstName,
              lastName: User.lastName,
              email: user.email,
              userRole: user.Role,
              isTutor: user.isTutor,
              isAdmin: user,
              isAdmin,
            },
            token,
          });
        }
      );
    } catch (errors) {
      console.error(err.message);
      res.status(500).send("server error");
    }
};
