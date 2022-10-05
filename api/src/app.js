const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const dogsRouter = require('./routes/dogs');
const temperamentsRouter = require('./routes/temperaments');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

require('./db.js');

const server = express();

server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', /*'http://localhost:5173'*/ 'http://127.0.0.1:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/dogs', dogsRouter);
server.use('/auth', authRouter);
server.use('/temperaments', temperamentsRouter);
server.use('/users', usersRouter);
server.use('/comments', commentsRouter);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
