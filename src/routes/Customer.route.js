const express = require("express");
const amqp = require("amqplib/callback_api");
const customerSchema = require("../joi/Customer.schema");
const Send = require("../rabbit/Send.class");
const customerController = require("../controllers/Customer.controller");

const router = express.Router();

router.post("/create", (req, res) => {
  const { error, value } = customerSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: error.details[0].message,
    });
  }
  const { name, email } = value;
  new Send("customer").execute({ name, email });

  return res.status(201).send({
    message: "User Created",
  });
});

router.post("/filter", async (req, res) => {
  try {
    const filters = req.body.filters;
    const customers = await customerController.getFilteredCustomers(filters);
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
