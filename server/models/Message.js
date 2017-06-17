class Message {
  constructor(username, message, date, chatroom, info) {
    this.username = username;
    this.message = message;
    this.date = date;
    this.info = info;
    this.chatroom = chatroom;
  }
}
module.exports = Message;
