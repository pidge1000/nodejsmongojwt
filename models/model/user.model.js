const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String }
});

class UserModel {

}

userSchema.loadClass(UserModel);
const User = connection.model('User', userSchema);

module.exports = User;
