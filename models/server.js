const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/db');
const { usersRouter } = require('../routes/users.routes');
const { trasferRouter } = require('../routes/transfers.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3500;

    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCTION');
    }

    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, trasferRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on port ${this.port}`);
    });
  }
}

module.exports = Server;
