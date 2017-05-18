"use-strict"
const events = require("events");
const User = require("./User");
const logger = require("../services/logger");
const Message = require("./Message");

logger.setLogFile("logfile");

function Chatroom(iosocket){
  const that = this;
  events.EventEmitter.call(that);
  that.chatId;
  that.messageHistory = [];
  that.userPrototypes = [];
  that.name;
  that.description;
  that.iosocket = iosocket;
  // private public variable
  that._password;

  const messageHistoryCount = 5;

  iosocket.on('connection', function (socket) {
    logger.log("connected");
    that.onConnect(new User(socket));
    // pass chatroom referenz
    socket.on('chat', that.onReceive);
  });

  that.onCreate = function(id,name,description,password){
    that.chatId = id;
    that.name = name;
    that.description = description;
    that.password = password;
    that.emit("onCreate");
    that.sendInfo(new Message("Info","Chatroom " + that.name +" created", new Date()));
  }
  that.onConnect = function(userprototype){
    that.emit("onConnect");
    that.userPrototypes.push(userprototype);
    userprototype.onReceive(new Message("Info","You connected to the Chatroom", new Date()));
    length = that.messageHistory.length;
    userprototype.onReceive(that.messageHistory.slice(length - messageHistoryCount, length));
  }
  that.onDisconnect = function(userprototype){
    that.emit("onDisconnect");
    // remove from prototype
    index = that.userPrototypes.indexOf(userprototype);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  that.onReceive = function(msg){
    that.emit("onReceive");
    that.messageHistory.push(msg);
    that.onSend(msg);
  }
  that.onSend = function(msg){
    that.emit("onSend");
    that.userPrototypes.forEach((userPrototype) => {
      userPrototype.onReceive(msg);
    });
  }
  that.sendInfo = function(msg){
    that.emit("sendInfo");
    that.onSend(new Message("Info", msg, new Date()));
  }

  that.onDestroy = function(){
    that.emit("onDestroy");
    that.sendInfo(new Message("Info", "Chatroom " + that.name + " destroyed", new Date()));
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
