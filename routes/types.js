var express = require('express');
var router = express.Router();

var Type = require('../models/type');

/* GET users listing. */
router.get('/', function(req, res, next) {
Type.getTypes(function(err, types) {
    if (err) {
      console.log(err);
    }
    res.json(types);
  });
});

router.get('/:id', function(req, res, next) {
  Type.getTypeById(req.params.id, function(err, type) {
    if (err) {
      console.log(err);
    }
    res.json(type);
  });
});

module.exports = router;
