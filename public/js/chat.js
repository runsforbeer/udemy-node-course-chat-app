var socket = io(); // init socket.io request - open a socket and keep open

function scrollToBottom() {
    // selectors
    var message = $('#messages');
    var newMessage = message.children('li:last-child');

    // heights
    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');;
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected to server...');

    // join a room via an event
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href='/';
        }
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server...');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');
    users.forEach(function(user) {
        ol.append($(`<li></li>`).text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocationMessage', function(locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a');

    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        text: 'My current location',
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
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