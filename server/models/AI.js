'use-strict'

const User = require('./User');

class AI extends User {
  constructor(socket) {
    super(socket);
  }
}

// export user class
module.exports = AI;
