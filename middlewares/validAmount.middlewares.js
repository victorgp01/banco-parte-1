const User = require('..//models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUserReciberTransfer = catchAsync(async (req, res, next) => {
  const { accountNumber } = req.body;

  const userReciberTransfer = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });
  if (!userReciberTransfer) {
    return next(new AppError('User No Found', 404));
  }

  req.reciverUserId = userReciberTransfer.id;

  req.userReciberTransfer = userReciberTransfer;

  next();
});

exports.validUserSenderTransfer = catchAsync(async (req, res, next) => {
  const { senderUserId } = req.body;

  const useSenderTransfer = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });
  if (!useSenderTransfer) {
    return next(new AppError('User Not Found', 404));
  }

  req.amountSenderUser = useSenderTransfer.amount;
  req.useSenderTransfer = useSenderTransfer;

  next();
});
