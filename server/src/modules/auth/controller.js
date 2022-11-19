const TABLE = 'auth'
const bcrypt = require('bcrypt')
const auth = require('../../auth')

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }

    const login = async (user, password) => {
        const data = await db.query(TABLE, { user: user });
        return bcrypt.compare(password, data.password)
            .then(result => {
                if (result === true) {
                    return auth.assignToken({...data})
                } else {
                    throw new Error('Informació inválida')
                }
            })
    }

    const addUser = async (data) => {
        const authData = {
            id: data.id
        }
        if (data.user) {
            authData.user = data.user
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }
        
        db.addUser(TABLE, authData)

    }


    return {
        addUser,
        login
    }
}