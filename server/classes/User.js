"use-strict"
const utils = require('util');
const UserPrototype = require('./UserPrototype');

class User extends UserPrototype{
  constructor(socket) {
    super(socket);
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
}

// export user class
module.exports = User;
