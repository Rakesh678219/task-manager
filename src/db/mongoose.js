/** @format */

const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParaser: true,
  useCreateIndex: true, // used to create indexes when working with mongodb
});

/*
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({ name: "Rakesh", age: "mike" });

me.save()
  .then((res) => {
    console.log(me);
  })
  .catch((err) => {
    console.log(err);
  });
*/

const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const myTask = new Task({
  description: "My first task",
  completed: false,
});

myTask
  .save()
  .then(() => {
    console.log(myTask);
  })
  .catch((err) => {
    console.log(err);
  });
