const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')
const security = require('./security')

router.get('/', getAllGroups)
router.get('/:id', getGroup)
router.post('/', /*security(),*/ addGroup)
router.put('/', deleteGroup)
router.post('/matchCode', isMatchedCodeGroup)
// router.put('/guest', /*security(),*/ addGuest)


async function getAllGroups(req, res, next){
    try {
        const data = await controller.getAllGroups()
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
async function getGroup(req, res, next){
    try {
        const data = await controller.getGroup(req.params.id)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
async function addGroup(req, res, next){
    try {
        const data = await controller.addGroup(req.body)
        req.body.id === 0 ? message = 'Grup guardat correctament' : message = 'Grup actualitzat correctament'
        requests.success(req, res, message, 204)
    } catch(error) {
        next(error)
    }
}
async function isMatchedCodeGroup(req, res, next) {
    try {
         const data = await controller.getSnug(req.body)
         console.log('[DATA SNUGGGGGGGG', data)
         requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
// async function addGuest(req, res, next){
//     console.log('req', req.body)
//     try {
//          await controller.addGuest(req.body)
//             message = 'Invitat guardat correctament'
        
//         requests.success(req, res, message, 204)
//     } catch(error) {
//         next(error)
//     }
// }
async function deleteGroup(req, res, next){
    try {
        const data = await controller.deleteGroup(req.body)
        requests.success(req, res, 'Grup eliminat correctament', 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router