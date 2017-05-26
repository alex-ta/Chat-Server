"use-strict"
// require modules
const util = require("util");
const fs = require("fs");
const endOfLine = require("os").EOL
const logFolder = "logs/"

// define logger
class Logger{
  constructor(){
    this.logFile = "";
  }

  log(msg){
    this.logMsg = "Logger: "+msg;
    if(!this.logFile){
      console.log(this.logMsg);
    }else{
      fs.appendFile(this.logFile,this.logMsg+endOfLine, (err) => {
        if(err){
          console.log(err);
        }
      });
    }
  }

  setLogFile(logFileIn){
    if(typeof(logFileIn) == "string"){
      this.logFile = this.logFolder + logFileIn;
    } else {
      this.log("A Logfile should be a string not a " + typeof(logFileIn));
    }
  }

  getLogFile(){
    return this.logFile;
  }

  logJson(obj){
    this.log(JSON.stringify(util.inspect(obj)));
  }
}

module.exports = new Logger();
