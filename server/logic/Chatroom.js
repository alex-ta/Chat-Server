"use-strict"
const events = require('events');

this.Chatroom(){
  events.EventEmitter.call(this);

  let _chatId;
  let _userPrototypes;
  let _name;
  let _description;
  let _password;
  let _limit;

  this.onCreate = function(){
    this.emit("onCreate");
  }
  this.onConnect = function(){
    this.emit("onConnect");
  }
  this.onDisconnect = function(){
    this.emit("onDisconnect");
  }
  this.receive = function(){
    this.emit("receive");
  }
  this.send = function(){
    this.emit("send");
  }
  this.onDestroy = function(){
    this.emit("onDestroy");
  }
  this.setChatId = function(chatId){
    this.emit("setChatId");
    _chatId = chatId;
  }
  this.setName = function(name){
    this.emit("setName");
    _name = name;
  }
  this.setDescription = function(description){
    this.emit("setDescription");
    _description = description;
  }
  this.setPassword = function(password){
    this.emit("setPassword");
    _password = password;
  }
  this.setLimit = function(limit){
    this.emit("setLimit");
    _limit = limit;
  }
  this.getId = function(){
    return _chatId;
  }
  this.getName = function(){
    return _name;
  }
  this.getDescription = function(){
    return _description;
  }
  this.getPassword = function(){
    return _password;
  }
  this.getLimit = function(){
    return _limit;
  }
}


Chatroom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = Chatroom;
