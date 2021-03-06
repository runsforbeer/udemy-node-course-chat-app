const moment = require('moment');

var generateMessage = (from, text) => {
    return {from, text, createdAt: moment().valueOf()}
};

var generateLocationMessage = (from, lat, long) => {
    // https://www.google.com/maps?q=43.1637908,-70.9173026
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};