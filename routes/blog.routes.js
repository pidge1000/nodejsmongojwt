const express = require('express')
const router = express.Router()
const Blog = require('../models/model/blog.model')

router.post('/create', (req, res) => {

	if (req.body.title && req.body.desc) {

		const blog = new Blog({Title: req.body.title, Description: req.body.desc, Category: req.body.category, UserId: req.id, Status: 1})
		blog.save((err, result) => {
			if (err) res.status(500).json({ status: 500, message: 'Failed to Save user info' })
			res.status(200).json({ status: 200, message: 'New blog has been created' })
		})

	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

module.exports = router;