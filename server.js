var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var db = require('./models');

var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

//main page
app.get('/api', function (req, res) {
 res.send('string of something');
});

//saving a new card to database
app.post('/api', function (req, res) {
 
  res.json(req.body);
});







var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});