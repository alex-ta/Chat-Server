const config = require("../config");
const Schemas = require("../models/Dataschemas");
const Controller = require("./Controller");

const authUrl = config.url.authenticated + "/";
const userController = new Controller(authUrl, "user/", Schemas.User);
const roomController = new Controller(authUrl, "chatroom/", Schemas.Chatroom);


module.exports = {init:function(app){
    userController.append(app);
    roomController.append(app);
  }
}
