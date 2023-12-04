/** @format */

require("./db/mongoose");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
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
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      return res.status(200).send(tasks);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      } else {
        return res.send(task);
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
