"use-strict"

const Binding = require('./Binding');
const IOUserBinding = require("./IOUserBinding");
const User = require("../models/Dataschemas").User;
const Chatroom = require("../models/Dataschemas").Chatroom;
const system = require("../system/SystemMessenger");
const logger = require("../system/Logger");
const limit = 5;

class IOBinding extends Binding {
  constructor(server) {
    super();
    this.io = require("socket.io").listen(server);
    this.users = [];
    this.chatrooms = [];

    const that = this;
    this.io.sockets.on('connection', function(socket) {
      // if a new user connects
      that.connect(socket);
      // if a message gets send
      socket.on('chat', function(data) {
        that.send(data, socket.handshake.query.username);
      });
    });
  }


  send(data, username) {
    const that = this;
    Chatroom.find({
      name: data.chatroom
    }, function(err, room) {
      if (data.username != username) {
        logger.log("someone messed with his username: old->" + username + " now->" + data.username);
      } else if (err || room.length < 1) {
        logger.log("Unavailiable Chatroom call: " + data.chatroom + " from " + username);
      } else {
        room[0].history.push(data);
        console.log(data);
        that.io.sockets.in(data.chatroom).emit('chat', data);
      }
    });
  }

  connectChatroom(room, user) {
    console.log(room);
    const length = room.history.length
    user.binding.send(room.history.slice(length - limit, length));
    user.binding.send(system.connected);
  }

  disconnectChatroom(room, user) {
    user.binding.send(system.disconnected);
  }

  connect(socket) {
    const username = socket.handshake.query.username;
    const that = this;
    const user = User.find({
      username: username
    }, function(err, user) {
      if (err || user.length < 1) {
        logger.log("[connect] unkown user call: " + username);
      } else {
        user.binding = new IOUserBinding(socket);
        that.users.push(user);
        user.binding.send(system.connected);
        Chatroom.find({}, function(err, rooms) {
          rooms.forEach((room) => {
            user.binding.join(room);
            that.connectChatroom(room, user);
          });
        });
      }
    });
  }

  disconnect(socket) {
    const username = socket.handshake.query.username;
    const that = this;
    const user = User.find({
      username: username
    }, function(err, user) {
      if (err || room.length < 1) {
        logger.log("[disconnect] unkown user call: " + username);
      } else {
        const index = that.users.indexOf(user);
        if (index) {
          that.users.splice(index, 1);
          user.binding.send(system.disconnected);
        }
      }
    });
  }
}

module.exports = IOBinding;
