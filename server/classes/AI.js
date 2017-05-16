"use-strict"
const utils = require('util');
const UserPrototype = require('./UserPrototype');

function AI(iosocket) {
  this.iosocket = iosocket;
}

utils.inherits(AI,User);
// export user class
module.exports = AI;
