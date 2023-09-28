const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_DB)
    .then((connection) => {
      console.log(`Database Connected ${connection.connection.host}`);
    })
    // .catch((error) => {
      // console.log(error);
      // process.exit(1);
    // });
};

module.exports = dbConnection;
