// 3rd party
var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));

/* serves all the static files */

app.get('/', function(req, res){ 

  res.sendFile(__dirname + 'index.html');

});

// redirects at index.html and 404s



app.listen(process.env.PORT || 80);

