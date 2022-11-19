const request = require('./requests')

const errors = (err, req, res, next) => {
    console.error(`[error, ${err}`)
    const message = err.message || 'Error intern'
    const status = err.status || 500
    request.error(req, res, message, status)
}

module.exports = errors