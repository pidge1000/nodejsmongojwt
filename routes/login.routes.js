const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/model/User.model')


router.post('/signup', (req, res) => {
    /*
   bcrypt.hash(req.body.password, config.jwtSalt, (err, jwtHash) => {
      if(err) {
         return res.status(500).json({ status: 500, message: "Failed to process requesttttt" })
      } else {

         User.findOne({ email: req.body.email })
         .exec()
         .then((result) => {
            if (result) {
               return res.status(200).json({ status: 200, message: 'User already exist' })
            } else {
               const user = new User({instituate_id: req.body.instituate_id, email: req.body.email, password: jwtHash, first_name: req.body.first_name, last_name: req.body.last_name, type: req.body.type, status: 1 })
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
            console.log(err)
            return res.status(500).json({ status: 500, message: 'Failed to process requestttttttddd' })
         })
      }
   })
    */
})


router.post('/signin', function(req, res) {

    let globalUser;
    User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
        globalUser = user
        return bcrypt.compare(req.body.password, user.password)
    })
    .then((passwordIsValid) => {
        if(!passwordIsValid)
            return res.status(401).json({ status: 401, message: "Password does not match" })

        const jwtToken = jwt.sign({id: globalUser._id, email: globalUser.email, instituate_id: globalUser.instituate_id, type: globalUser.type, status: globalUser.status}, config.jwtSecret, {expiresIn: config.jwtExpiresIn})
        return res.status(200).json({ status: 200, token: jwtToken, message: "Signin successfully" })
    })
    .catch((err) => {
        return res.status(500).json({status: 500, message: "Failed to process request" })
    })

})



module.exports = router;