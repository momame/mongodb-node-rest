var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
  locationId:{type: Schema.Types.ObjectId, ref: 'Location'},
  created: { type: Date, default: Date.now },
  userId: { type:Number, default:null}
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Favorite', FavoriteSchema);