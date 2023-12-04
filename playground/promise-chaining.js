/** @format */

require("../src/db/mongoose");

const User = require("../src/models/User");

const id = "656dc5e8bb355f1c40b185cb";
User.findByIdAndUpdate(id, { age: 15 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 24 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
