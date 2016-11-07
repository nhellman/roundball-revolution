var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  leagueRank: {
    type: Number,
    required: true
  },
  positionRank: {
    type: Number,
    required: true
  },
  conference: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Tag = module.exports = mongoose.model('Tag', tagSchema);

//GET ALL TAGS
module.exports.getTags = function(callback) {
  Tag.find(callback);
}

//GET TAGS BY NAME
module.exports.getTagByName = function(name, callback) {
    var query = {name: name}
    Tag.find(query, callback);
}

//GET TAGS BY NAME
module.exports.getTagById = function(id, callback) {
    Tag.findById(id, callback);
}

//ADD TAGS
module.exports.createTag = function(newTag, callback) {
  newTag.save(callback);
}

//UPDATE TAGS
module.exports.updateTag = function(id, data, callback){
  var name          = data.name;
  var image         = data.image;
  var type          = data.type;
  var team          = data.team;
  var position      = data.position;
  var leagueRank    = data.leagueRank;
  var positionRank  = data.positionRank;
  var conference    = data.conference;
  var division      = data.division;

  var query = {_id: id};

  Tag.findById(id, function(err, tag){
    if (!tag) {
      return next(new Error('Could not load tag'));
    } else {
      tag.name          = name;
      tag.image         = image;
      tag.type          = type;
      tag.team          = team;
      tag.position      = position;
      tag.leagueRank    = leagueRank;
      tag.positionRank  = positionRank;
      tag.conference    = conference;
      tag.division      = division;

      tag.save(callback);
    }
  });
}

//REMOVE TAG
module.exports.removeTag = function(id, callback) {
  Tag.find({_id: id}).remove(callback);
}
