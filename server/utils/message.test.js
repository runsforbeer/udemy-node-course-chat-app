var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        // store response
        var from = 'don';
        var text = 'dons message';

        var newMessage = generateMessage(from, text);

        expect(newMessage.from).toBe(from);
        expect(newMessage.text).toBe(text);
        // same as above
        expect(newMessage).toInclude({from,text});
        
        expect(newMessage.createdAt).toBeA('number');
        // assert from is correct (matches passed in)
        // assert text is correct
        // assert createdAt is a number .toBeA('number')
    })
});

describe('generate location message', () => {
    it('should generate the correct location message object', () => {
        var from = 'don';
        var lat = 123;
        var long = -321;
        var url = `https://www.google.com/maps?q=${lat},${long}`;

        var msg = generateLocationMessage(from, lat, long);

        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,url});
    });
});