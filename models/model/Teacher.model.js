const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({

	instituate_id: { type: Schema.Types.ObjectId, ref: 'Instituate', required: true },
	designation: { type: String, maxlength: 25, default: null },
	first_name: { type: String, maxlength: 50, default: null },
	last_name: { type: String, maxlength: 50, default: null },
	experience: { type: Schema.Types.Double, default: null },
	qualtification: { type: String, maxlength: 100, default: null },
	age: { type: Number, default: 0 },  // Birth Year
	unique_url: { type: String, maxlength: 250, default: null },
	gender: { type: Number, min: 1, max: 2, default: 0 }, // 1 => Male, 2 => Female
	achivements: { type: String, default: null },
	subject: { type: String, maxlength: 500, default: null },
	image: { type: String, maxlength: 500, default: null },
	fb_url: { type: String, maxlength: 250, default: null },
	linkedin_url: { type: String, maxlength: 250, default: null },
	status: { type: Number, min: 0, max: 2, default: 1 },  // 1 => Active, 0 => Inactive, 2 => Delete
	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now }

});

TeacherSchema.set('versionKey', false)
TeacherSchema.index({ instituate_id: 1, unique_url: 1 }, { unique: true })

TeacherSchema.pre('save', function(next) {
  this.modified_on = new Date();
  next();
});

const Teacher = connection.model('Teacher', TeacherSchema);
module.exports = Teacher;
