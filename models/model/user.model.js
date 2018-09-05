const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at:  { type: Date, default: Date.now },
  updated_at:  { type: Date, default: Date.now }
});

userSchema.set('versionKey', false)

userSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const User = connection.model('User', userSchema);
module.exports = User;
