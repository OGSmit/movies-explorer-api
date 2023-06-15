const jwt = require('jsonwebtoken');
const AuthorisationError = require('../error/authorisation-error');
const { authtorisationMessage } = require('../constants/errorText');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorisationError(authtorisationMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'super-puper-secret-key' : JWT_SECRET);
  } catch (err) {
    return next(new AuthorisationError(authtorisationMessage));
  }

  req.user = payload;

  return next();
};
