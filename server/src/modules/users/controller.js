const auth = require('../auth');

const TABLE = 'users'

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getAllUsers = () => db.getAllItems(TABLE)
    const getUser = (id) => db.getItem(TABLE, id)
    const addUser = async (body) => {
        const user = {
            id: body.id,
            name: body.name,
            email: body.email,
            role: body.role,
            photo: body.photo,
            groups: body.groups
        }
        const requestUser = await db.insertItem(TABLE, user)
        let insertId = 0;
        if (body.id === 0) {
            insertId = requestUser.insertId
        } else {
            insertId = body.id
        }
        let requestAuth = ''
        if (body.user || body.password) {
            requestAuth = await auth.addUser({
                id: insertId,
                user: body.user,
                password: body.password
            })
        }
        return requestAuth
    }
    const deleteUser = (body) => db.deleteItem(TABLE, body)

    return {
        getAllUsers,
        getUser,
        addUser,
        deleteUser

    }
}