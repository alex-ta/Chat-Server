"use-strict"
const util = require('util');
const UserPrototype = require('./UserPrototype');

function User() {
  this.userId;
  this.userName;
  this.userPassword;
  this.lastLogin;
  this.image;
  this.state;
  this.firstName;
  this.lastName;
  this.birthday;
  this.description;
  this.favouriteChatRoom;
}

utils.inherits(User,UserPrototype)
// export user class
module.exports = new User();
