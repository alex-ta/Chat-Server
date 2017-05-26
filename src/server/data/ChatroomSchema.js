"use-strict"
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection("mongodb://localhost/myDatabase");
autoIncrement.initialize(connection);
// create a schema
const chatroomSchema = new Schema({
  history: Array,
  name: {type: String, required: true},
  description: String,
  password: String
});


chatroomSchema.plugin(autoIncrement.plugin, 'Chatroom');
// the schema is useless so far
const Chatroom = mongoose.model('Chatroom', chatroomSchema);
// make this available to our users in our Node applications
module.exports = Chatroom;
