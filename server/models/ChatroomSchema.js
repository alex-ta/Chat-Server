"use-strict"
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const config = require('../config');

const connection = mongoose.createConnection(config.databaseUrl);
autoIncrement.initialize(connection);
// create a schema
const chatroomSchema = new Schema({
  history: Array,
  name: {type: String, required: true},
  description: {type: String, required:true},
  password: String
});


chatroomSchema.plugin(autoIncrement.plugin, 'Chatroom');
const Chatroom = mongoose.model('Chatroom', chatroomSchema);
// make this available to our users in our Node applications
module.exports = Chatroom;
