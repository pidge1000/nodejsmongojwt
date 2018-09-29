const express = require('express')
const router = express.Router()
const Courses = require('../models/model/Courses.model')
const Instituate = require('../models/model/Instituate.model')
const SubCategory = require('../models/model/SubCategory.model')
const CategoryMaster = require('../models/model/CategoryMaster.model')
const mysqlConnection = require('../models/MysqlConnection').connection

router.get('/', (req, res) => {

	mysqlConnection.query('Select * from User', function (error, results, fields) {
  		if (error) return res.status(200).json({ status: 200, message: 'Error' })

  		for (let i = 0; i < results.length; i++) {

  			let globalCategory, globalSubCategory;
  			CategoryMaster.findOne({ mysqlID: results[i].master_category_id })
			.exec()
			.then((getVal) => {
				
				globalCategory = getVal
				return SubCategory.findOne({ mysqlID: results[i].child_category_id }).exec()
			})
			.then((getVal) => {
				
				globalSubCategory = getVal
				return Instituate.findOne({ mysqlID: results[i].instituate_id }).exec()
			})
			.then((getValue) => {
				const Obj = new Courses({ master_category_id: globalCategory._id, child_category_id: globalSubCategory._id, instituate_id: getValue._id, price: results[i].price, duration: results[i].duration, avg_no_student: results[i].avg_no_student, description: results[i].description, teaching_pattern: results[i].teaching_pattern, status: results[i].status, created_on: results[i].modified_on, modified_on: results[i].modified_on, mysqlID: results[i].id })
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