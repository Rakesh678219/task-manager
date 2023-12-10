/** @format */

const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Upload  failed"));
    }
    cb(undefined, true);
  },
});
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Logout successfully");
  } catch (err) {
    res.status(404).send(err);
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged out of all devices successfully");
  } catch (err) {
    res.status(404).send(err);
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update operation !" });
  }
  try {
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    //problem with middleware here
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    return res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    return res.send(req.user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("Successfully uploaded image");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete("/users/me/avatar", auth, async (req, res) => {
  if (!req.user.avatar) {
    res.status(400).send("No avatar available");
  }
  req.user.avatar = undefined;
  await req.user.save();
  res.send("Successfully deleted avatar");
});
module.exports = router;
