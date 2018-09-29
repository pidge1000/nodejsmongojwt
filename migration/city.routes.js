const express = require('express')
const router = express.Router()
const CityMaster = require('../models/model/CityMaster.model')
const CountryMaster = require('../models/model/CountryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from City_Master', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {
  			
  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				const Obj = new CityMaster({ country_id: getVal._id, name: results[i].name, url: results[i].url, mysqlID: results[i].id })
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