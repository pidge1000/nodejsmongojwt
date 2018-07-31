const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

class UserModel {

}

userSchema.loadClass(UserModel);
const User = connection.model('User', userSchema);

module.exports = User;
