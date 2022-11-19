"use stricts";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'É obrigatório informar o slug do produto'],
    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'É obrigatório informar descrição do produto']
  },
  price: {
    type: Number,
    required: [true, 'É obrigatório informar o preço do produto']
  },
  active:{
    type: Boolean,
    required: true,
    default: true
  },
  tags: [
    {
        type: String,
        require: true
    }
  ]
});

module.export = mongoose.model("Product", schema);
