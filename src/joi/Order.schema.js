const Joi = require('joi');

const orderSchema = Joi.object({
    customerId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required()
});

module.exports = orderSchema;