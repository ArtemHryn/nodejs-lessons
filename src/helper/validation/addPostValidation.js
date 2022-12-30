const Joi = require("joi");

const addPostSchema = Joi.object({
  topic: Joi.string().min(3).max(60).required(),
  text: Joi.string().min(10).max(400).required(),
});

module.exports = { addPostSchema };
