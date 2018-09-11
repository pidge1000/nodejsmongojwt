const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const InstituateSchema = new Schema({

	parent_id: { type: Schema.Types.ObjectId, ref: 'Instituate', default: 0 },
	name: { type: String, maxlength: 250, default: null },
	description: { type: String, default: null },
	founded: { type: Number, default: 0 },
	working_days: { type: String, maxlength: 50, default: null },
	website_url: { type: String, maxlength: 100, default: null },
	fb_page_url: { type: String, maxlength: 100, default: null },
	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', default: 0 },
	city_id: { type: Schema.Types.ObjectId, ref: 'CityMaster', default: 0 },
	location_id: { type: Schema.Types.ObjectId, ref: 'LocationMaster', default: 0 },
	pincode: { type: String, maxlength: 50, default: null },
	unique_url: { type: String, maxlength: 250, unique: true, default: null },
	image_url: { type: String, maxlength: 250, default: null },
	latitude: { type: Schema.Types.Double, default: null },
	longitude: { type: Schema.Types.Double, default: null },
	contact_email: { type: String, maxlength: 50, default: null },
	contact_no: { type: String, maxlength: 50, default: null },
	address: { type: String, maxlength: 500, default: null },
	map_address: { type: String, maxlength: 500, default: null },
	avg_no_batches: { type: Number, default: 0 },
	no_of_teachers: { type: Number, default: 0 },
	ratio: { type: Schema.Types.Double, default: null },  // student to teacher ratio
	avg_teacher_exp: { type: Schema.Types.Double, default: null },
	avg_batch_size: { type: Number, default: 0 },
	status: { type: Number, default: 1 },
	test: { type: String, default: null },
	amenities: {
    	study_material: { type: Number, default: 0 },
    	test_series: { type: Number, default: 0 },
    	online_portal: { type: Number, default: 0 },
    	ac: { type: Number, default: 0 },
    	wifi: { type: Number, default: 0 },
    	pick_and_drop: { type: Number, default: 0 },
    	library: { type: Number, default: 0 }
  	},
  	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now },
	
});

InstituateSchema.set('versionKey', false)

InstituateSchema.pre('save', function(next) {
  this.modified_on = new Date();
  next();
});

const Instituate = connection.model('Instituate', InstituateSchema);
module.exports = Instituate;
