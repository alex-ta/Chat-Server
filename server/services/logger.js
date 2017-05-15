"use-strict"
// require modules
const fs = require('fs');
const endOfLine = require('os').EOL
// define logger
function Logger(){
  let logFile = "";

  this.log = function(msg){
    logMsg = "Logger: "+msg;
    if(!logFile){
      console.log(logMsg);
    }else{
      fs.appendFile(logFile,logMsg+endOfLine, (err) => {
        if(err){
          console.log(err);
        }
      });
    }
  }

  this.setLogFile = function(logFileIn){
    if(typeof(logFileIn) == "string"){
      logFile = logFileIn;
    } else {
      this.log("A Logfile should be a string not a " + typeof(logFileIn));
    }
  }

  this.getLogFile = function(){
    return logFile;
  }
}

module.exports = new Logger();
