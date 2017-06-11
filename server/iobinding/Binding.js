"use-strict"

const SystemMessage = require("../system/SystemMessage");
const logger = require("../system/Logger");
const events = require('events');


class Binding {
  connect(){
    this.emit("connect");
    events.EventEmitter.call(this);
  }
  disconnect(){
    this.emit("disconnect");
  }
  send(data){
    this.emit("send",data);
  }
}

Binding.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Binding;
