var express = require('express');
var path = require('path');
var app = express();

// Serve static files from 'src' and contract build directories
app.use(express.static('src'));
app.use(express.static('../casino-contract/build/contracts'));

// Send index.html when accessing the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Start the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
