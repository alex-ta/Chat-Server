const Message = require('../models/Message')

class SystemMessage extends Message {
  constructor(message, info) {
    super('System', message, new Date(), 'system', info);
  }
}
module.exports = SystemMessage;
