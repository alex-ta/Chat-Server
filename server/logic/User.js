"use-strict"
const UserPrototype = require('./UserPrototype');

function User (){


}

User.prototype.__proto__ = UserPrototype.prototype;
module.exports = User;
