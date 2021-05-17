const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
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
    res.status(500).send("Server Error!");
    ``;
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
    console.log(user)
    if (!user){
      res
        .status(400)
        .json({ statusCode: 400, message: "Invalid credentials" });
    }
    //  else..123
    //  check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      res.status(400).json({
        statusCode: 400,
        message: "invalid credentials",
      });
    }
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
        if (err) {throw err}
        console.log(token)
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

exports.register = async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              // _id: new mongoose.Schema.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              // role: req.body.userRole,
              // tutor: req.body.isTutor,
              // admin: req.body.isAdmin,
              password: hash,
            })
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.deleteUser = async (req, res, next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then(result =>{
    res.status(200)
    .json({
      message: 'User deleted'
    });
  })
  .catch(err =>  {
    console.log(err);
    res.status(500)
    .json({
      error: err
    });
  });
}
