
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var helmet = require("helmet");
const userRouter = require("./2-routes/UserRoutes");
const urlRouter = require("./2-routes/UrlRoutes");

const error4040 = require("./middleware/Error404");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const URI_LINK = process.env.MONGODB_CONNECTION_LINK;

const port = process.env.PORT || 8080;


//urlRouter
app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);


app.use("/", error4040);

mongoose
  .connect(URI_LINK)
  .then((result) => {
    console.log("\x1b[36m", "connected to mongo", "\x1b[0m");

    app.listen(port, () => {
      console.log("connected to " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
