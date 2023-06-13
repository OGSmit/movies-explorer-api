const router = require('express').Router();
const { updateUserBodyValidator } = require('../utils/requestValidators');

const {
    updateUser,  getMe,
} = require('../controllers/user');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getMe); // ok
// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserBodyValidator, updateUser); // ok

module.exports = router;
