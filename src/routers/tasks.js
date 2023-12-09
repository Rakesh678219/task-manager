/** @format */

const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });//one way
    await req.user.populate("tasks").execPopulate(); //other way
    res.status(200).send(req.user.tasks);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update operation !" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("Task not found");
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    task.save();
    //issue with the middleware
    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    return res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("No such task");
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
