var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Author = module.exports = mongoose.model('Author', authorSchema);

//GET ALL AUTHORS
module.exports.getAuthors = function(callback) {
    Author.find(callback);
}

//GET AUTHORS BY NAME
module.exports.getAuthorByName = function(name, callback) {
    var query = {name: name};
    Author.find(query, callback);
}

//GET AUTHORS BY ID
module.exports.getAuthorById = function(id, callback) {
    Author.findById(id, callback);
}

//ADD AuthorS
module.exports.createAuthor = function(newAuthor, callback) {
  newAuthor.save(callback);
}

//UPDATE AUTHORS
module.exports.updateAuthor = function(id, data, callback){
  var name      = data.name;
  var bio       = data.bio;
  var image     = data.image;

  var query = {_id: id};

  Author.findById(id, function(err, author){
    if (!author) {
      return next(new Error('Could not load Author'));
    } else {
      author.name      = name;
      author.bio       = bio;
      author.image     = image;

      author.save(callback);
    }
  });
}

//REMOVE AUTHOR
module.exports.removeAuthor = function(id, callback) {
  Author.find({_id: id}).remove(callback);
}
