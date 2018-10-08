const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const winston = require('../config/winstonConfig')
const SubCategory = require('../models/model/SubCategory.model')

router.get('/:countryId?', (req, res, next) => {

	if (req.params.countryId) {
		SubCategory.find({ country_id: req.params.countryId })
		.exec()
		.then((subCategory) => {
			return res.status(200).json({ status: 200, message: 'Course detail', data: JSON.stringify(subCategory) })
		})
		.catch((err) => {
    		next(new Error(err.message + '|Failed to get sub category info'))
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