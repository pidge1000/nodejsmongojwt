const express = require('express')
const router = express.Router()
const Teacher = require('../models/model/Teacher.model')
const Instituate = require('../models/model/Instituate.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from User', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCountry;
  			Instituate.findOne({ mysqlID: results[i].instituate_id })
			.exec()
			.then((getValue) => {
				const Obj = new User({ instituate_id: getValue._id, designation: results[i].designation, first_name: results[i].first_name, last_name: results[i].last_name, experience: results[i].experience, qualtification: results[i].qualtification, age: results[i].age, unique_url: results[i].unique_url, gender: results[i].gender, achivements: results[i].achivements, subject: results[i].subject, image: results[i].image, fb_url: results[i].fb_url, linkedin_url: results[i].linkedin_url, yt_url: results[i].yt_url, status: results[i].status, created_on: results[i].modified_on, modified_on: results[i].modified_on, mysqlID: results[i].id })
	  			return Obj.save()
			})
			.then((result) => {
				console.log('Successfully Inserted')
			})
			.catch((err) => {
				console.log('Failed to Save data' + err + "MysqlID:" + results[i].id)
			})
  		}
  		return res.status(200).json({ status: 200, message: 'Success' })
	});

})

module.exports = router;