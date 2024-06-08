const express = require("express");
const orderSchema = require("../joi/Order.schema");
const Send = require("../rabbit/Send.class");

const router = express.Router();

router.post("/create", (req, res) => {
  const { error, value } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: error.details[0].message,
    });
  }

  const { customerId, amount, date } = value;
  new Send("order").execute({ customerId, amount, date });

  return res.status(201).send({
    message: "Order Created",
  });
});

module.exports = router;
