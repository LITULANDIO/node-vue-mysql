const jwt = require('jsonwebtoken')
const config = require('../config')

const secret = config.jwt.secret

const assignToken = (data) => {
    return jwt.sign(data, secret)
}

const checkItOutToken = (token) => {
    return jwt.verify(token, secret)
}

const checkToken = {
    confirmationToken: (req, id) => {
        const decode = decodeHeader(req)
        if (decode.id !== id) {
            throw new Error('No tens privilegis per fer el que estás fent pillín')
        }
    }
}

const getToken = (authorization) => {
    if (!authorization) {
        throw new Error('No hi ha token')
    }
    if (!authorization.includes('Bearer')) {
        throw new Error('Format invalid')
    }
    const token = authorization.replace('Bearer ', '')
    console.log('token =', token)
    return token
}


const decodeHeader = (req) => {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decode = checkItOutToken(token)
    req.user = decode
    return decode
}

module.exports = {
    assignToken,
    checkItOutToken,
    checkToken
}