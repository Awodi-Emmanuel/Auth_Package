const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;

const db = process.env.MONGO_URL || MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("Mongo DB Connected ...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//     .then(() => {
//       console.log("Database Connection Successful");
//     })
//     .catch((err) => {
//       console.error(err.message);
//     });
// };
