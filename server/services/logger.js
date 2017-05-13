"use-strict"
// require modules
const fs = require('fs');
const endOfLine = require('os').EOL
// define logger
function Logger(){
  let logFile = "";

  this.log = function(msg){
    if(!logFile){
      console.log(msg);
    }else{
      fs.appendFile(logFile,msg+endOfLine, (err) => {
        if(err){
          console.log(err);
        }
      });
    }
  }

  this.setLogFile = function(logFileIn){
    logFile = logFileIn;
  }

  this.getLogFile = function(){
    return logFile;
  }
}

module.exports = new Logger();
