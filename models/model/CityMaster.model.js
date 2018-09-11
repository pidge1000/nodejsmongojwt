const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const CityMasterSchema = new Schema({

	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', required: true },
	name: { type: String, maxlength: 100, default: null },
	url: { type: String, maxlength: 100, unique: true, default: null }

});

CityMasterSchema.set('versionKey', false)

const CityMaster = connection.model('CityMaster', CityMasterSchema);
module.exports = CityMaster;
