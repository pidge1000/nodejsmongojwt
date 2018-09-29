const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({

	master_category_id: { type: Schema.Types.ObjectId, ref: 'CategoryMaster', required: true },
    child_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    instituate_id: { type: Schema.Types.ObjectId, ref: 'Instituate', required: true },
  	price: { type: Number, default: 0 },
  	duration: { type: Number, default: 0 },
  	avg_no_student: { type: Number, default: 0 },
  	description: { type: String, default: null },
  	teaching_pattern: { type: String, default: null },
  	status: { type: Number, min: 0, max: 2, default: 0 },   // 1 => Active, 0 => Inactive, 2 => Delete
  	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now },
    mysqlID: { type: Number, default: 0 }

});

CoursesSchema.set('versionKey', false)

CoursesSchema.pre('save', function(next) {
    this.modified_on = new Date();
    next();
});

const Courses = connection.model('Courses', CoursesSchema);
module.exports = Courses;
