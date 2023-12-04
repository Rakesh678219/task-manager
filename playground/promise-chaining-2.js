/** @format */

require("../src/db/mongoose");
const Task = require("../src/models/task");

const id = "656d891c5597bd7ba8b4c414";
Task.findByIdAndDelete(id)
  .then((res) => {
    console.log("Deleted item with id " + id + "successfully");
    return Task.countDocuments({ completed: false });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
