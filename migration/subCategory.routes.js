const express = require('express')
const router = express.Router()
const SubCategory = require('../models/model/SubCategory.model')
const CountryMaster = require('../models/model/CountryMaster.model')
const CategoryMaster = require('../models/model/CategoryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from Child_Category', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCountry;
  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				
				globalCountry = getVal
				return CategoryMaster.findOne({ mysqlID: results[i].category_id }).exec()
			})
			.then((getValue) => {
				const Obj = new SubCategory({ country_id: globalCountry._id, category_id: getValue._id, name: results[i].name, url: results[i].url, mysqlID: results[i].id })
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

router.get('/parent', (req, res) => {

	mysqlConnection.query('Select * from Child_Category where parent_id != 0', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalVal;
  			if(results[i].parent_id) {
	  			SubCategory.findOne({ mysqlID: results[i].parent_id })
				.exec()
				.then((getVal) => {

					globalVal = getVal
					return SubCategory.findOne({ mysqlID: results[i].id }).exec()
				})
				.then((category) => {
					category.parent_id = globalVal._id
					return category.save()
				})
				.then((result) => {
					console.log('Successfully Updated')
				})
				.catch((err) => {
					console.log('Failed to Save data')
				})
			}
  		}
  		return res.status(200).json({ status: 200, message: 'Success' })
	});

})

module.exports = router;