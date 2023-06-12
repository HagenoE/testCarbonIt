const express = require('express');

const router = express.Router();
const AppError = require('../utils/appError.utils');
const errorHandler = require('../controller/errorHandler.controller');
const { homePage, resultPage } = require('../controller/home.controller');

router.route('/')
  .get(homePage)
  .post(resultPage);

router.all('*', (req, res, next) => {
  next(new AppError(`Can't not find ${req.originalUrl} on this server`, 404));
});

router.use(errorHandler);

module.exports = router;
