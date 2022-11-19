"use stricts";

const { default: mongoose } = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await repository.findById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.find(
      { tags: req.params.tag },
      "title description price slug"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create(req.body).then((x) => {
      res
        .status(201)
        .send({ message: "O produto foi cadastrado com sucesso!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body).then((data) => {
      res.status(200).send({
        message: "O produto foi alterado com sucesso !",
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: "O produto foi removido com sucesso !",
    });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};
