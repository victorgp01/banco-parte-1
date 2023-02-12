const Transfer = require('../models/transfer.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.sendTransfer = catchAsync(async (req, res, next) => {
  const { amount, senderUserId } = req.body;

  const {
    reciverUserId,
    amountSenderUser,
    useSenderTransfer,
    userReciberTransfer,
  } = req;

  if (amount > amountSenderUser) {
    return next(new AppError('insufficient funds', 400));
  }

  if (reciverUserId === senderUserId) {
    return next(new AppError('they cannot transfer to your same account', 400));
  }

  const newAmountMakeTransfer = +useSenderTransfer.amount - amount;

  const newAmountUserRecicer = +userReciberTransfer.amount + amount;

  await userReciberTransfer.update({
    amount: newAmountUserRecicer,
  });

  await useSenderTransfer.update({
    amount: newAmountMakeTransfer,
  });

  const newTransfer = await Transfer.create({
    amount,
    senderUserId,
    reciverUserId,
  });

  res.status(200).json({
    status: 'success',
    message: 'transfer succefully',
    newTransfer,
  });
});
