const express = require('express')
const router = express.Router()
const User = require('../models/model/user.model')

router.post('/me', (req, res) => {

   User.findById(req.id, (err, user) => {
      if (err) return res.status(500).json({ status: 500, message: 'There was a problem finding the user' })
      if (!user) return res.status(404).json({ status: 404, message: 'No user found'})
      	
      res.status(200).json({ status: 200, message: 'Success', user: user});
   });

})

module.exports = router;