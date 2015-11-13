﻿var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var winston = require('winston');
var expressWinston = require('express-winston');

var app = express();
app.use(bodyParser.json());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/request.log'
        })
    ]
}));

app.use('/api/posts', require('./controllers/api/posts'));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/users', require('./controllers/api/users'));
app.use(require('./controllers/static'));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/error.log'
        })
    ]
}));

app.listen(config.port, function () {
    console.log('Server listening on', config.port);
});
