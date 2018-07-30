const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/model/user.model')

router.post('/signup', function(req, res) {

   bcrypt.hash(req.body.password, 10, function(err, hash) {

      if(err) {
         return res.status(500).json({
            error: err
         });
      }
      else {
         const user = new User({
            email: req.body.email,
            password: hash    
         });
         user.save().then(function(result) {
            res.status(200).json({
               success: 'New user has been created'
            });
         }).catch(error => {
            res.status(500).json({
               error: err
            });
         });
      }
   });
});

module.exports = router;