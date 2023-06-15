const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../error/not-found-error');
const { notFoundErrorMessage } = require('../constants/errorText');

// возвращает информацию о пользователе (email и имя)
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError(notFoundErrorMessage));
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail()
    .then((user) => res.status(200)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(notFoundErrorMessage));
      } else {
        next(err);
      }
    });
};

// создать пользователя с переданными в теле email, password и name
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        email,
      });
    })
    .catch(next);
};

// проверяет переданные в теле почту и пароль и возвращает JWT
const { JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? 'super-puper-secret-key' : JWT_SECRET, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};
