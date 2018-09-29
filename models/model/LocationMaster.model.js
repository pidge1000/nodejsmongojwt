const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const LocationMasterSchema = new Schema({

	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', required: true },
	city_id: { type: Schema.Types.ObjectId, ref: 'CityMaster', required: true },
	pincode: { type: String, maxlength: 50, default: null },
	name: { type: String, maxlength: 100, default: null },
	url: { type: String, maxlength: 100, default: null },
	mysqlID: { type: Number, default: 0 }

});

LocationMasterSchema.set('versionKey', false)
LocationMasterSchema.index({ city_id: 1, pincode: 1, url: 1 }, { unique: true })

const LocationMaster = connection.model('LocationMaster', LocationMasterSchema);
module.exports = LocationMaster;
