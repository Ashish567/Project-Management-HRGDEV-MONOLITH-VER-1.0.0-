const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const User = require('./../Models/userModel');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.id);
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

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (!allowedFields.includes(el)) newObj[el] = obj[el];
  });
  console.log('inside object filter');
  console.log(newObj);
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, ['name', 'email', 'phone']);
  if (req.file) filteredBody.photo = req.file.filename;
  console.log(filteredBody);

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});
