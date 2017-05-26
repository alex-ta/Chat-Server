"use-strict"
const tungus = require('tungus');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection("tingodb:///databaselocal");

// create a schema
const userSchema = new Schema({
  userName: {type: String, required: true, unique:true},
  userPassword: {type: String, required: true},
  lastLogin: Date,
  image: String,
  state: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  description: String,
  favouriteChatroom: Array
});

userSchema.methods.encode = function() {
  console.log("pw encoder here")
  this.name = this.name;
  return this.name;
};

userSchema.plugin(autoIncrement.plugin, 'User');
// the schema is useless so far
const User = mongoose.model('User', userSchema);
// make this available to our users in our Node applications
module.exports = User;
