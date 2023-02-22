const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const Task = require('./../Models/taskModel');
const taskValidateSchema = require('../Schema/taskValidateSchema');
const Joi = require('@hapi/joi');
const APIFeatures = require('./../Utils/APIFeatures');

exports.getTask = catchAsync(async (req, res, next) => {
  let query = Task.findById(req.params.id);
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

exports.getTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query).filter().paginate();
  const tasks = await features.query;

  if (!tasks) {
    return next(new AppError('No Tasks found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: tasks
    }
  });
});

function joiValidateForProj(obj) {
  return Joi.validate(obj, taskValidateSchema);
}

exports.postTask = catchAsync(async (req, res, next) => {
  var result = joiValidateForProj({ ...req.body });

  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  const newProject = await Task.create({
    projectId: req.body.projectId,
    taskName: req.body.taskName,
    taskDesc: req.body.taskDesc,
    taskStatus: req.body.taskStatus
  });

  try {
    res.status(200).json({
      status: 'success',
      message: 'New Task Added!',
      data: newProject
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError('There was an error creating the task. Try again later!'),
      500
    );
  }
});
