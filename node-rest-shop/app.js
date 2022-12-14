const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const productRoutes = require("./api/routes/products");

const orderRoutes = require("./api/routes/orders");

const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://shankar_gopu:99Bhavani@node-assignment.4bvkl.mongodb.net/?retryWrites=true&w=majority"
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT ,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
app.use(morgan("dev"));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use((req, res, next) => {
  const error = new Error("Requested URL not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
