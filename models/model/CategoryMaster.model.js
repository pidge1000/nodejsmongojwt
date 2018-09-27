const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const CategoryMasterSchema = new Schema({

	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', required: true },
	type: { type: Number, default: 0 },  // 0=> Others, 1=> Entrance Exam Coaching,  2=> Competitive Exams Coaching, 3=> Distance Learning
	name: { type: String, maxlength: 250, default: null },
	url: { type: String, maxlength: 250, unique: true, default: null },
	mysqlID: { type: Number, default: 0 }

});

CategoryMasterSchema.set('versionKey', false)

const CategoryMaster = connection.model('CategoryMaster', CategoryMasterSchema);
module.exports = CategoryMaster;
