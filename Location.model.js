var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  locationName: String,
  description: String,
  zipCode: String,
  province: String,
  country: String,
  city: String,
  address: String,
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Location', LocationSchema);