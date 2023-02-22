const Joi = require('@hapi/joi');
const userSchemaValidate = {
  name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/[a-zA-Z0-9]{3,30}/),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.number()
    .integer()
    .required(),
  age: Joi.number()
    .integer()
    .required(),
  gender: Joi.string().required(),
  created: Joi.date()
};
module.exports = userSchemaValidate;
