const express = require('express')
const router = express.Router()
const Courses = require('../models/model/Courses.model')

router.post('/', (req, res) => {

	if (req.body.master_category_id && req.body.child_category_id && req.instituate_id) {

		const course = new Courses({master_category_id: req.body.master_category_id, child_category_id: req.body.child_category_id, instituate_id: req.instituate_id, price: req.body.price, duration: req.body.duration, avg_no_student: req.body.avg_no_student, description: req.body.description, teaching_pattern: req.body.teaching_pattern, status: 1})
		course.save()
		.then((result) => {
			return res.status(200).json({ status: 200, message: 'New course has been created' })
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
		Courses.findOneAndUpdate({ _id: req.params.id }, { Status: 2 })
		.exec()
		.then((result) => {
			if (result) {
				return res.status(200).json({ status: 200, message: 'Course has been deleted!' })
			} else {
				return res.status(200).json({ status: 200, message: 'Course did not exist.' })
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

	if (req.body.master_category_id && req.body.child_category_id && req.instituate_id) {
		Courses.findOne({ _id: req.params.id })
		.exec()
		.then((course) => {
			if (course) {
				course.master_category_id = req.body.master_category_id
				course.child_category_id = req.body.child_category_id
				course.price = req.body.price
				course.duration = req.body.duration
				course.avg_no_student = req.body.avg_no_student
				course.description = req.body.description
				course.teaching_pattern = req.body.teaching_pattern
				course.status = 1
				return course.save()
			} else {
				return res.status(500).json({ status: 500, message: 'Course did not exist.' })
			}
		})
		.then((result) => {
			res.status(200).json({ status: 200, message: 'Course has been updated!' })
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
		Courses.findOne({ _id: req.params.id, Status: 1 })
		.exec()
		.then((course) => {
			return res.status(200).json({ status: 200, message: 'Course detail', data: JSON.stringify(course) })
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to get blog info' })
		})
	} else if (req.id) {
		Courses.find({ instituate_id: req.instituate_id, Status: 1 })
		.exec()
		.then((courses) => {
			return res.status(200).json({ status: 200, message: 'Courses list', data: JSON.stringify(courses) })
		})
		.catch((err) => {
			return res.status(500).json({ status: 500, message: 'Failed to get courses info' })
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

module.exports = router;