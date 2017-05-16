"use-strict"
const events = require('events');
const logger = require("../services/logger")

class UserPrototype {
  // register for events
  constructor(socket) {
    events.EventEmitter.call(this);
    this.socket = socket;
  }

  this.login = function(){
    this.emit("login");
  }
  this.connect = function(){
    this.emit("connect");
  }
  this.receive = function(msg){
    logger.log(msg);
    this.emit("receive");
    this.send(msg);
  }
  this.send = function(msg){
    this.emit("send");
    socket.emit('chat', msg);
  }
  this.addFavChatRoom = function(){
    this.emit("addFavChatRoom");
  }
  this.removeFavChatRoom = function(){
    this.emit("removeFavChatRoom");
  }
  this.disconnect = function(){
    this.emit("disconnect");
  }
  this.logout = function(){
    this.emit("logout");
  }
  // Admin
  this.createChatRoom = function(){
      this.emit("createChatRoom");
  }
  this.deleteChatRoom = function(){
      this.emit("deleteChatRoom");
  }
}
// extend on events
UserPrototype.prototype.__proto__ = events.EventEmitter.prototype;
// exports userprototype model (no class)
module.exports = UserPrototype;
