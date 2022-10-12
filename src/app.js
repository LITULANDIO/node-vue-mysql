const express = require('express');
const config = require('./config');

const users = require('./modules/users/routes')
const app = express();

app.set('port', config.app.port)

app.use('/api/users', users)

module.exports = app;