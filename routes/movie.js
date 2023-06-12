const router = require('express').Router();
const { userMeBodyValidator } = require('../utils/requestValidators');

const {
    getMovieList, createMovieByResBody, deleteMovieById
} = require('../controllers/movie');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovieList);
// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', userMeBodyValidator, createMovieByResBody);
// удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovieById);

module.exports = router;