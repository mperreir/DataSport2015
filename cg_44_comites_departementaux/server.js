var http = require('http');
var path = require('path');

/*var express = require('express');
var router = express();
var server = http.createServer(router);
router.use(express.static(path.resolve(__dirname, 'html')));
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});*/

var express = require('express');
var path = require('path');
var app = express();

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'html')));

module.exports = app;