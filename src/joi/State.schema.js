const Joi = require("joi");

const stateSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = { stateSchema };
