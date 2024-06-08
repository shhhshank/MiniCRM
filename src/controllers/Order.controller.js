const Order = require("../models/Order.schema");

exports.addOrder = async (_order) => {
  const { customerId, amount, date } = _order;
  const order = new Order({ customerId, amount, date });
  await order.save();
};
