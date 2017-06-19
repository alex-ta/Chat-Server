const SystemMessage = require('./SystemMessage');

class SystemMessenger {
  connected (chatroom, user){
		const message = new SystemMessage(user + ' connected to the Server');
		message.chatroom = chatroom;
		return message;
	}
  disconnected (chatroom, user){
		const message = new SystemMessage(user + ' diconnected from the Server');
		message.chatroom = chatroom;
		return message;
	}
}

module.exports = new SystemMessenger();
