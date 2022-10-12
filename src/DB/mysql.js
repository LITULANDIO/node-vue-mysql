const mysql = require('mysql')
const config = require('../config')

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

const connectMysql = () => {
    connection = mysql.createConnection(dbConfig)
    connection.connect((error) => {
        if(error){
            console.error('[db error]', error)
            setTimeout(connectMysql, 200)
        } else {
            console.info('DD connect')
        }
    })
    connection.on('error', error => {
        console.error('[db error]', error)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectMysql();
        } else {
            throw error;
        }
    } )
}

connectMysql();

const getAllUsers = (table) => {
    
}

const getUser = (table, id) => {

}

const addUser = (table, data) => {

}

const deleteUser = (table, id) => {

}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser
}