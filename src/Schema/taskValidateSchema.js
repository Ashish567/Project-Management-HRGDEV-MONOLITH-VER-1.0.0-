const Joi = require('@hapi/joi');
const taskchemaValidate = {
  projectId: Joi.string(),
  taskName: Joi.string()
    .min(6)
    .max(30)
    .required(),
  taskDesc: Joi.string()
    .min(3)
    .max(1000)
    .required(),
  taskStatus: Joi.string()
};
module.exports = taskchemaValidate;
