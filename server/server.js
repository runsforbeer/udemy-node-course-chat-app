const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// create app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);



// configure middleware to serve up public
app.use(express.static(publicPath));

// register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    // just to to this socket
    socket.emit('newMessage', generateMessage('Admin','Welcome to our chatroom, thank you for joining'));

    // go to all sockets but this one
    socket.broadcast.emit('newMessage', generateMessage('Admin', `New User has joined the chatroom`));


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
    });
});

// listen on port 3000 and print to console
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})