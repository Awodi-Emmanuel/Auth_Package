const mongoose = require('mongoose');


    // create user schema
const UserSchema = mongoose.Schema(
  {
    // define the properties of
    // the application
    // _id: mongoose.Schema.Types.ObjectId,

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enun: ["admin", "tutor", "student", "not assigned "],
      default: "not assigned",
    },
    isTutor: {
      type: Boolean,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);