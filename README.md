# Webchat

## Webchat NodeJs Server

This Webserver creates an NodeJS Backend and surfes a Chat ui and differend Chatrooms. It contains normal Users and AI Users

## Setup

(Install NodeJS 6.1)[<https://nodejs.org/en/download/>] (Install NPM 3.1)[<https://nodejs.org/en/download/>] (Install MongoDB 3.4.4)[<https://www.mongodb.com/download-center?jmp=nav>] (start mongod)[<https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows>]

change to app root folder and run:

- npm install
- npm start

## Folder Structure

## Data Models

## More Information

### Code Conventions

- Classes in Camelcase starting big => ClassName
- Function in Camelcase starting small => funcName
- Variables in Camelcase starting small => varName
- Attributes are like variables => attName
- Private variables and functions marked with _ => _attName
- Globale variables and functions marked with g_ => g_attName
- Variables are on top of a function or class
- Variable order:

  1. variable as const
  2. variable as let

    #### Dockerfile

Build Release

docker build -t "chat" .

Run the Container

docker run -p 3000:3000 chat

Access the Container (check your ip -> docker-machine ip) Browse to ipaddr:3000

### Used Modules

Node modules

### Used Frameworks

Frameworks
