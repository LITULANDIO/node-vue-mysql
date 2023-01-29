const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')
const security = require('./security')

router.get('/:id', getGuestsOfGroup)
router.post('/addGuest', /*security(),*/ addGuestOfGroup)
router.put('/deleteGuest', deleteGuestOfGroup)


async function getGuestsOfGroup(req, res, next){
    try {
        const data = await controller.getGuestsOfGroup(req.params.id)
        console.log('data =>', data)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}

async function addGuestOfGroup(req, res, next){
    console.log('req =>', req.body)
    try {
        await controller.addGuestOfGroup(req.body)
        req.body.id === 0 ? message = 'Guest guardat correctament' : message = 'Guest actualitzat correctament'
        requests.success(req, res, message, 204)
    } catch(error) {
        next(error)
    }
}

async function deleteGuestOfGroup(req, res, next){
    try {
        await controller.deleteGuestOfGroup(req.body)
        requests.success(req, res, 'Grup eliminat correctament', 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router