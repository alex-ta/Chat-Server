"use-strict"
const events = require("events");
const User = require("./User");
const logger = require("../services/logger");

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
    that.sendInfo("Chatroom " + that.name +" created");
  }
  that.onConnect = function(userprototype){
    that.emit("onConnect");
    that.userPrototypes.push(userprototype);
    userprototype.onReceive("You connected to the Chatroom");
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
    msg = msg.name +" : "+msg.text;
    logger.log(msg);
    logger.log(that.messageHistory);
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
    that.onSend("[Info]" + msg + " << " + Date())
  }

  that.onDestroy = function(){
    that.emit("onDestroy");
    that.sendInfo("Chatroom " + that.name + " destroyed")
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
