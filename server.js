var express = require('express');
var app = express();
var fs = require('fs');
var bodyparser = require('body-parser');
var writeStream = fs.createWriteStream('./log.json', {'flags': 'a'});
app.use(bodyparser.json());

app.post('/log', function(req, res) {
  console.log(req.body);
  var data = JSON.stringify(req.body) + '\n';
  writeStream.write(data, 'utf8', function() {
    console.log("Done writing to file");
  });
});

app.post('/raw', function(req, res) {
  console.log(req.body);
  writeStream.write(JSON.stringify(req.body) + '\n', 'utf8', function() {
    console.log("Wrote raw to file");
  });
});

app.listen(7070, function() {
  console.log("Listening on port 7070");
});