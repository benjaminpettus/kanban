var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var db = require('./models');
var Kanban = db.Kanban;
var PORT = 3000;
var methodOverride = require('method-override'); 


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//main page
app.get('/api', function (req, res) {
 Kanban.findAll()
  .then(function (result){
    res.json(result);
  });

});
//saving a new card to database
//input form will hit this route when add card is clicked
app.post('/api', function (req, res) {
  Kanban.create(req.body)
  .then(function (result) {
    res.json(req.body);
    
  });
});

app.delete('/api/:id', function (req, res) {
  Kanban.destroy(
    {
      where:
        {id: parseInt(req.params.id)}
    }
  );
});

db.sequelize
  .sync()
  .then(function ()  {
    app.listen(3000, function() {
  console.log('Listening to port', PORT);
  });
});
