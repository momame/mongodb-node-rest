// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public" ));

var mongoose = require('mongoose');
var Location = require('./Location.model');
var Favorite = require('./Favorite.model');

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

// Return List of Places
app.get('/api/places/favorites', function(req, res) {
  console.log('getting all favorite locations');
  Favorite.find()
    .exec(function(err, locations) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(locations);
        res.json(locations);
      }
    });
});


app.get('/api/places/:location', function(req, res) {
  console.log('getting one specific location');
  Location.findOne({
    _id: req.params.id
    })
    .exec(function(err, locations) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(locations);
        res.json(locations);
      }
    });
});

app.post('/api/places/location', function(req, res) {
  var newPlace = new Location();

  newPlace.locationName = req.body.locationName;
  newPlace.description = req.body.description;
  newPlace.zipCode = req.body.zipCode;
  newPlace.province = req.body.province;
  newPlace.country = req.body.country;
  newPlace.city = req.body.city;
  newPlace.address = req.body.address;
    
  newPlace.save(function(err, location) {
    if(err) {
      res.send('error saving location');
    } else {
      console.log(location);
      res.send(location);
    }
  });
});


app.post('/api/places/favorite', function(req, res) {
  var newFav = new Favorite();

  newFav.locationId = req.body.locationId;
  newFav.created = req.body.created;
  newFav.userId = req.body.userId;
    
  newFav.save(function(err, favorite) {
    if(err) {
      res.send('error saving favorite');
    } else {
      console.log(favorite);
      res.send(favorite);
    }
  });
});


app.put('/api/places/:location', function(req, res) {
  Location.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { locationName: req.body.locationName,
    			description: req.body.description,
    			zipCode : req.body.zipCode,
    			province : req.body.province,
    			country : req.body.country,
    			city : req.body.city,
                address : req.body.address,
                isFav : req.body.isFav
    		 }
  }, {upsert: true}, function(err, newPlace) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newPlace);
      res.send(newPlace);
    }
  });
});


app.delete('/api/places/:location', function(req, res) {
  Location.findOneAndRemove({
    _id: req.params.id
  }, function(err, location) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(location);
      res.status(204);
    }
  });
});


app.listen(port, function() {
  console.log('app listening on port ' + port);
});
