var express = require('express');
var router = express.Router();

var Tag = require('../models/tag');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Tag.getTags(function(err, tags) {
    if (err) {
      console.log(err);
    }
    res.json(tags);
  });
});

router.get('/details/:name', function(req, res, next) {
  Tag.getTagByName(req.params.name, function(err, tag) {
    if (err) {
      console.log(err);
    }
    res.json(tag);
  });
});

router.get('/edit/:id', function(req, res, next) {
  Tag.getTagById(req.params.id, function(err, tag) {
    if (err) {
      console.log(err);
    }
    res.json(tag);
  });
});

//CREATE TAG
router.post('/', function(req, res, next) {
  //GET FORM VALUES
  var name            =     req.body.name;
  var image           =     req.body.image;
  var type            =     req.body.type;
  var team            =     req.body.team;
  var position        =     req.body.position;
  var leagueRank      =     req.body.leagueRank;
  var positionRank    =     req.body.positionRank;
  var conference      =     req.body.conference;
  var division        =     req.body.division;

  //TAG OBJECT
  var newTag = new Tag ({
    name:           name,
    image:          image,
    type:           type,
    team:           team,
    position:       position,
    leagueRank:     leagueRank,
    positionRank:   positionRank,
    conference:     conference,
    division:       division
  });

  //CALL CREATE TAG METHOD
  Tag.createTag(newTag, function(err, tag) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });

});

//UPDATE TAGS
router.put('/', function(req, res, next) {
  //GET FORM VALUES
  var id = req.body.id;
  var data = {
    name:             req.body.name,
    image:            req.body.image,
    type:             req.body.type,
    team:             req.body.team,
    position:         req.body.position,
    leagueRank:       req.body.leagueRank,
    positionRank:     req.body.positionRank,
    conference:       req.body.conference,
    division:         req.body.division
  };

  //CALL UPDATE TAG METHOD
  Tag.updateTag(id, data, function(err, tag) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  //CALL CREATE TAG METHOD
  Tag.removeTag(id, function(err, tag) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });

});

module.exports = router;
