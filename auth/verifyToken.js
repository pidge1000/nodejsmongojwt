var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, function(err, user) {
            if (err) return res.status(500).json({ status: 500, message: 'Failed to authenticate token.' })
            req.id = user.id
        	req.email = user.email
        	req.instituate_id = user.instituate_id
            next();
        })
    } else {
        return res.status(401).json({ status: 401, message: 'No token!'});
    }

}

module.exports = verifyToken;