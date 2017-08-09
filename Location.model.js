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

module.exports = mongoose.model('Location', LocationSchema);