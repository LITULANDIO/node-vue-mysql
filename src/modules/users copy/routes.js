const express = require('../../../server/node_modules/express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', addUser)
router.put('/', deleteUser)

async function getAllUsers(req, res, next){
    try {
        const data = await controller.getAllUsers()
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
async function getUser(req, res, next){
    try {
        const data = await controller.getUser(req.params.id)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
async function addUser(req, res, next){
    try {
        const data = await controller.addUser(req.body)
        req.body.id === 0 ? message = 'User guardat correctament' : message = 'User actualitzat correctament'
        requests.success(req, res, message, 200)
    } catch(error) {
        next(error)
    }
}
async function deleteUser(req, res, next){
    try {
        const data = await controller.deleteUser(req.body)
        requests.success(req, res, 'User eliminat correctament', 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router