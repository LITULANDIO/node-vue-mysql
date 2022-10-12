const db = require('../../DB/mysql');
const TABLE = 'Users'

const getAllUsers = () => db.getAllUsers(TABLE)


module.exports = {
    getAllUsers
}