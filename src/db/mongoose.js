/** @format */

const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
  useNewUrlParaser: true,
  useCreateIndex: true, // used to create indexes when working with mongodb
  useFindAndModify: false,
});
