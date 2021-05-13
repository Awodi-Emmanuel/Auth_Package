const express = require("express");
const connectDB = require("./db");
require("dotenv").config(); //allows us to use enviromentatl variable in .env

const { PORT } = process.env;

const userRoute = require('./routes/user.js')

const app = express();

connectDB();

/**
 * All Middlewares used
 * in the appication
 */
// initialise express middleware
app.use(express.json({ extended: false }));

app.use(userRoute)

// Basic Route - home
app.get("/", (req, res) => {
  res.json({ message: "Welcome Home!!!" });
});

// Server Port
const port = process.env.PORT || PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
