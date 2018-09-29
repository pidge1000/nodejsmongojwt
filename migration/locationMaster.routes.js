const express = require('express')
const router = express.Router()
const CityMaster = require('../models/model/CityMaster.model')
const CountryMaster = require('../models/model/CountryMaster.model')
const LocationMaster = require('../models/model/LocationMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from Location_Master', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCountry;
  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				
				globalCountry = getVal
				return CityMaster.findOne({ mysqlID: results[i].city_id }).exec()
			})
			.then((getValue) => {
				const Obj = new LocationMaster({ country_id: globalCountry._id, city_id: getValue._id, pincode: results[i].pincode, name: results[i].name, url: results[i].url, mysqlID: results[i].id })
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