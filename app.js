require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter')

const { PORT, DB_ADRESS } = process.env;
const app = express();

app.use(cors()); // настройка будет после деплоя фронта 

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADRESS);

app.use(requestLogger);

app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});