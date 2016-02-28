var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var db = require('./models');
var Kanban = db.Kanban;
var PORT = 3000;

var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

//main page
app.get('/api', function (req, res) {
 Kanban.findAll()
  .then(function (result){
    res.json(result);
  });

});

//saving a new card to database
app.post('/api', function (req, res) {
Kanban.create(req.body)
  .then(function (result) {
    res.json(req.body);
    
  });
});





db.sequelize
  .sync()
  .then(function ()  {
    app.listen(3000, function() {
  console.log('Listening to port', PORT);
  });
});
// var server = app.listen(3000, function() {
//   console.log('Listening to port', server.address().port);
// });