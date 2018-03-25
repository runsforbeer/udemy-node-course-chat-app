const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var isString = isRealString(123);

        expect(isString).toBe(false);
        expect(isString).toBeA('boolean');
    });

    it('should reject string with only spaces', () => {
        var isString = isRealString('   ');

        expect(isString).toBe(false);
        expect(isString).toBeA('boolean');
    });

    it('should allow strings with non space characters', () => {
        var isString = isRealString('Don Marsh');

        expect(isString).toBe(true);
        expect(isString).toBeA('boolean');
    });
});
