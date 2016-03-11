var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var db = require('./models');
var Kanban = db.Kanban;
var jade = require('jade');
var PORT = 3000;
var methodOverride = require('method-override'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var CONFIG = require('./server-config.json');

var app = express();

//jade middles
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(session(CONFIG.SESSION));
app.use(passport.initialize());
app.use(passport.session());

//passport auth
passport.use(new LocalStrategy(
  function (username, password, done) {
    db.User.findOne({
      where:{
        username: username
      }
    }).
    then(function (user) {
      //if no user found  
      if(!user) { //not authenticated
        return done(null, false);
      }
      if(user.password === password) {
        console.log("welcome " + user.username);
        return done(null, user); //authenticated
      }
    });
  }));

passport.serializeUser(function (user, done) {
  console.log('serialize');
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('deserialize');
 return done (null, user);
});

//returns true or false
function authenticate(username, password) {
  var CREDENTIALS = CONFIG.CREDENTIALS;
  var USERNAME = CREDENTIALS.USERNAME;
  var PASSWORD = CREDENTIALS.PASSWORD;

  return username === USERNAME &&
         password === PASSWORD;
}

//redirects to login when not authenticated
function isAuthenticated(req, res, next) {
  console.log(req.user);
  if(!req.isAuthenticated()){
    return res.redirect('login');
  }
  return next();
}


//main page
app.get('/', 
  isAuthenticated,
  function (req, res) {
  // res.render('login');
  res.redirect('/dashboard');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res) {
  console.log(req.body);
  db.User.create(req.body)
    .then(function (result) {
      res.redirect('/dashboard');
    });
});

app.get('/dashboard', 
  isAuthenticated, 
  function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/dashboard.html'));
});

app.get('/api/cards', function (req, res) {
 Kanban.findAll()
  .then(function (result){
    res.json(result);
  });

});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});
//saving a new card to database
//input form will hit this route when add card is clicked()
app.post('/api/cards', function (req, res) {
  console.log(req.body);
  Kanban.create(req.body)
  .then(function (result) {
    res.json(result);
    
  });
});

// app.post('/api/users', function (req, res) {
//   console.log(req.body);
//   Users.create(req.body)
//   .then(function (result) {
//     res.json(result);
//   });
// });

app.post('/api/cards/:id/delete', function (req, res) {
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

app.put('/api/cards/:id', function (req, res) {
  Kanban.find(
      {where: {id: req.params.id}
    })
    .then(
      Kanban.update(
      {
        title: req.body.title,
        priority:     req.body.priority,
        created_by:   req.body.created_by,
        assigned_to:  req.body.assigned_to,
        status:       req.body.status
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
