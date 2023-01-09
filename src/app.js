const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const postsRouter = require("./routes/api/postsRouter");
const authRouter = require("./routes/api/authRouter");
const filesRouter = require("./routes/api/filesRouter");
const {errorHandler} = require('./helper/apiHelpers')

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);
app.use(express.static("./"));

app.use(errorHandler);

module.exports = app;
