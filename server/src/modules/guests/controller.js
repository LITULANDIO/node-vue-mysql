const { json } = require('express/lib/response');

const TABLE = 'guests'

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getGuestsOfGroup = async (id) => {
        const guests = await db.getAllItems(TABLE)
        const users = await db.getAllItems('users')
        const auth = await db.getAllItems('auth')
        let idsGuestsList = []
        let guestsList = []
        let guestListFull = { group: 0, guests: [] }
    
        guests.find(guest => {
            if (parseInt(id) === guest.idGroup) {
                    idsGuestsList.push({ idGuest: guest.idGuest })
            }
        })
        users.filter(user => {
            idsGuestsList.map(guest => {
                if (user.id === guest.idGuest) {
                    guestsList.push({
                        id: user.id,
                        email: user.email,
                        photo: user.photo
                    })
                }
            })
        })
        auth.map(auth => {
            guestsList.map(guest => {
                if (auth.id === guest.id) {
                    guestListFull.group = parseInt(id)
                    guestListFull.guests.push({
                        id: guest.id,
                        email: guest.email,
                        photo: guest.photo,
                        user: auth.user,
                        active: auth.active
                    })
                }
            })

        })
        return guestListFull
    }
    const addGuestOfGroup = async (body) => {
        console.log('body=>', body)
        const guestOfGroup = {
           idGroup: body.idGroup,
           idGuest: body.idGuest
        }
        const requestGroup = await db.insertItem(TABLE, guestOfGroup)
        return requestGroup
    }
  
    const deleteGuestOfGroup = (body) => db.deleteItem(TABLE, body)

    return {
        getGuestsOfGroup,
        addGuestOfGroup,
        deleteGuestOfGroup
    }
}