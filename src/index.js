/** @format */

require("./db/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");

const multer = require("multer");
const upload = multer({
  dest: "images",
});
app.post("/upload", upload.single("upload"), async (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log("listening on port " + port);
});
