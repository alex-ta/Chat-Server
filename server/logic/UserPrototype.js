"use-strict"
const events = require('events');

function UserPrototype (){
  // register for events
  events.EventEmitter.call(this);
  let _userId;
  let _userName;
  let _userPassword;
  let _lastLogin;
  let _image;
  let _state;
  let _firstName;
  let _lastName;
  let _birthday;
  let _description;
  let _favouriteChatRoom;

  this.login = function(){
    this.emit("login");
  }
  this.connect = function(){
    this.emit("connect");
  }
  this.receive = function(){
    this.emit("receive");
  }
  this.send = function(){
    this.emit("send");
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
  // getter & setter
  this.setId = function(id){
    _userId = id;
  }
  this.setName = function(name){
    _userName = name;
  }
  this.setPassword = function(pwd){
    _userPassword = pwd;
  }
  this.setLastLogin = function(lastLogin){
    _lastLogin = lastLogin;
  }
  this.setImage = function(image){
    _image = image;
  }
  this.setState = function(state){
    _state = state;
  }
  this.setFirstName = function(firstName){
    _firstName = firstName;
  }
  this.setLastName = function(lastName){
    _lastName = lastName;
  }
  this.setBirthday = function(birthday){
    _birthday = birthday;
  }
  this.setDescription = function(description){
    _description = description;
  }
  this.setFavouriteChatRoom = function(favouriteChatRoom){
    _favouriteChatRoom = favouriteChatRoom;
  }
  this.getId = function(){
    return _userId;
  }
  this.getUserName = function(){
    return _userName;
  }
  this.getUserPassword = function(){
    return _userPassword;
  }
  this.getLastLogin = function(){
    return _lastLogin;
  }
  this.getImage = function(){
    return _image;
  }
  this.getState = function(){
    return _state;
  }
  this.getFirstName = function(){
    return _firstName;
  }
  this.getLastName = function(){
    return _lastName;
  }
  this.getBirthday = function(){
    return _birthday;
  }
  this.getDescription = function(){
    return _description;
  }
  this.getFavouriteChatRoom = function(){
    return _favouriteChatRoom;
  }
}
// extend on events
UserPrototype.prototype.__proto__ = events.EventEmitter.prototype;
// exports userprototype model (no class)
module.exports = UserPrototype;
