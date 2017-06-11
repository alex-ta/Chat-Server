const SystemMessage = require("./SystemMessage");

class SystemMessenger {
  constructor(){
    this.connected = new SystemMessage("You connected to the Server");
    this.disconnected = new SystemMessage("You diconnected from the Server");
  }
}

module.exports = new SystemMessenger();
