const db = require('../../DB/mysql')
const controller = require('./controller')

module.exports = controller(db)