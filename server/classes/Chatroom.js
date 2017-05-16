"use-strict"
const events = require("events");
const User = require("./User");
const logger = require("../services/logger");

function Chatroom(iosocket){
  const that = this;
  events.EventEmitter.call(this);
  this.chatId;
  this.messageHistory = [];
  this.userPrototypes = [];
  this.name;
  this.description;
  this.iosocket = iosocket;
  // private public variable
  this._password;

  const messageHistoryCount = 5;
  const userPrototypes = [];

  iosocket.on('connection', function (socket) {
    logger.log("connected");
    that.onConnect(new User(socket));
    socket.on('chat', this.receive);
  });

  this.onCreate = function(id,name,description,password){
    this.chatId = id;
    this.name = name;
    this.description = description;
    this.password = password;
    this.emit("onCreate");
    this.sendInfo("Chatroom " + this.name +" created");
  }
  this.onConnect = function(userprototype){
    this.emit("onConnect");
    console.log(userprototype);
    this.userPrototypes.push(userprototype);
    userprototype.send("You connected to the Chatroom");
    length = this.messageHistory.length;
    userprototype.send(this.messageHistory.slice(length - messageHistoryCount, length));
  }
  this.onDisconnect = function(userprototype){
    this.emit("onDisconnect");
    // remove from prototype
    index = this.userPrototypes.indexOf(userprototype);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  this.receive = function(msg){
    this.emit("receive");
    this.messageHistory.push(msg);
    this.send(msg);
  }
  this.send = function(msg){
    this.emit("send");
    userPrototypes.forEach((userPrototype) => {
      userPrototype.receive(msg);
    });
  }
  this.sendInfo = function(msg){
    this.emit("sendInfo");
    this.send("[Info]" + msg + " << " + Date())
  }

  this.onDestroy = function(){
    this.emit("onDestroy");
    this.sendInfo("Chatroom " + this.name + " destroyed")
  }
}


//Override setPassword
Object.defineProperty(Chatroom.prototype, "password", {
  set: function(password) {
          if(!(typeof(password) == "string")){
            password = "";
          }
          this._password = password;
        },
  get: function(){
          return this._password;
        }
  });


Chatroom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = Chatroom;
