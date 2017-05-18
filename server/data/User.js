"use-strict"

class User {
  constructor() {
    this.userId;
    this.userName;
    this.userPassword;
    this.lastLogin;
    this.image;
    this.state;
    this.firstName;
    this.lastName;
    this.birthday;
    this.description;
    this.favouriteChatroom;
    this.binding = "dynamic";
  }
}

// export user class
module.exports = User;
