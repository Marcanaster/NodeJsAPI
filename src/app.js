"use stricts";

const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: `API rodando na porta ${port}`,
    version: "0.0.2",
  });
});

const create = router.post("/", (req, res, next) => {
  res.status(201).send(req.body);
});

const put = router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  res.status(201).send({
    id: id,
    item: req.body});
});

const del = router.delete("/:id", (req, res, next) => {
  res.status(201).send(req.body);
});

app.use("/", route);
app.use("/products", route);

module.exports = app;
