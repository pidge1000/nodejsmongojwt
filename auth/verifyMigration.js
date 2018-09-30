function verifyMigration(req, res, next) {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1] === 'pidgeljlksdjkdsljlkdjgfdlkjglfdkjgfdlkj') {
            next();
        } else {
        	return res.status(401).json({ status: 401, message: 'No Authorization'})
        }
    } else {
        return res.status(401).json({ status: 401, message: 'No Authorization'})
    }

}

module.exports = verifyMigration;