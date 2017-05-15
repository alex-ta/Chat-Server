"use-strict"
const events = require('events');
const Chatroom = require("./Chatroom");
let chatroomId = 0;


function ChatroomCRM (){
  events.EventEmitter.call(this);
  let chatrooms = [];

  this.create = function(){
    this.emit("create");
  }
  this.addChatroom = function(name, description, password){
    this.emit("addChatroom");
    chatroom = new Chatroom();
    chatrooms.push(chatroom);
    // manage the id
    chatroom.create(chatroomId++,name,description,password);
  }
  this.deleteChatroom = function(chatroom){
    this.emit("deleteChatroom");
    chatroom.destroy();
    index = _userPrototypes.indexOf(chatroom);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  this.destroy = function(){
    this.emit("destroy");
  }
  this.getChatrooms = function(){
    return chatrooms;
  }
}

Chatroom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new ChatroomCRM();
