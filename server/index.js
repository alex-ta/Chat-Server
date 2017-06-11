const http = require("http");
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import mongoose from 'mongoose';

import logger from "./system/Logger";
//logger.setLogFile("app.log");

import Chat from "./iobinding/IOBinding";
import Schemas from "./models/Dataschemas";
import Controller from "./api/Controller";

const userController = new Controller("/auth/", "user/", Schemas.User);


const config  = require('./config');
const auth = require('./auth/auth');

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



// compile code with webpack
const compiler = webpack(webpackConfig);

// use hot server
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


//server content
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const port = 3000;
const server = http.createServer(app);
const chat = new Chat(server);
//logger.log(chat);

server.listen(3000,() =>{
  logger.log("Bind Server on port: " + port,()=>{});
});