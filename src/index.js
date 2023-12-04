/** @format */

require("./db/mongoose");
const express = require("express");
const User = require("./models/user");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(() => {
      res.send("error");
    });
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
