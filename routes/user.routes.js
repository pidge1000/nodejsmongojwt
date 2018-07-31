const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('../auth/verifyToken')
const User = require('../models/model/user.model')

router.post('/me', verifyToken, function(req, res) {

   User.findById(req.id, function (err, user) {
      if (err) return res.status(500).json({ status: 500, message: 'There was a problem finding the user' })
      if (!user) return res.status(404).json({ status: 404, message: 'No user found'})

      console.log(user)
      res.status(200).json({ status: 200, message: 'Success', user: user});
   });

})

module.exports = router;