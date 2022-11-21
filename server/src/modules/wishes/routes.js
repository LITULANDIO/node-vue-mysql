const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')
const security = require('./security')

router.get('/:id', getWishes)
router.post('/', /*security(),*/ addWishes)
router.put('/', deleteWishes)

async function getWishes(req, res, next){
    try {
        const data = await controller.getWishes(req.params.id)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
async function addWishes(req, res, next){
    try {
        const data = await controller.addWishes(req.body)
        req.body.id === 0 ? message = 'Desitjos guardats correctament' : message = 'Desig actualitzat correctament'
        requests.success(req, res, message, 204)
    } catch(error) {
        next(error)
    }
}

async function deleteWishes(req, res, next){
    try {
        const data = await controller.deleteWishes(req.body)
        requests.success(req, res, 'Desitjos eliminat correctament', 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router