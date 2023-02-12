const { Router } = require('express');
const { register, login } = require('../controllers/users.controllers');

const router = Router();

router.post('/signup', register);

router.post('/login', login);

module.exports = {
  usersRouter: router,
};
