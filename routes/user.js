const router = require('express').Router();
const { userMeBodyValidator } = require('../utils/requestValidators');

const {
    updateUser,  getMe,
} = require('../controllers/user');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getMe);
// обновляет информацию о пользователе (email и имя)
router.patch('/me', userMeBodyValidator, updateUser);

module.exports = router;
