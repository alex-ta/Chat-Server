"use-strict"
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config');

const connection = mongoose.createConnection(config.databaseUrl);
autoIncrement.initialize(connection);
// create a schema
const userSchema = new Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  lastlogin: Date,
  image: String,
  state: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  description: String,
  favouriteChatroom: Array
});

userSchema.methods.decode = function(password) {
  return bcrypt.hashSync(password, 12);
};

userSchema.plugin(autoIncrement.plugin, 'User');
// the schema is useless so far
const User = mongoose.model('User', userSchema);
// make this available to our users in our Node applications
module.exports = User;
