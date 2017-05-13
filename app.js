const http = require("http");
const express = require("express");
// local modules
const logger = require("./server/services/logger")
logger.setLogFile("app.log");

const app = express();
// define middleware
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});

// local variables
const port = 8080;



app.get("/",(req,res) =>{
  res.send("hello");
});

const server = http.createServer(app);
server.listen(8080,() =>{
  logger.log("Bind Server on port: ",port,()=>{});
});
