class Message{
  constructor(username, message, date, chatroom, info){
    this.username = username;
    this.message = message;
    this.date = date;
    this.info = info;
    this.chatroom = chatroom;
  }
}

$(document).ready(function(){
    // WebSocket
    var socket = io.connect();
    // neue Nachricht
    socket.on('chat', function (data) {
        var date = new Date(data.date);
        $('#content').append(
            $('<li></li>').append(
                // Uhrzeit
                $('<span>').text('[' +
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
                    + ':' +
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                    + '] '
                ),
                // username

                $('<b>').text(typeof(data.username
) != 'undefined' ? data.username
 + ': ' : ''),
                // Text
                $('<span>').text(data.message))
        );
        // nach unten scrollen
        $('body').scrollTop($('body')[0].scrollHeight);
    });
    // Nachricht senden
    function senden(){
        // Eingabefelder auslesen
        var username = $('#name').val();
        var message = $('#text').val();
        // Socket senden
        socket.emit('chat', new Message(username,message, new Date(),"chatroom"));
        // Text-Eingabe leeren
        $('#text').val('');
    }
    // bei einem Klick
    $('#senden').click(senden);
    // oder mit der Enter-Taste
    $('#text').keypress(function (e) {
        if (e.which == 13) {
            senden();
        }
    });
});
