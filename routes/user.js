const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// import the router controller
const usersController = require("../controllers/usersController");

// Login user route
router.post("/api/auth/login", usersController.loginUser);

// Get logged in user
router.get("/api/auth", auth, usersController.getLoggedInUser);

module.exports = router;
