'use stricts';

const express = require("express");
const app = express();
const router = express.Router();

var route = router.get("/", (req, res, next) => {
    res.status(200).send({
      title: `API rodando na porta ${port}`,
      version: "0.0.2",
    });
  });

  app.use("/", route);

  module.exports = app;