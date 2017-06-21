# Webchat

## Webchat NodeJs Server

This NodeJS Backend and React Frontend (Single Page App).
Webapp that enables multiple Chatrooms and the posibillity to link Chatbots.

![image](readme/SignUp.png?raw=true "SignUp")
![image](readme/Login.png?raw=true "Login")
![image](readme/Chat.png?raw=true "Login")

## Development Setup

- [Install NodeJS 6.1](https://nodejs.org/en/download/)
- [Install NPM 3.1](https://nodejs.org/en/download/) 
- [Install MongoDB 3.4.4](https://www.mongodb.com/download-center?jmp=nav)
- [start mongod](https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows)

change to app root folder and run:

- npm install
- npm start

## Folder Structure

### Client Tree
![Alt text](readme/Clienttree.png?raw=true "Client")
### Server Tree
![Alt text](readme/Servertree.png?raw=true "Server")

## Data Models

### Client Uml
![Alt text](readme/Client.png?raw=true "Client")
### Server Uml
![Alt text](readme/Server.png?raw=true "Server")

## More Information

### Code Conventions

- Classes in Camelcase starting big => ClassName
- Function in Camelcase starting small => funcName
- Variables in Camelcase starting small => varName
- Attributes are like variables => attName
- Variables are on top of a function or class
- Variable order:

  1. variable as const
  2. variable as let

    #### Dockerfile

## Build Release

npm build

docker build -t usecase/chat-server .

Run the Container

## Run Container

docker run -p 3000:3000 usecase/chat-server

Access the Container (check your ip -> docker-machine ip) Browse to ipaddr:3000
