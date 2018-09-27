const express = require('express')
const router = express.Router()
const CountryMaster = require('../models/model/CountryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from Country_Master', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {
  			const Obj = new CountryMaster({ name: results[i].name, url: results[i].url, mysqlID: results[i].id })
  			Obj.save()
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