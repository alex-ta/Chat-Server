"use-strict"
const events = require('events');

function Chatroom(){
  events.EventEmitter.call(this);

  this._chatId;
  this._userPrototypes;
  this._name;
  this._description;
  this._password;
  this._limit;

  function onCreate(){
    this.emit("onCreate");
  }
  function onConnect(){
    this.emit("onConnect");
  }
  function onDisconnect(){
    this.emit("onDisconnect");
  }
  function receive(){
    this.emit("receive");
  }
  function send(){
    this.emit("send");
  }
  function onDestroy(){
    this.emit("onDestroy");
  }
  function setChatId(chatId){
    this.emit("setChatId");
    this._chatId = chatId;
  }
  function setName(name){
    this.emit("setName");
    this._name = name;
  }
  function setDescription(description){
    this.emit("setDescription");
    this._description = description;
  }
  function setPassword(password){
    this.emit("setPassword");
    this._password = password;
  }
  function setLimit(limit){
    this.emit("setLimit");
    this._limit = limit;
  }
  function getId(){
    return this._chatId;
  }
  function getName(){
    return this._name;
  }
  function getDescription(){
    return this._description;
  }
  function getPassword(){
    return this._password;
  }
  function getLimit(){
    return this._limit;
  }

}


Chatroom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = Chatroom;
