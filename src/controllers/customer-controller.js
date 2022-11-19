"use stricts";
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");

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
    await repository.create(req.body).then((x) => {
      res
        .status(201)
        .send({ message: "O cliente foi cadastrado com sucesso!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição", data: error });
  }
};


