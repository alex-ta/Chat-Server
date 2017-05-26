"use-strict"

const Binding = require('./Binding');
const IOUserBinding = require("./IOUserBinding");
const User = require("../data/userSchema");
const Chatroom = require("../data/ChatroomSchema");
const system = require("./SystemMessenger");
const db = "";
const limit = 5;

let chatroom = new Chatroom({name:"chatroom"});

class IOBinding extends Binding{
  constructor(server){
    super();
    this.io = require("socket.io").listen(server);
    this.users = [];
    this.chatrooms = [];

    const that = this;
    console.log("setting up SocketIO");
    that.io.sockets.on('connection', function (socket) {
      that.socket = socket;
      console.log("connect");
      // if a new user connects
      that.connect(socket);
      // if a message gets send
    	socket.on('chat', function (data) {
        that.send(data);
        });
    });
  }


  send(data){
    this.io.sockets.in(data.chatroom).emit('chat', data);
    chatroom.history.push(data);
  }

  connectChatroom(room,user){
    const length = room.history.length
    user.binding.send(room.history.slice(length-limit, length));
    //user.binding.send(system.connected);
  }

  disconnectChatroom(room,user){
    //user.binding.send(system.disconnected);
  }

  connect(socket){
    const binding = new IOUserBinding(socket);
    //username = socket.username
    //user = db.findById(id);
    let user = new User();
    user.binding = binding;
    this.users.push(user);
    user.binding.send(system.connected);
    user.binding.join(chatroom);
    this.connectChatroom(chatroom,user);
  }

  disconnect(socket){
      //username = socket.username
      //user = db.findById(id);
      let user = new User();
      const index = this.users.indexOf(user);
      if(index)
        this.users.splice(index,1);
      user.binding.send(system.disconnected);
  }
}

module.exports = IOBinding;
