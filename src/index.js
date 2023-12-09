/** @format */

require("./db/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log("listening on port " + port);
});
