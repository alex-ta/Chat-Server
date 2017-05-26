const http = require("http");
const express = require("express");
// local modules
const logger = require("./src/server/services/logger");
const Chat = require("./src/server/classes/IOBinding");
//logger.setLogFile("app.log");


const app = express();
// define middleware
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});


app.use(express.static(__dirname + '/public'));

// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/index.html');
});


// local variables
const port = 8080;
const server = http.createServer(app);
const chat = new Chat(server);
//logger.log(chat);

server.listen(8080,() =>{
  logger.log("Bind Server on port: " + port,()=>{});
});
