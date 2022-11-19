"use stricts";

const { default: mongoose } = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
  const res = await Order.find({}).populate('customer', 'name').populate('items.product');
  return res;
};

exports.create = async(data) => {
  var order = new Order(data);
  await order.save();
};


