

export function senden(msg){
    socket.emit('chat', new Message(username,message, new Date(),"chatroom"));
}
