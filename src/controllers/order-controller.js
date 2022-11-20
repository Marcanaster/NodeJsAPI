"use stricts";
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/order-repository");
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.post = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    await repository.create({
        customer: data.id,
        number: guid.raw().substring(0,6),
        items: req.body.items
    });
    res.status(201).send({ message: "O pedido foi cadastrado com sucesso!" });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Falha ao processar a requisição", data: "error: " + error });
  }
};
