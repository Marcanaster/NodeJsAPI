"use stricts";
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");
var mongoose = require("mongoose");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(`${req.body.password}${global.SALT_KEY}`),
      roles: ['user'],
      active: true,
    });
    res.status(201).send({ message: "O cliente foi cadastrado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Falha ao processar a requisição", data: error });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(`${req.body.password}${global.SALT_KEY}`),
    });

    if (!customer) {
      res.status(404).send({ message: "Usuário ou senha inválidos" });
      return;
    }

    var objectId = mongoose.Types.ObjectId(customer._id);

    const token = await authService.generateToken({
      id: objectId,
      email: customer.email,
      name: customer.name,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Falha ao processar a requisição", data: error });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({ message: "Cliente não encontrado" });
      return;
    }

    var objectId = mongoose.Types.ObjectId(customer._id);

    const tokenData = await authService.generateToken({
      id: objectId,
      email: customer.email,
      name: customer.name,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Falha ao processar a requisição", data: error });
  }
};


