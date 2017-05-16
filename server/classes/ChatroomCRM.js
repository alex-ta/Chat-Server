"use-strict"
const events = require('events');
const Chatroom = require("./Chatroom");
let chatroomId = 0;


function ChatroomCRM(){
  events.EventEmitter.call(this);
  const chatrooms = [];

  this.onCreate = function(){
    this.emit("onCreate");
  }
  this.addChatroom = function(name, description, password, iosocket){
    // this.emit("addChatroom");
    chatroom = new Chatroom(iosocket);
    chatrooms.push(chatroom);
    // manage the id
    chatroom.onCreate(chatroomId++,name,description,password);
  }
  this.deleteChatroom = function(chatroom){
    this.emit("deleteChatroom");
    chatroom.destroy();
    index = _userPrototypes.indexOf(chatroom);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  this.onDestroy = function(){
    this.emit("onDestroy");
  }
  this.getChatrooms = function(){
    return chatrooms;
  }
}

Chatroom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = ChatroomCRM;
