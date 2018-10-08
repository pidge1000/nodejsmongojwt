const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const winston = require('../config/winstonConfig')
const Teacher = require('../models/model/Teacher.model')

router.post('/', (req, res) => {

	if (req.body.first_name && req.body.experience && req.body.subject && req.instituate_id) {
		const  teacher = new Teacher({instituate_id: req.instituate_id, designation: req.body.designation, first_name: req.body.first_name, last_name: req.body.last_name, experience: req.body.experience, qualtification: req.body.qualtification, age: req.body.age, unique_url: req.body.unique_url, gender: req.body.gender, achivements: req.body.achivements, subject: req.body.subject, image: req.body.image, fb_url: req.body.fb_url, linkedin_url: req.body.linkedin_url, yt_url: req.body.yt_url, subject: req.body.subject, status: 1})
		teacher.save()
		.then((result) => {
			return res.status(200).json({ status: 200, message: 'New teacher has been added' })
		})
		.catch((err) => {
			next(new Error(err.message + '|Failed to Save teacher info'))
		})
		
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.delete('/:id?', (req, res) => {

	if (req.params.id) {
		Teacher.findOneAndUpdate({ _id: req.params.id }, { Status: 2 })
		.exec()
		.then((result) => {
			if (result) {
				return res.status(200).json({ status: 200, message: 'Teacher has been deleted!' })
			} else {
				return res.status(200).json({ status: 200, message: 'Teacher did not exist.' })
			}
		})
		.catch((err) => {
			next(new Error(err.message + '|Failed to Save teacher info'))
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
			next(new Error(err.message + '|Failed to Save user info'))
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}
})

router.get('/:id?', (req, res, next) => {

	if (req.params.id) {
		Teacher.findOne({ _id: req.params.id, status: 1 })
		.exec()
		.then((teacher) => {
			return res.status(200).json({ status: 200, message: 'Teacher detail', data: JSON.stringify(teacher) })
		})
		.catch((err) => {
    		next(new Error(err.message + '|Failed to get teacher info'))
		})
	} else if (req.id) {
		Teacher.find({ instituate_id: req.instituate_id, status: 1 })
		.exec()
		.then((teachers) => {
			return res.status(200).json({ status: 200, message: 'Teachers list', data: JSON.stringify(teachers) })
		})
		.catch((err) => {
			next(new Error(err.message + '|Failed to get teachers info'))
		})
	} else {
		return res.status(500).json({ status: 500, message: "Failed to process request" })
	}

})

router.use(function(err, req, res, next) {
	let status = err.status || 500
	err.status = undefined
	let errorArray = err.message.split('|')
	winston.error(`${req.method} - ${req.originalUrl} - ${err.status || 404} - ${errorArray[0]} - ${Date.now()}`)
    res.status(status).json({ status: status, message: errorArray[1] })
})

module.exports = router;