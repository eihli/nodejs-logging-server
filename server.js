var express = require('express');
var app = express();
var fs = require('fs');
var bodyparser = require('body-parser');
var handlers = require('./handlers.js');

app.use(bodyparser.json());

app.post('/log', handlers.post.log);
app.get('/log', handlers.get.log);

app.listen(7070, function() {
  console.log("Listening on port 7070");
});