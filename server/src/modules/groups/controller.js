const uniqid = require('uniqid'); 
const bcrypt = require('bcrypt');
const { json } = require('express/lib/response');

const TABLE = 'groups'

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getAllGroups = () => db.getAllItems(TABLE)
    const getGroup = (id) => db.getItem(TABLE, id)
    const addGroup = async (body) => {
        const group = {
            id: body.id,
            code: await bcrypt.hash(uniqid(), 2),
            admin: body.admin,
            name: body.name,
            date: body.date,
            budget: body.budget,
            guests: body.guests,
        }
        const requestGroup = await db.insertItem(TABLE, group)
        return requestGroup
    }
    const addGuest = async (body) => {
        const group = {
            id: body.id,
            admin: body.admin,
            name: body.name,
            date: body.date,
            budget: body.budget,
            guests: body.guests
        }
        const requestGroup = await db.insertItem(TABLE, group)
        return requestGroup
    }
    const deleteGroup = (body) => db.deleteItem(TABLE, body)

    return {
        getAllGroups,
        getGroup,
        addGroup,
        deleteGroup,
        addGuest

    }
}