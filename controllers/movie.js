const Movie = require('../models/movie');
const NotFoundError = require('../error/not-found-error');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovieList = (req, res, next) => {
  const ownerId = req.user._id
  Movie.find({owner: ownerId})
    .then((movies) => {
      console.log(movies)
      res.send(movies)
    })
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
    movieId,
    nameRU,
    nameEN
  } = req.body;

  const owner = req.user._id

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.deleteMovieById = (req, res, next) => {
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