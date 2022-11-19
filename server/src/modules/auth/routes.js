const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')

router.get('/login', login)

async function login(req, res, next) {
    try {
        const token = await controller.login(req.body.user, req.body.password)
        requests.success(req, res, token, 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router