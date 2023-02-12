const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const accountNumber = Math.floor(Math.random() * 999999) + 1;
  const newRegister = await User.create({
    name,
    password,
    accountNumber,
  });

  res.status(201).json({
    status: 'Success',
    message: 'The registration was successful',
    newRegister,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, accountNumber } = req.body;
  const newLogin = await User.findOne({
    where: {
      password,
      accountNumber,
      status: true,
    },
  });
  res.status(200).json({
    status: 'Success',
    message: 'Login successfull',
    newLogin: this.login,
  });

  if (!newLogin) {
    return next(new AppError('User Not Login', 404));
  }
  next();
});
