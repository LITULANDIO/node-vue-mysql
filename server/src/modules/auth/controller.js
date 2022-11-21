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
        data.active = 1
        db.insertItem(TABLE, data)
        console.log(data)
        return bcrypt.compare(password, data.password)
            .then(result => {
                if (result === true) {
                    return auth.assignToken({...data})
                } else {
                    throw new Error('Informació inválida')
                }
            })
    }

    const logout = async (data) => {
        data.active = 0
        const authData = {
            id: data.id,
            user: data.user,
            password: await bcrypt.hash(data.password.toString(), 5),
            active: data.active,
        }
        db.insertItem(TABLE, authData)
    }

    const addUser = async (data) => {
        const authData = {
            id: data.id,
            active: data.active
        }
        if (data.user) {
            authData.user = data.user
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }
        
        db.insertItem(TABLE, authData)

    }


    return {
        addUser,
        login,
        logout
    }
}