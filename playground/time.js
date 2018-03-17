const moment = require('moment');

// var date = moment();
// console.log(date.format('MMM Do, YYYY h:mm a'));

// 10:57 pm

var createdAt = 123;
var date = moment(createdAt);
console.log(date.format('MMM Do, YYYY h:mm a'));