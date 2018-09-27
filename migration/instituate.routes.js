const express = require('express')
const router = express.Router()
const connection = require('../models/MysqlConnection').connection;

router.get('/countrymaster', (req, res) => {

	connection.connect(function(err) {
	 	if (err) {
	    	console.error('error connecting: ' + err.stack);
	    	return;
	  	}
	 
	  	console.log('connected as id ' + connection.threadId);
	});

	res.status(200).json({ status: 500, message: "Failed to process request" })

})

/*
router.post('/', (req, res) => {

	if (req.body.title && req.body.desc) {

		const blog = new Blog({Title: req.body.title, Description: req.body.desc, Category: req.body.category, UserId: req.id, Status: 1})
		blog.save((err, result) => {
			if (err) return res.status(500).json({ status: 500, message: 'Failed to Save user info' })
			return res.status(200).json({ status: 200, message: 'New blog has been created' })
		})

	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.delete('/:id', (req, res) => {

	if (req.params.id) {
		Blog.findOneAndUpdate({ _id: req.params.id }, { Status: 0 }, (err, result) => {

			if (err) return res.status(500).json({ status: 500, message: 'Failed to Save user info' })

			if (result) {
				return res.status(200).json({ status: 200, message: 'Blog has been deleted!' })
			} else {
				return res.status(200).json({ status: 200, message: 'Blog did not exist.' })
			}
		
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.put('/:id', (req, res) => {

	if (req.params.id && req.body.title && req.body.desc) {
		Blog.findOne({ _id: req.params.id }, (err, blog) => {
			if (err) return res.status(500).json({ status: 500, message: 'Blog did not exist.' })
			blog.Title = req.body.title
			blog.Description = req.body.desc
			blog.Status = 1

			blog.save((err, result) => {
				if (err) return res.status(500).json({ status: 500, message: 'Failed to Save user info' })
				return res.status(200).json({ status: 200, message: 'Blog has been updated!' })
			})
		
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.get('/:id?', (req, res) => {

	if (req.params.id) {
		Blog.findOne({ _id: req.params.id, Status: 1 }, (err, blog) => {
			if (err) return res.status(500).json({ status: 500, message: 'Failed to get blog info' })
			return res.status(200).json({ status: 200, message: 'Blog list', blogs: JSON.stringify(blog) })
		})
	} else if (req.id) {
		Blog.find({ UserId: req.id, Status: 1 }, (err, blogs) => {
			if (err) return res.status(500).json({ status: 500, message: 'Failed to get blogs info' })
			return res.status(200).json({ status: 200, message: 'Blogs list', blogs: JSON.stringify(blogs) })
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

*/

module.exports = router;