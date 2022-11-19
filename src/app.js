"use stricts";

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://marcanaster:481521@cluster0.ba9caoz.mongodb.net/?retryWrites=true&w=majority');

const Product = require('./models/product-model')
const Customer = require('./models/customer-model');
const Order = require('./models/order-model');

const indexRoute = require('./routes/index');
const productRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);


module.exports = app;
