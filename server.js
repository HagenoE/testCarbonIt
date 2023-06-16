const express = require('express');
const upload = require('express-fileupload');
const bunyan = require('./logger/logger.helper');

const app = express();
const router = require('./router/router');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(upload());

app.use(router);

module.exports = app;
