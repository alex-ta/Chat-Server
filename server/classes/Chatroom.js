"use-strict"
const events = require('events');

this.Chatroom(){
  events.EventEmitter.call(this);
  // remove private and replace with public
  // overrice with
  //Object.defineProperty(Person.prototype, "name", {
  //  get: function() {
  //      return this._name ? this._name : "John Doe";
  //  }
  //});

  let _chatId;
  let _userPrototypes = [];
  let _messageHistory = [];
  let _name;
  let _description;
  let _password;

  const _messageHistoryCount = 5;

  this.onCreate = function(id,name,description,password){
    this.setId(id);
    this.setName(name);
    this.setDescription(description);
    this.setPassword(password);
    this.emit("onCreate");
    this.sendInfo("Chatroom " + _name +" created");
  }
  this.onConnect = function(userprototype){
    this.emit("onConnect");
    _userPrototypes.push(userprototype)
    userprototype.send("You connected to the Chatroom");
    length = _messageHistory.length;
    userprototype.send(_messageHistory.slice(length - _messageHistoryCount, length));
  }
  this.onDisconnect = function(userprototype){
    this.emit("onDisconnect");
    // remove from prototype
    index = _userPrototypes.indexOf(userprototype);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  this.receive = function(msg){
    this.emit("receive");
    _messageHistory.push(msg);
    this.send(msg);
  }
  this.send = function(msg){
    this.emit("send");
    forEach(userPrototype in _userPrototypes){
      userPrototype.send(msg);
    }
  }
  this.sendInfo = function(msg){
    this.emit("sendInfo");
    this.send("[Info]" + msg + " << "Date())
  }

  this.onDestroy = function(){
    this.emit("onDestroy");
    this.sendInfo("Chatroom " + _name + " destroyed")
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
    if(typeof(password) != "string"){
      password = "";
    }
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
