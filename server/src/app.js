const express = require('express');
const morgan = require('morgan')
const http = require("http"); 
const users = require('./modules/users/routes')
const auth = require('./modules/auth/routes')
const groups = require('./modules/groups/routes')
const wishes = require('./modules/wishes/routes')
const guests = require('./modules/guests/routes')
const mail = require('./modules/mail/routes')
const cors = require('cors')
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
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// configuration
app.set('port', port)
// routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/user/group', groups)
app.use('/api/user/group/guests', guests)
app.use('/api/user/wishes', wishes)
app.use('/api/users/mail', mail)

app.use(error)

module.exports = app;