const Binding = require('./Binding');
const Chatroom = require('../models/Dataschemas').Chatroom;

class IOUserBinding extends Binding {
  constructor(socket) {
    super();
    this.socket = socket;
  }

  send(data) {
    if (data.constructor.name == 'Array') {
      if (data.length > 0) {
        data.forEach((msg) => {
          console.log('msg:')
          console.log(msg);
          this.socket.emit('chat', msg);
        });
      }

    } else {
      this.socket.emit('chat', data);
    }
  }

  join(room) {
    this.socket.join(room.name);
  }

  leave(room) {
    this.socket.leave(room.name);
  }
}

module.exports = IOUserBinding;
