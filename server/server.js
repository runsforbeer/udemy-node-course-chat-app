const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('disconnect', () => {
        console.log('client was disconnected...');
    });
});

// listen on port 3000 and print to console
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})