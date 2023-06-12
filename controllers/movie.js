const Movie = require('../models/movie');
const NotFoundError = require('../error/not-found-error');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovieList = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.createMovieByResBody = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.deleteCardById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) { throw new NotFoundError('Нет фильма с таким id'); }
      return movie.deleteOne()
        .then((movieData) => {
          res.send({ data: movieData });
        });
    })
    .catch(next);
};