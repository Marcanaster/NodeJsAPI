"use stricts";

const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const indexRoute = require('./routes/index');
const productRoute = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
