const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/model/user.model')

router.post('/signup', function(req, res) {

   bcrypt.hash(req.body.password, 10, function(err, hash) {
      if(err) {
         return res.status(500).json({
            message: "Failed to process request"
         });
      } else {
         const user = new User({
            email: req.body.email,
            password: hash    
         });
         user.save(function(err, result) {
            if(err) {
               res.status(500).json({
                  message: "Failed to Save user info"
               });
            }

            if(result) {
               res.status(200).json({
                  message: 'New user has been created',
               });
            }
            
         })
      }
   })

})


router.post('/signin', function(req, res) {

   User.findOne({email: req.body.email}, function(err, user) {
      if (err) {
         return res.status(500).json({
            message: "Failed to process request"
         })
      }

      if (!user) {
         return res.status(404).json({
            message: "No user found"
         })
      }


      const passwordIsValid = bcrypt.compare(req.body.password, user.password)
      if (!passwordIsValid) return res.status(401).json({ message: "Password does not match" })

      const jwtToken = jwt.sign({id: user._id}, 'JWT', {expiresIn: '2h'})
      res.status(200).json({ auth: true, token: jwtToken });

   })

})

module.exports = router;