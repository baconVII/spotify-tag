var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/lib'));
console.log('Listening on 8888');
app.listen(8888);
