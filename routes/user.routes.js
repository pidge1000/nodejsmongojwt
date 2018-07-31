const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/model/user.model')

router.post('/me', function(req, res) {

   console.log("AAAAAAAAAAAAAAAAAAAA")

   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, function(err, decoded) {
         if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
         
         // if everything good, save to request for use in other routes
         req.userId = decoded.id
         console.log(decoded)
         res.status(200).json({ auth: true, token: decoded });
      })
   }

})

module.exports = router;