var mongoose = require('mongoose');

var typeSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  }
});

var Type = module.exports = mongoose.model('Type', typeSchema);

//GET ALL TYPES
module.exports.getTypes = function(callback) {
  Type.find(callback);
}

//GET TYPES ARTICLES
module.exports.getTypesByType = function(type, callback) {
  var query = {type: type};
  Type.find(query, callback);
}

//CREATE TYPE
module.exports.createType = function(newType, callback) {
    newType.save(callback);
}
