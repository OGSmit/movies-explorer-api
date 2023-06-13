const router = require('express').Router();
const { createUser, login } = require('../controllers/user');
const { signUpBodyValidator, signInBodyValidator } = require('../utils/requestValidators');
const auth = require('../middlewares/auth');
const routesUser = require('./user');
const routesMovie = require('./movie');
const NotFoundError = require('../error/not-found-error');

router.post('/signup',signUpBodyValidator, createUser); // ok

router.post('/signin', signInBodyValidator, login); // ok

router.use('/users', auth, routesUser);
router.use('/movie', auth, routesMovie);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
