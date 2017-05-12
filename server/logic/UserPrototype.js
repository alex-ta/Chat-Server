"use-strict"
const events = require('events');

function UserPrototype (){
  // register for events
  events.EventEmitter.call(this);
  this._userId;
  this._userName;
  this._userPassword;
  this._lastLogin;
  this._image;
  this._state;
  this._firstName;
  this._lastName;
  this._birthday;
  this._description;
  this._favouriteChatRoom;

  function login(){
    this.emit("login");
  }
  function connect(){
    this.emit("connect");
  }
  function receive(){
    this.emit("receive");
  }
  function send(){
    this.emit("send");
  }
  function addFavChatRoom(){
    this.emit("addFavChatRoom");
  }
  function removeFavChatRoom(){
    this.emit("removeFavChatRoom");
  }
  function disconnect(){
    this.emit("disconnect");
  }
  function logout(){
    this.emit("logout");
  }
  // Admin
  function createChatRoom(){
      this.emit("createChatRoom");
  }
  function deleteChatRoom(){
      this.emit("deleteChatRoom");
  }
  // getter & setter create change event
  function setId (id){
    this.emit("setId");
    this._userId = id;
  }
  function setName(name){
    this.emit("setName");
    this._userName = name;
  }
  function setPassword(pwd){
    this.emit("setPassword");
    this._userPassword = pwd;
  }
  function setLastLogin(lastLogin){
    this.emit("setLastLogin");
    this._lastLogin = lastLogin;
  }
  function setImage(image){
    this.emit("setImage");
    this._image = image;
  }
  function setState(state){
    this.emit("setState");
    this._state = state;
  }
  function setFirstName(firstName){
    this.emit("setFirstName");
    this._firstName = firstName;
  }
  function setLastName(lastName){
    this.emit("setLastName");
    this._lastName = lastName;
  }
  function setBirthday(birthday){
    this.emit("setBirthday");
    this._birthday = birthday;
  }
  function setDescription(description){
    this.emit("setDescription");
    this._description = description;
  }
  function setFavouriteChatRoom(favouriteChatRoom){
    this.emit("setFavouriteChatRoom");
    this._favouriteChatRoom = favouriteChatRoom;
  }
  function getId(){
    return this._userId;
  }
  function getUserName(){
    return this._userName;
  }
  function getUserPassword(){
    return this._userPassword;
  }
  function getLastLogin(){
    return this._lastLogin;
  }
  function getImage(){
    return this._image;
  }
  function getState(){
    return this._state;
  }
  function getFirstName(){
    return this._firstName;
  }
  function getLastName(){
    return this._lastName;
  }
  function getBirthday(){
    return this._birthday;
  }
  function getDescription(){
    return this._description;
  }
  function getFavouriteChatRoom(){
    return this._favouriteChatRoom;
  }
}
UserPrototype.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = UserPrototyp;
