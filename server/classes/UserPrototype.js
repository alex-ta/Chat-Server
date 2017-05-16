"use-strict"
const events = require('events');
const logger = require("../services/logger")

class UserPrototype {
  // register for events
  constructor(socket) {
    events.EventEmitter.call(this);
    this.socket = socket;
  }

  onLogin(){
    this.emit("onLogin");
  }
  onConnect(){
    this.emit("onConnect");
  }
  onReceive(msg){
    this.emit("onReceive",msg);
    logger.log("onReceive:"+msg);
    this.onSend(msg);
  }
  onSend(msg){
    this.emit("onSend", msg);
      if(typeof(msg) == "object"){
        console.log(this.socket);
        msg.forEach((msgObj) => {
          this.socket.emit('chat', msg);
        });
      } else {
        this.socket.emit('chat', msg);
      }
      console.log("send");
  }
  addFavChatRoom(){
    this.emit("addFavChatRoom");
  }
  removeFavChatRoom(){
    this.emit("removeFavChatRoom");
  }
  onDisconnect(){
    this.emit("onDisconnect");
  }
  onLogout(){
    this.emit("onLogout");
  }
  // Admin
  createChatRoom(){
      this.emit("createChatRoom");
  }
  deleteChatRoom(){
      this.emit("deleteChatRoom");
  }
}
// extend on events
UserPrototype.prototype.__proto__ = events.EventEmitter.prototype;
// exports userprototype model (no class)
module.exports = UserPrototype;
