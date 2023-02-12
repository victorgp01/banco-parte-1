const { Router } = require('express');
const { sendTransfer } = require('../controllers/transfer.controlles');
const {
  validUserReciberTransfer,
  validUserSenderTransfer,
} = require('../middlewares/validAmount.middlewares');

const router = Router();

router.post(
  '/',
  validUserReciberTransfer,
  validUserSenderTransfer,
  sendTransfer
);

module.exports = {
  trasferRouter: router,
};
