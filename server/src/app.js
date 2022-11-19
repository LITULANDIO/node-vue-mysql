const express = require('express');
const morgan = require('morgan')
const http = require("http"); 
const users = require('./modules/users/routes')
const auth = require('./modules/auth/routes')
const app = express();
const error = require('./red/errors')
const host = 'localhost';
const port = '4000'; 
// const host = 'https://dev-test.h2942241.stratoserver.net';
// const port = '443'; 
//let server = require('http').createServer(app);
const requestListener = function (req, res) {}; 
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}); 

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// configuration
app.set('port', port)
// routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

module.exports = app;