const express = require('express')
const router = express.Router()
const CountryMaster = require('../models/model/CountryMaster.model')
const CategoryMaster = require('../models/model/CategoryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from Category_Master', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				const Obj = new CategoryMaster({ country_id: getVal._id, type: results[i].type, name: results[i].name, url: results[i].url, mysqlID: results[i].id })
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