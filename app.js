require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const _ = require('lodash')
const morgan = require('morgan')
const config = require('./config')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongooseMorgan = require('mongoose-morgan')
const verifyToken = require('./auth/verifyToken')
const winston = require('./config/winstonConfig')
const verifyMigration = require('./auth/verifyMigration')

const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
	'allowedHeaders': ['Content-Type', 'Authorization'],
  	'exposedHeaders': [],
  	'origin': '*',
  	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  	'preflightContinue': false
}))

// Store log into MongoDB/log file
if(app.get('env') !== 'development') {
	// Store Request Value in MongoDB
	app.use(mongooseMorgan({ 
			collection: 'logs', 
			connectionString: process.env.MONGODB_URI 
		}, { }, 'tiny'))

	// Check and create Directory logs
	if(!fs.existsSync('./logs')) {
		fs.mkdirSync('./logs')
	}

	// Store Log Value in File System
	app.use(morgan('combined', { stream: winston.stream }))
}

app.get('/checking', (req, res) => {
   	res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial!!!"
   });
});

app.get('/tokenVerify', (req, res) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, function(err, user) {
            if (err) return res.status(500).json({ status: 500, message: 'Failed to authenticate token.' })
            return res.status(200).json({ status: 200, message: 'Token Verified.'})
        })
    } else {
        return res.status(401).json({ status: 401, message: 'No token!'})
    }
});


app.use('/login', require('./routes/login.routes'))
app.use('/user', verifyToken, require('./routes/user.routes'))
app.use('/courses', verifyToken, require('./routes/courses.routes'))
app.use('/teacher', verifyToken, require('./routes/teacher.routes'))
app.use('/subCategory', verifyToken, require('./routes/subCategory.routes'))


// Migration Routes Here (Migrate from Mysql to MongoDB Database)
app.use('/migration/user', verifyMigration, require('./migration/user.routes'))
app.use('/migration/city', verifyMigration, require('./migration/city.routes'))
app.use('/migration/teacher', verifyMigration, require('./migration/teacher.routes'))
app.use('/migration/courses', verifyMigration, require('./migration/courses.routes'))
app.use('/migration/country', verifyMigration, require('./migration/country.routes'))
app.use('/migration/category', verifyMigration, require('./migration/category.routes'))
app.use('/migration/instituate', verifyMigration, require('./migration/instituate.routes'))
app.use('/migration/location', verifyMigration, require('./migration/locationMaster.routes'))
app.use('/migration/subCategory', verifyMigration, require('./migration/subCategory.routes'))


// Page Not Found
app.use(function(req, res, next) {
    var err = new Error('Page Not Found!')
    err.status = 404
    next(err)
})

if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    	let status = err.status || 500
    	err.status = undefined
    	winston.error(`${req.method} - ${req.originalUrl} - ${err.status || 404} - ${err.message} - ${Date.now()}`)
        res.status(status).json({ status: status, message: err.message, error: err })
    })
}

app.use(function(err, req, res, next) {
	winston.error(`${req.method} - ${req.originalUrl} - ${err.status || 404} - ${err.message} - ${Date.now()}`)
    res.status(err.status || 500).json({ message: err.message, error: {} })
})

app.listen(PORT, () => {
   console.log(`Server is running on Port ${PORT}`);
})