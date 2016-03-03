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
  console.log(req.body);
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
  )
  .then(function (card){
    res.json(card);
  });
});

app.put('/api/:id', function (req, res) {
  Kanban.find(
      {where: {id: req.params.id}
    })
    .then(
      Kanban.update(
      {
        title: req.body.title,
        priority: req.body.priority,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to
      },
      {
      where: {id: req.params.id},
        returning: true 
      }
    )
    .then(function () {
      res.json(req.body);
    }));
  });


db.sequelize
  .sync()
  .then(function ()  {
    app.listen(3000, function() {
  console.log('Listening to port', PORT);
  });
});
