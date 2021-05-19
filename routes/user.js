const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// import the router controller
const usersController = require("../controllers/usersController");

const { loginUser, register, getLoggedInUser, deleteUser } = usersController;

// Login user route
router.post(
  "/api/auth/login",
  [check("email", "Please enter a valid email").isEmail(),
  check("password", "A valid password is required").exists(),
],
  loginUser
);

router.post("/signup", register);

// Get logged in user
router.get("/api/auth", auth, getLoggedInUser);

router.delete('/:userId', deleteUser);

module.exports = router;
