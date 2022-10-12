const express = require('express')

const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./controller')

router.get('/', (req, res) => {
    const getAllUsers = controller.getAllUsers()
    requests.success(req, res, getAllUsers, 200)
})

module.exports = router