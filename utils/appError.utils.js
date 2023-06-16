class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.staatusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constuctor);
  }
}

module.exports = AppError;
// TODO
// journalisation
// ReadMe
