"use stricts";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString);

const Product = require("./models/product-model");
const Customer = require("./models/customer-model");
const Order = require("./models/order-model");

const indexRoute = require("./routes/index");
const productRoute = require("./routes/products-route");
const customerRoute = require("./routes/customer-router");
const orderRoute = require("./routes/order-route");

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, x-access-token');
    res.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
