/** @format */

require("./db/mongoose");
const express = require("express");

const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routers/user");

app.use(express.json());
app.use(userRouter);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    return res.status(500).send(err);
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update operation !" });
  }
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).send("Task not found");
    }
    return res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send("No such task");
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
