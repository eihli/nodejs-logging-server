var fs = require('fs');
var jsonWriteStream = fs.createWriteStream('./log.json', {'flags': 'a'});
var textWriteStream = fs.createWriteStream('./log.txt', {'flags': 'a'});

module.exports = {
  post: {
    log: postLog
  },
  get: {
    log: getLog
  }
}

function postLog(req, res, next) {
  var jsonString = JSON.stringify(req.body);
  var textErr = '';
  for (var key in req.body) {
    textErr += new Date().toISOString();
    textErr += " - ";
    textErr += key + req.body[key] + '\n'; 
  }

  var jsonErr = {
    errorName: Object.keys(req.body)[0],
    errorMessage: req.body[Object.keys(req.body)[0]],
    timestamp: new Date().toISOString()
  };
  jsonWriteStream.write(JSON.stringify(jsonErr) + '\n', 'utf8', function() {
    console.log("Wrote JSON to file");
  });
  textWriteStream.write(textErr, 'utf8', function() {
    console.log("Wrote TEXT to file");
  });;
  res.send(200, "Log saved to file");
};

function getLog(req, res, next) {
  fs.readFile('./log.txt', function(err, data) {
    if (err) throw err;
    console.log(data);
    res.send(200, data);
  });
};