const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/model/user.model')


router.post('/signup', (req, res) => {

   bcrypt.hash(req.body.password, config.jwtSalt, (err, jwtHash) => {
      if(err) {
         return res.status(500).json({ status: 500, message: "Failed to process request" })
      } else {

         User.findOne({ email: req.body.email })
         .exec()
         .then((result) => {
            if (result) {
               return res.status(200).json({ status: 200, message: 'User already exist' })
            } else {
               const user = new User({email: req.body.email, password: jwtHash})
               return user.save()
            }
         })
         .then((result) => {
            if(result)
               return res.status(200).json({ status: 200, message: 'New user has been created' })
            else
               return res.status(500).json({ status: 500, message: 'Failed to Save user info' })
         })
         .catch((err) => {
            return res.status(500).json({ status: 500, message: 'Failed to process request' })
         })
      }
   })

})


router.post('/signin', function(req, res) {

   User.findOne({ email: req.body.email })
   .exec()
   .then((user) => {
      if (user) {
         const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
         if (!passwordIsValid) return res.status(401).json({ status: 401, message: "Password does not match" })
         
         const jwtToken = jwt.sign({id: user._id}, config.jwtSecret, {expiresIn: config.jwtExpiresIn})
         return res.status(200).json({ status: 200, token: jwtToken, message: "Signin successfully" });
      } else {
         return res.status(404).json({ status: 404, message: "No user found" })
      }
   })
   .catch((err) => {
      return res.status(500).json({status: 500, message: "Failed to process request" })
   })

})



module.exports = router;