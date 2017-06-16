const http = require("http");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const logger = require("./system/Logger");
//logger.setLogFile("app.log");

const Chat = require("./iobinding/IOBinding");
const Schemas = require("./models/Dataschemas");
const Controller = require("./api/Controller");
const config = require("./config");
const auth = require('./auth/auth');

const userController = new Controller("/auth/", "user/", Schemas.User);
const roomController = new Controller("/auth/", "chatroom/", Schemas.Chatroom);


// setting the promise library
mongoose.Promise = require('bluebird');
// setting database url
mongoose.connect(config.databaseUrl);

let app = express();

/**Middlewate*/
// user bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
// logger
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});

// init auth
auth.init(app);

userController.append(app);
roomController.append(app);

//server content
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, './bundle.js'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const server = http.createServer(app);
const chat = new Chat(server);
//logger.log(chat);

server.listen(config.serverPort,() =>{
  logger.log("Bind Server on port: " + config.serverPort,()=>{});
});
