const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')

router.post('/login', login)
router.get('/logout', logout)


async function login(req, res, next) {
    console.log('login =>', req.body)
    try {
        const token = await controller.login(req.body.user, req.body.password)
        requests.success(req, res, token, 200)
    } catch(error) {
        next(error)
    }
}

async function logout (req, res, next) {
    try{
        await controller.logout(req.body)
        requests.success(req, res, 'User inactiu', 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router