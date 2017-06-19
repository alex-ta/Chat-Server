const SystemMessage = require('./SystemMessage');
const config = require('../config');

class SystemMessenger {
  connected(chatroom, user) {
    const message = new SystemMessage(user + ' connected to the Server');
    message.chatroom = chatroom;
    message.image = config.url.avatarUrl + '/sys.png';
    return message;
  }
  disconnected(chatroom, user) {
    const message = new SystemMessage(user + ' diconnected from the Server');
    message.chatroom = chatroom;
    message.image = config.url.avatarUrl + '/sys.png';
    return message;
  }
}

module.exports = new SystemMessenger();
