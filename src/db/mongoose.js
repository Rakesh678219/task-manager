/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParaser: true,
  useCreateIndex: true, // used to create indexes when working with mongodb
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Invalid age");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain the word password");
      }
    },
  },
});

// const me = new User({
//   name: "   keni   ",
//   email: "KENI@gmail.com",
//   password: "sqksnsa",
// });

// me.save()
//   .then((res) => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const myTask = new Task({
  description: "  My first task  ",
});

myTask
  .save()
  .then(() => {
    console.log(myTask);
  })
  .catch((err) => {
    console.log(err);
  });
