/* eslint-disable no-param-reassign */
const logger = require('../logger/logger.helper');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  logger.error(err.message ?? 'erreur server');
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message ?? 'erreur server',
  });
};
