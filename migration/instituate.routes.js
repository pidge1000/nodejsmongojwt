const express = require('express')
const router = express.Router()
const Instituate = require('../models/model/Instituate.model')
const CityMaster = require('../models/model/CityMaster.model')
const CountryMaster = require('../models/model/CountryMaster.model')
const LocationMaster = require('../models/model/LocationMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from Instituate', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCountry, globalCity;
  			CountryMaster.findOne({ mysqlID: results[i].country_id })
			.exec()
			.then((getVal) => {
				
				globalCountry = getVal
				return CityMaster.findOne({ mysqlID: results[i].city_id }).exec()
			})
			.then((getVal) => {
				
				globalCity = getVal
				return LocationMaster.findOne({ mysqlID: results[i].location_id }).exec()
			})
			.then((getValue) => {
				if(!getValue) getValue = { _id: null }
				if(!globalCity) globalCity = { _id: null }
				if(!globalCountry) globalCountry = { _id: null }
				const Obj = new Instituate({ name: results[i].name, description: results[i].description, founded: results[i].founded, working_days: results[i].working_days, website_url: results[i].website_url, fb_page_url: results[i].fb_page_url, country_id: globalCountry._id, city_id: globalCity._id, location_id: getValue._id, pincode: results[i].pincode, unique_url: results[i].unique_url, image_url: results[i].image_url, latitude: results[i].latitude, longitude: results[i].longitude, contact_email: results[i].contact_email, contact_no: results[i].contact_no, address: results[i].address, map_address: results[i].map_address, avg_no_batches: results[i].avg_no_batches, no_of_teachers: results[i].no_of_teachers, ratio: results[i].ratio, avg_teacher_exp: results[i].avg_teacher_exp, avg_batch_size: results[i].avg_batch_size, status: results[i].status, test: results[i].test, created_on: results[i].modified_on, modified_on: results[i].modified_on, mysqlID: results[i].id })
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

router.get('/amenities', (req, res) => {

	mysqlConnection.query('Select * from Amenities', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			Instituate.findOne({ mysqlID: results[i].instituate_id })
			.exec()
			.then((instituate) => {

				instituate.amenities = { study_material: results[i].study_material, test_series: results[i].test_series, online_portal: results[i].online_portal, ac: results[i].ac, wifi: results[i].wifi, pick_and_drop: results[i].pick_and_drop, library: results[i].library }
	  			return instituate.save()
			})
			.then((result) => {
				console.log('Successfully updated')
			})
			.catch((err) => {
				console.log('Failed to Save data')
			})
  		}
  		return res.status(200).json({ status: 200, message: 'Success' })
	});

})

module.exports = router;