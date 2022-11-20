"use stricts";
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
const md5 = require('md5');

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
    await repository.create({
      name : req.body.name,
      email: req.body.email,
      password: md5(`${req.body.password}${global.SALT_KEY}`),
      active: true
    });
    res.status(201).send({ message: "O cliente foi cadastrado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Falha ao processar a requisição", data: error });
  }
};
