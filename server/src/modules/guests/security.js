const auth = require("../../auth")

module.exports = function checkAuth(){

    const middleware = (req, res, next) => {
        const id = req.body.id
        auth.checkToken.confirmationToken(req, id)
        next()
    }

    return middleware
}