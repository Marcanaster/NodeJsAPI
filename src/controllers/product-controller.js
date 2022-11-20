"use stricts";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");
const azure = require("azure-storage");
const config = require("../config");
const guid = require("guid");

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
    const blobSvc = azure.createBlobService(config.containerConnectionString);

    let filename = `${guid.raw().toString()}.jpg`;
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer.from(matches[2], "base64");
    await blobSvc.createBlockBlobFromText(
      "product-images",
      filename,
      buffer,
      {
        contentType: type,
      },
      function (error, result, response) {
        if (error) {
          filename = "default-product.png";
        }
      }
    );
    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: `https://marcanaster.blob.core.windows.net/product-images/${filename}`,
    });
    res.status(201).send({ message: "O produto foi cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "O produto foi alterado com sucesso !" });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: "O produto foi removido com sucesso !" });
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a requisição" });
  }
};
