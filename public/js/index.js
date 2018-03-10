var socket = io(); // init socket.io request - open a socket and keep open

socket.on('connect', function() {
    console.log('connected to server...');

    socket.emit('createMessage', {
        from: 'don@email.com',
        text: 'okay, beers sounds great!'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server...');
});

socket.on('newMessage', function(data) {
    console.log('newMessage event received: ' + JSON.stringify(data));
});