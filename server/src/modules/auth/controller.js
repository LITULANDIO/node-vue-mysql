const TABLE = 'auth'
const auth = require('../../auth');
const bcrypt = require('bcrypt')

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }

    const login = async (user, password) => {
        let data;
        try{
            data = await db.query(TABLE, { user: user });
            console.log(user, {data})
            data.active = 1
            db.insertItem(TABLE, data)
            console.log(data)
        }catch(error){
            return {
                error: true,
                msg: "La contraseña o el nombre de usuario no son correctos"

            }
            
        }
        return bcrypt.compare(password, data.password)
        .then(result => {
                if (result === true) {
                    return { token: auth.assignToken({...data}), id: data.id, user: data.user }
                } else {
                    return {
                        error: true,
                        msg: "La contraseña o el nombre de usuario no son correctos"
        
                    }
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

    const getUsers =  () => db.getItems(TABLE, 'id, user')

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
        logout,
        getUsers
    }
}