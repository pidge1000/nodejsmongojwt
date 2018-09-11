const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const CountryMasterSchema = new Schema({

	name: { type: String, maxlength: 100, default: null },
	url: { type: String, maxlength: 100, unique: true, default: null }

});

CountryMasterSchema.set('versionKey', false)

const CountryMaster = connection.model('CountryMaster', CountryMasterSchema);
module.exports = CountryMaster;
