/** @format */

require("../src/db/mongoose");

const User = require("../src/models/User");

// const id = "656dc5e8bb355f1c40b185cb";
// User.findByIdAndUpdate(id, { age: 15 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 24 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });

  const count = await User.countDocuments({ age });

  return { user: user, count: count };
};

updateAgeAndCount("656d7e695b979b594de076ef", 26)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
