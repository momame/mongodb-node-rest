// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var Location = require('./Location.model');

var port = 8080;
var db = 'mongodb://localhost/example'

mongoose.connect(db);

app.get('/', function(req, res) {
  res.send('happy to be here');
});

// Return List of Places
app.get('/api/places', function(req, res) {
  console.log('getting all locations');
  Location.find({})
    .exec(function(err, locations) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(locations);
        res.json(locations);
      }
    });
});