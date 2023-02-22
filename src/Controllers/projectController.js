const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const Project = require('./../Models/projectModel');
const projectSchemaValidate = require('../Schema/projectSchemaValidate');
const Joi = require('@hapi/joi');
const APIFeatures = require('./../Utils/APIFeatures');

exports.getProject = catchAsync(async (req, res, next) => {
  let query = Project.findById(req.params.id);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getProjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Project.find(), req.query)
    .filter()
    .paginate();
  const projects = await features.query;

  if (!projects) {
    return next(new AppError('No Projects found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: projects
    }
  });
});

function joiValidateForProj(obj) {
  return Joi.validate(obj, projectSchemaValidate);
}

exports.postProject = catchAsync(async (req, res, next) => {
  var result = joiValidateForProj({ ...req.body });

  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  const newProject = await Project.create({
    projectName: req.body.projectName,
    projectDesc: req.body.projectDesc,
    projectStatus: req.body.projectStatus
  });

  // 3) Send it to user's email
  try {
    res.status(200).json({
      status: 'success',
      message: 'New Project Created!',
      data: newProject
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError('There was an error creating the project. Try again later!'),
      500
    );
  }
});

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
