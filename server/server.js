const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// create app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


// configure middleware to serve up public
app.use(express.static(publicPath));

// register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    // just to to this socket

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        // add user to room, remove from other rooms
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        socket.emit('newMessage', generateMessage('Admin','Welcome to our chatroom, thank you for joining'));

        // go to all sockets but this one
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room ${params.room}`));
    
        return callback();
    });


    socket.on('createMessage', (newMessage, callback) => {
        console.log('Received createMessage event from client...', newMessage);

        io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('client was disconnected...');
        var user = users.removeUser(socket.id); // remove user from room
        if(user) {
            // tell user was removed
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });
});

// listen on port 3000 and print to console
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})