const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const bcrypt = require('bcrypt');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const UserSchema = new Schema({

	instituate_id: { type: Schema.Types.ObjectId, ref: 'Instituate', required: true },
  	email: { type: String, required: true, unique: true, default: null },
  	password: { type: String, maxlength: 50, default: null },
  	first_name: { type: String, maxlength: 50, default: null },
  	last_name: { type: String, maxlength: 50, default: null },
  	type: { type: Number, min: 0, max: 1, default: 1 },   // 1 => Admin, 2 => Non-Admin
  	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', default: null },
  	status: { type: Number, min: 0, max: 2, default: 0 },   // 1 => Active, 0 => Inactive, 2 => Delete
  	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now }

});

UserSchema.set('versionKey', false)

UserSchema.pre('save', function(next) {
  this.modified_on = new Date();
  next();
});

const User = connection.model('User', UserSchema);
module.exports = User;
