const Joi = require("joi");

const citySchema = Joi.object({
  name: Joi.string().min(1).required(),
  state: Joi.string().required(),
});

module.exports = citySchema;
