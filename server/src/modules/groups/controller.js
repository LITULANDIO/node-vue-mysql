const uniqid = require('uniqid'); 
const bcrypt = require('bcrypt')

const TABLE = 'groups'
const joinSpacesStr = (str) => str.replace(/\s/g,'')
const guests = require('../guests/index')

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getAllGroups = () => db.getAllItems(TABLE)
    const getGroup = (id) => db.getItem(TABLE, id)
    const addGroup = async (body) => {
        const salt = await bcrypt.genSalt(10)
        const key  = joinSpacesStr(`CODE-${body.name}-00${body.admin}490`)
        const crypt = await bcrypt.hash(key, salt) 
        const group = {
            id: body.id,
            code: crypt,
            admin: body.admin,
            name: body.name,
            date: body.date,
            budget: body.budget,
            snug: `${crypt.split('/')[1] || crypt}`
        }
        const requestGroup = await db.insertItem(TABLE, group)
        return requestGroup
    }
 
    const getSnug = async(code) => {
        let idGroup = null
        const codeGroupParam = code.password
        const regExtractionId = (/00(\d{2,3})490/)
        let idAdmin = ''
        if(regExtractionId.test(codeGroupParam)) {
            idAdmin = codeGroupParam.match(regExtractionId)[1]
        } else {
            return {
                error: true,
                msg: 'El codig no es correcte o el usuari no existeix al grup'
            }
        }
        const groupsAdmin = await db.getItem(TABLE, idAdmin, 'admin');
        const regExCode = /CODE-(.+)-(\d+)/
        groupsAdmin.map(admin => {
            if(joinSpacesStr(admin.name).includes(codeGroupParam.match(regExCode)[1])){
                idGroup = admin.id
            }
        })
        const group = await getGroup(idGroup)
        const guestGroup = code.user.toLowerCase()
        const idGroupDB = group.map(elements => elements.id)[0]
        const guestsOfGroup = await getGuestsOfGroup(idGroupDB)
        const codeGroupDB = group.map(elements => elements.code)[0]
        const snugGroup = group.map(elements => elements.snug)[0]
        const isGuest = guestsOfGroup.some(guest => guest.user.toLowerCase() === guestGroup)
        const isCode = await bcrypt.compare(codeGroupParam, codeGroupDB)
         
        if (isGuest && isCode) {
            return {
                snug: snugGroup
            }
        } else {
            return {
                error: true,
                msg: 'El codig no es correcte o el usuari no existeix al grup'
            }
        }
   
    } 
    const getGuestsOfGroup = async (id) => {      
        const guests = await db.getAllItems('guests')
        const users = await db.getAllItems('users')
        const auth = await db.getAllItems('auth')
        let idsGuestsList = []
        let guestsList = []
        let guestListFull = []
    
        guests.find(guest => {
            if (id === guest.idGroup) {
                    idsGuestsList.push({ idGuest: guest.idGuest })
            }
        })
        users.filter(user => {
            idsGuestsList.map(guest => {
                if (user.id === guest.idGuest) {
                    guestsList.push({
                        id: user.id,
                    })
                }
            })
        })
        auth.map(auth => {
            guestsList.map(guest => {
                if (auth.id === guest.id) {
                    guestListFull.push({
                        id: guest.id,
                        user: auth.user,
                    })
                }
            })
        })

        return guestListFull
    }
    const deleteGroup = (body) => db.deleteItem(TABLE, body)

    return {
        getAllGroups,
        getGroup,
        addGroup,
        deleteGroup,
        getSnug

    }
}