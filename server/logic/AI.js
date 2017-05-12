"use-strict"
const UserPrototype = require('./UserPrototype');

function AI (){


}

AI.prototype.__proto__ = UserPrototype.prototype;
module.exports = AI;
