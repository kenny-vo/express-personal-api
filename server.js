// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api. Routes are below! Learn about my vacations :)",
    documentationUrl: "https://github.com/kenzovo/express-personal-api/tree/master",
    baseUrl: "https://stark-wildwood-36615.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/vacations", description: "List of all vacations"},
      {method: "GET", path: "/api/vacations/:id", description: "Get vacations by ID"},
      {method: "POST", path: "/api/vacations/", description: "Create a new vacation"},
      {method: "PUT", path: "/api/vacations/:id", description: "Update vacations by ID"},
      {method: "DELETE", path: "/api/vacations/:id", description: "Delete vacation by ID"}
    ]
  })
});

// show profile
app.get('/api/profile', function (req, res) {
    var profile = {
      name: 'Kenny Vo',
      githubUsername: 'kenzovo',
      githubLink:'https://github.com/kenzovo',
      personalSiteLink: 'https://kenzovo.github.io/',
      currentCity: 'Austin',
      isHungry: true,
      projects: ['tic tac toe', 'ajaxify reddit', 'geoquakes']
    };
      res.json(profile);

});

// show all vacations
app.get('/api/vacations', function (req, res) {
  db.Vacation.find({})
    .exec(function(err, vacations){
      if (err) {
        return console.log(err);
      }
      res.json(vacations);
    });

});

// get vacation by id
app.get('/api/vacations/:id', function (req, res) {
  db.Vacation.findById(req.params.id)
    .exec(function(err, vacation) {
      if (err) {return console.log(err)
      }
    res.json(vacation);
  });

});

// create new vacation
app.post('/api/vacations', function (req, res) {
  var newVacation = new db.Vacation({
      place: req.body.place,
      date: req.body.date,
      duration: req.body.duration,
      photo: req.body.photo
  });

  db.Vacation.create(newVacation, function(err, succ) {
    if (err) {return console.log(err)}
    res.json(succ);
  });

});

// update a vacation
app.put('/api/vacations/:id', function (req, res) {
  var vacationId = req.params.id;

      var updatedVacation = {
        place: req.body.place,
        date: req.body.date,
        duration: req.body.duration,
        photo: req.body.photo
      }

    db.Vacation.findOneAndUpdate({_id: vacationId}, updateVacation, { new: true}, function (err, updatedVacation) {
      if (err) {return console.log(err)}
      res.send(updateVacation);
    });
});

// delete vacation
app.delete('/api/vacations/:id', function (req, res) {
  console.log('books delete', req.params);
  var vacationId = req.params.id;
  db.Vacation.findOneAndRemove({_id: vacationId})
    .exec(function (err, deletedVacation) {
    res.json(deletedVacation);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
