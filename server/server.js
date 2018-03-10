const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// create app
var app = express();

// configure middleware to serve up public
app.use(express.static(publicPath));

// listen on port 3000 and print to console
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})