"use-strict"
const events = require('events');

class UserPrototype {
  // register for events
  constructor(socket) {
    events.EventEmitter.call(this);
    // contains chatrooms(by name) and users
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
    this.onSend(msg);
  }
  onSend(msg){
    this.emit("onSend", msg);
      if(msg.constructor.name == "Array"){
        msg.forEach((msgObj) => {
          this.socket.emit('chat', msgObj);
        });
      } else {
        this.socket.emit('chat', msg);
      }
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
