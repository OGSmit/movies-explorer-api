const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorisationError = require('../error/authorisation-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, '400 Поле "email" должно быть заполнено'],
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '400 Введён некорректный email',
      },
    },
    password: {
      type: String,
      minlength: [8, '400 Минимальная длина поля "password" - 8'],
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, '400 Минимальная длина поля "name" - 2'],
      maxlength: [30, '400 Максимальная длина поля "name" - 30'],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorisationError('Неправильные email или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
