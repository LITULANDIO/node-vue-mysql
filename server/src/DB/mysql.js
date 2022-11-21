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
            console.info('DB connect')
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

const getAllItems = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const getItem = (table, id) => {
    console.log('[get =>', table, id)
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const insertItem = (table, data) => {
    console.log('[AddUser =>', data)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const deleteItem = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

function query(table, consult) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, consult, (error, result) => {
            error ? reject(error) : resolve(result[0])
        })
    })
}


module.exports = {
    getAllItems,
    getItem,
    insertItem,
    deleteItem,
    query
}



// const updateUser = (table, data) => {
//     return new Promise((resolve, reject) => {
//         connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
//             error ? reject(error) : resolve(result)
//         })
//     })
// }

// const addUser = (table, data) => {
//     if(data && data.id === 0) {
//         return insertUser(table, data)
//     } else {
//         return updateUser(table, data)
//     }
// }
