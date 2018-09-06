const express = require('express')
const router = express.Router()
const Blog = require('../models/model/blog.model')

router.post('/', (req, res) => {

	if (req.body.title && req.body.desc) {

		const blog = new Blog({Title: req.body.title, Description: req.body.desc, Category: req.body.category, UserId: req.id, Status: 1})
		blog.save()
		.then((result) => {
			return res.status(200).json({ status: 200, message: 'New blog has been created' })
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to Save user info' })
		})
		
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.delete('/:id?', (req, res) => {

	if (req.params.id) {
		Blog.findOneAndUpdate({ _id: req.params.id }, { Status: 0 })
		.exec()
		.then((result) => {
			if (result) {
				return res.status(200).json({ status: 200, message: 'Blog has been deleted!' })
			} else {
				return res.status(200).json({ status: 200, message: 'Blog did not exist.' })
			}
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to Save user info' })
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.put('/:id?', (req, res) => {

	if (req.params.id && req.body.title && req.body.desc) {
		Blog.findOne({ _id: req.params.id })
		.exec()
		.then((blog) => {
			if (blog) {
				blog.Title = req.body.title
				blog.Description = req.body.desc
				blog.Status = 1
				return blog.save()
			} else {
				return res.status(500).json({ status: 500, message: 'Blog did not exist.' })
			}
		})
		.then((result) => {
			res.status(200).json({ status: 200, message: 'Blog has been updated!' })
		})
		.catch((err) => {
			res.status(500).json({ status: 500, message: 'Failed to Save user info' })
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}
})

router.get('/:id?', (req, res) => {

	if (req.params.id) {
		Blog.findOne({ _id: req.params.id, Status: 1 })
		.exec()
		.then((blog) => {
			return res.status(200).json({ status: 200, message: 'Blog by Promise', blogs: JSON.stringify(blog) })
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to get blog info' })
		})
	} else if (req.id) {
		Blog.find({ UserId: req.id, Status: 1 })
		.exec()
		.then((blogs) => {
			return res.status(200).json({ status: 200, message: 'Blogs list by Promise', blogs: JSON.stringify(blogs) })
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to get blogs info' })
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

module.exports = router;