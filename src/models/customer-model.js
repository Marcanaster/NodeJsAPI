"use stricts";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active:{
    type: String,
    required: true
  }
});

module.export = mongoose.model("Customer", schema);
