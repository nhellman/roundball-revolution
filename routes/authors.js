var express = require('express');
var router = express.Router();

var Author = require('../models/author');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Author.getAuthors(function(err, authors) {
    if (err) {
      console.log(err);
    }
    res.json(authors);
  });
});

//GET BY NAME
router.get('/:name', function(req, res, next) {
  Author.getAuthorByName(req.params.name, function(err, author) {
    if (err) {
      console.log(err);
    }
    res.json(author);
  });
});

//GET BY ID
router.get('/edit/:id', function(req, res, next) {
  Author.getAuthorById(req.params.id, function(err, author) {
    if (err) {
      console.log(err);
    }
    res.json(author);
  });
});

//CREATE AUTHOR
router.post('/', function(req, res, next) {
  //GET FORM VALUES
  var name      =     req.body.name;
  var bio       =     req.body.bio;
  var image     =     req.body.image;

  //AUTHOR OBJECT
  var newAuthor = new Author ({
    name:     name,
    bio:      bio,
    image:    image
  });

  //CALL CREATE AUTHOR METHOD
  Author.createAuthor(newAuthor, function(err, author) {
    if (err) {
      console.log(err);
    }
    res.location('/authors');
    res.redirect('/authors');
  });

});

//UPDATE AUTHOR
router.put('/', function(req, res, next) {
  //GET FORM VALUES
  var id = req.body.id;
  var data = {
    name:       req.body.name,
    bio:        req.body.bio,
    image:      req.body.image
  };

  //CALL UPDATE AUTHOR METHOD
  Author.updateAuthor(id, data, function(err, author) {
    if (err) {
      console.log(err);
    }
    res.location('/authors');
    res.redirect('/authors');
  });

});

router.delete('/edit/:id', function(req, res, next) {
  var id = req.params.id;

  Author.removeAuthor(id, function(err, author) {
    if (err) {
      console.log(err);
    }
    res.location('/authors');
    res.redirect('/authors');
  });

});

module.exports = router;
