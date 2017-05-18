"use-strict"

const SystemMessage = require("../data/SystemMessage");
const logger = require("../services/logger");
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
