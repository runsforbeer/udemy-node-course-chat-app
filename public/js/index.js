var socket = io(); // init socket.io request - open a socket and keep open

socket.on('connect', function() {
    console.log('connected to server...');
});

socket.on('disconnect', function() {
    console.log('disconnected from server...');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>')
    li.text(`${formattedTime} ${locationMessage.from}: `);
    a.attr('href', locationMessage.url);
    li.append(a);
    $('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not available');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function() {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});