require('dotenv').config()

module.exports = {
    app: {
        port: process.env.PORT || 4000
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'friends'

    }
}
//     mysql: {
//         host: process.env.MYSQL_HOST || 'localhost:3306',
//         user: process.env.MYSQL_USER || 'litus',
//         password: process.env.MYSQL_PASSWORD || 'Nwes35_8',
//         database: process.env.MYSQL_DB || 'test-db'

//     }
// }