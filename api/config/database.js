const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(`connect to ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
