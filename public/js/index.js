var socket = io(); // init socket.io request - open a socket and keep open

socket.on('connect', function() {
    console.log('connected to server...');
});

socket.on('disconnect', function() {
    console.log('disconnected from server...');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(locationMessage) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>')
    li.text(`${locationMessage.from}: `);
    a.attr('href', locationMessage.url);
    li.append(a);
    $('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        console.log('Got the message');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not available');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
});