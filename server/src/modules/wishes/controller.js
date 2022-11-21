const TABLE = 'wishes'

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getWishes = (id) => db.getItem(TABLE, id)
    const addWishes = async (body) => {
        const wishes = {
            id: body.id,
            idUser: body.idUser,
            wish1: body.wish1,
            wish2: body.wish2,
            wish3: body.wish3,
            wish4: body.wish4,
            wish5: body.wish5
        }
        const requestWishes = await db.insertItem(TABLE, wishes)
        return requestWishes
    }
 
    const deleteWishes = (body) => db.deleteItem(TABLE, body)

    return {
        getWishes,
        addWishes,
        deleteWishes,
    }
}