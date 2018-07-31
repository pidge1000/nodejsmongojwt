var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, function(err, user) {
            if (err) return res.status(500).send({ status: 500, message: 'Failed to authenticate token.' })
            req.id = user.id
            next()
        })
    } else {
        
    }

}

module.exports = verifyToken;