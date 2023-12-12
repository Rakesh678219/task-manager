/** @format */

const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_URL;

mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.error(error);
  });
