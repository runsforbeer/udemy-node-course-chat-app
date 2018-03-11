var expect = require('expect');
var {generateMessage} = require('./message');

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
})