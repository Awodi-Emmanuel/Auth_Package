const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// import the router controller
const usersController = require("../controllers/usersController");

const { loginUser, registerUser, getLoggedInUser } = usersController;

// Login user route
router.post("/api/auth/login", loginUser);

router.post("/signup", registerUser);

// Get logged in user
router.get("/api/auth", auth, getLoggedInUser);

module.exports = router;
