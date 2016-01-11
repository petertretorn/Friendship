// Invoke 'strict' JavaScript mode
var http = require('http'),
    socketio = require('socket.io'),
    server,
    io,
    socketClients = [],
    memberService = require('../services/memberService.js'),
    _ = require('lodash');

exports.server = function(app) {
	
    server = http.createServer(app);
    io = socketio.listen(server);

    io.on('connection', function(socket) {
        console.log('socket : ' + socket.id);

        socketClients.push(socket.id);
        /*
        for (var prop in socket) {
            console.log(prop);
        }*/

        socket.on('members.count', function() {
            io.emit('members.count', { count:  memberService.membersOnlineCount() });
        });

        socket.on('member.login', function(data) {

            var onlineMember = { 
                username: data.username,
                socket: socket
            }

            memberService.addOnlineMemeber(onlineMember);

            io.emit('members.count', { count:  memberService.membersOnlineCount() });
        });

        socket.on('member.logout', function(data) {

            memberService.removeOnlineMember(data.username);

            io.emit('members.count', { count:  memberService.membersOnlineCount() });
        });

        io.on('disconnect', function() {
            _.pull(socketClients, socket.id);
        })

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