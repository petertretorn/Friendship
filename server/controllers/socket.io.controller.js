// Invoke 'strict' JavaScript mode
var http = require('http'),
    socketio = require('socket.io'),
    server,
    io,
    memberService = require('../services/memberService.js');

// Create the chat configuration
exports.server = function(app) {
	
    server = http.createServer(app);
    io = socketio.listen(server);

    io.on('connection', function(socket) {
        socket.on('members.count', function() {
            io.emit('members.count', { count:  memberService.membersOnline() });
        });

        socket.on('member.login', function() {
            console.log('memberService.membersOnline : ' + memberService.membersOnline());
            var count = memberService.incrementMembersOnline();
            console.log('member.login : ' + count);
            io.emit('members.count', { count:  memberService.membersOnline() });
        });

        socket.on('member.logout', function() {
            memberService.decrementMembersOnline();
            io.emit('members.count', { count:  memberService.membersOnline() });
        });

        socket.on('chatMessage', function(message) {
            message.type = 'message';
            message.created = Date.now();
            message.username = socket.request.user.username;

            io.emit('chatMessage', message);
        });
    });

    return server;
};

exports.io = function() {
    return io;
}