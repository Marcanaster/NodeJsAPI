"use stricts";

const { default: mongoose } = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = (req, res, next) => {
  repository
    .get()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  repository
    .findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  repository
    .find({ tags: req.params.tag }, "title description price slug")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  //  let contract = new ValidationContract();
  //  contract.hasMinLen(req.body.title, 3, 'O Título deve conter pelo menos 3 caracteres');

  //  if(!contract.isValid()){
  //   res.status(400).send(contract.errors()).end();
  //  }

  repository
    .create(req.body)
    .then((x) => {
      res
        .status(201)
        .send({ message: "O produto foi cadastrado com sucesso!" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto", data: e });
    });
};

exports.put = (req, res, next) => {
  repository
    .update(req.params.id, req.body)
    .then((data) => {
      res.status(201).send({
        message: "O produto foi alterado com sucesso !",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar o produto",
        data: e,
      });
    });
};

exports.delete = (req, res, next) => {
  repository.delete(req.params.id)
    .then((data) => {
      res.status(201).send({
        message: "O produto foi removido com sucesso !",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao remover o produto",
        data: e,
      });
    });
};
