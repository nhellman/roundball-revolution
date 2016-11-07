var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.getArticles(function(err, articles) {
    if (err) {
      console.log(err);
    }
    res.json(articles);
  });
});

router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function(err, article) {
    if (err) {
      console.log(err);
    }
    res.json(article);
  });
});

router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function(err, articles) {
    if (err) {
      console.log(err);
    }
    res.json(articles);
  });
});

router.get('/type/:type', function(req, res, next) {
  Article.getArticlesByType(req.params.type, function(err, articles) {
    if (err) {
      console.log(err);
    }
    res.json(articles);
  });
});

router.get('/author/:author', function(req, res, next) {
  Article.getArticlesByAuthor(req.params.author, function(err, articles) {
    if (err) {
      console.log(err);
    }
    res.json(articles);
  });
});

router.get('/:type/:category/:slug', function(req, res, next) {
  Article.getArticlesBySlug(req.params.slug, function(err, article) {
    if (err) {
      console.log(err);
    }
    res.json(article);
  });
});

//CREATE ARTICLE
router.post('/', function(req, res, next) {
  //GET FORM VALUES
  var title     =     req.body.title;
  var blurb     =     req.body.blurb;
  var author    =     req.body.author;
  var image     =     req.body.image;
  var credit    =     req.body.credit;
  var category  =     req.body.category;
  var type      =     req.body.type;
  var tag       =     req.body.tag;
  var featured  =     req.body.featured;
  var body      =     req.body.body;

  //ARTICLE OBJECT
  var newArticle = new Article ({
    title:      title,
    blurb:      blurb,
    author:     author,
    image:      image,
    credit:     credit,
    category:   category,
    type:       type,
    tag:        tag,
    featured:   featured,
    body:       body
  });

  //CALL CREATE ARTICLE METHOD
  Article.createArticle(newArticle, function(err, article) {
    if (err) {
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/articles');
  });

});

//UPDATE ARTICLE
router.put('/', function(req, res, next) {
  //GET FORM VALUES
  var id = req.body.id;
  var data = {
    title:      req.body.title,
    blurb:      req.body.blurb,
    author:     req.body.author,
    image:      req.body.image,
    credit:     req.body.credit,
    category:   req.body.category,
    type:       req.body.type,
    tag:        req.body.tag,
    featured:   req.body.featured,
    body:       req.body.body
  };

  //CALL UPDATE ARTICLE METHOD
  Article.updateArticle(id, data, function(err, article) {
    if (err) {
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/articles');
  });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  //CALL CREATE ARTICLE METHOD
  Article.removeArticle(id, function(err, article) {
    if (err) {
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/backend/articles');
  });

});

module.exports = router;
