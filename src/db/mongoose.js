/** @format */

const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParaser: true,
  useCreateIndex: true, // used to create indexes when working with mongodb
  useFindAndModify: false,
});
