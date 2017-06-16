// check passed args for development
const isDevelopment = process.argv.indexOf("dev") >= 0;

const http = require("http");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const logger = require("./system/Logger");
if(!isDevelopment){
	logger.setLogFile("server.log");
}
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


if(isDevelopment){
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('../webpack.config.dev');
	const webpack = require('webpack');
	// compile code with webpack
	const compiler = webpack(webpackConfig);
	// use hot server
	app.use(webpackMiddleware(compiler, {
	  hot: true,
	  publicPath: webpackConfig.output.publicPath,
	  noInfo: true
	}));
	app.use(webpackHotMiddleware(compiler));
} else {
	//server content
	app.get('/bundle.js', (req, res) => {
	  res.sendFile(path.join(__dirname, '../build/bundle.js'));
	});
}



//server content
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const port = 3000;
const server = http.createServer(app);
const chat = new Chat(server);
//logger.log(chat);

server.listen(port,() =>{
  logger.log("Bind Server on port: " + port,()=>{});
});