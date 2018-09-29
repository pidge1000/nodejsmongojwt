const express = require('express')
const router = express.Router()
const User = require('../models/model/User.model')
const Instituate = require('../models/model/Instituate.model')
const CountryMaster = require('../models/model/CountryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from User', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCountry;
  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				
				globalCountry = getVal
				return Instituate.findOne({ mysqlID: results[i].instituate_id }).exec()
			})
			.then((getValue) => {
				const Obj = new User({ instituate_id: getValue._id, email: results[i].email, password: results[i].password, first_name: results[i].first_name, last_name: results[i].last_name, type: results[i].type, country_id: globalCountry._id, status: results[i].status, created_on: results[i].modified_on, modified_on: results[i].modified_on, mysqlID: results[i].id })
	  			return Obj.save()
			})
			.then((result) => {
				console.log('Successfully Inserted')
			})
			.catch((err) => {
				console.log('Failed to Save data')
			})
  		}
  		return res.status(200).json({ status: 200, message: 'Success' })
	});

})

module.exports = router;