const Joi = require('@hapi/joi');
const projectSchemaValidate = {
  projectName: Joi.string()
    .min(6)
    .max(30)
    .required(),
  projectDesc: Joi.string()
    .min(3)
    .max(1000)
    .required(),
  projectStatus: Joi.string()
};
module.exports = projectSchemaValidate;
