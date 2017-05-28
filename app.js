const http = require("http");
const express = require("express");
// global variables
global.g_databaseUrl = 'mongodb://localhost/Tododb';
// local modules
const logger = require("./src/server/services/logger");
const Chat = require("./src/server/classes/IOBinding");

const schemas = require("./src/server/data/Dataschemas");
const Controller = require("./src/server/mapping/Controller");
//logger.setLogFile("app.log");
const userController = new Controller("/rest/", "user/", schemas.User);



const mongoose = require('mongoose');
mongoose.connect(global.g_databaseUrl);



const app = express();
// define middleware
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});


app.use(express.static(__dirname + '/src/public'));

// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/src/public/index.html');
});

userController.append(app);


// local variables
const port = 8080;
const server = http.createServer(app);
const chat = new Chat(server);
//logger.log(chat);

server.listen(8080,() =>{
  logger.log("Bind Server on port: " + port,()=>{});
});
