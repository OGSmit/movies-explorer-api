const { conflictMessage } = require('../constants/errorText');

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).send({ message: conflictMessage });
  }
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  return next();
};

module.exports = errorHandler;
