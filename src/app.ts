import path from 'path';
require('dotenv').config();
import logger from 'morgan';
import db from './db/connect';
import express from 'express';
require('express-async-errors');
import routes from './routes/routes';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

const app = express();

db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
