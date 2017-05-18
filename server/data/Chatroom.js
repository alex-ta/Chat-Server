"use-strict"
const events = require("events");
const User = require("./User");
const Message = require("./Message");
const messageHistoryCount = 5;
let chatCounter = 0;

class Chatroom{
  constructor(name, description){
    this.chatId = chatCounter++;
    this.history = [];
    this.name = name;
    this.description = description;
    // private public variable
    this._password;
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

module.exports = Chatroom;
