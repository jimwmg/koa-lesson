var querystring = require('querystring')
var http = require('http')

var options = {
  host:'localhost',
  port: 8080,
  path: '/index.html',
  method: 'GET',
  headers: {
    'Content-Type': 'text/html',
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('this is http-request-BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.end();