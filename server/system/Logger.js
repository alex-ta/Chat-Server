"use-strict"
// require modules
const util = require("util");
const fs = require("fs");
const mkdir = require("mkdirp");
const endOfLine = require("os").EOL
const logFolder = "logs/"

mkdir(logFolder, function(err) { 
	if(err){
		console.log("Something went wrong with your logfile folder");
		console.log(err);
	}
});

// define logger
class Logger{
  constructor(){
    this.logFile = "";
  }

  log(msg){
    this.logMsg = "["+(new Date()).toISOString()+"]Logger: "+msg;
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
      this.logFile = logFolder + logFileIn;
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
