var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');

var articleSchema = mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: true,
    default: '',
    trim: true
  },
  blurb: {
    type: String,
    required: true
  },
  author: {
    type: String,
    index: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  credit: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
    required: true
  },
  type: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: String,
    required: true
  },
  tag: {
    type: []
  }
});

articleSchema.plugin(URLSlugs('title'));

var Article = module.exports = mongoose.model('Article', articleSchema);

//GET ALL ARTICLES
module.exports.getArticles = function(callback) {
  Article.find(callback);
}

//GET ARTICLES BY ID
module.exports.getArticleById = function(id, callback) {
    Article.findById(id, callback);
}

//GET AUTHOR ARTICLES
module.exports.getArticlesByAuthor = function(author, callback) {
  var query = {author: author};
  Article.find(query, callback);
}

//GET SLUG ARTICLES
module.exports.getArticlesBySlug = function(slug, callback) {
  var query = {slug: slug};
  Article.find(query, callback);
}

//GET CATEGORY ARTICLES
module.exports.getArticlesByCategory = function(category, callback) {
  var query = {category: category};
  Article.find(query, callback);
}

//GET TYPE ARTICLES
module.exports.getArticlesByType = function(type, callback) {
  var query = {type: type};
  Article.find(query, callback);
}

//ADD ARTICLES
module.exports.createArticle = function(newArticle, callback) {
  newArticle.save(callback);
}

//UPDATE ARTICLES
module.exports.updateArticle = function(id, data, callback){
  var title       = data.title;
  var blurb       = data.blurb;
  var author      = data.author;
  var image       = data.image;
  var credit      = data.credit;
  var body        = data.body;
  var category    = data.category;
  var type        = data.type;
  var featured    = data.featured;
  var tag         = data.tag;

  var query = {_id: id};

  Article.findById(id, function(err, article){
    if (!article) {
      return next(new Error('Could not load article'));
    } else {
      article.title       = title;
      article.blurb       = blurb;
      article.author      = author;
      article.image       = image;
      article.credit      = credit;
      article.body        = body;
      article.category    = category;
      article.type        = type;
      article.featured    = featured;
      article.tag         = tag;

      article.save(callback);
    }
  });
}

//REMOVE ARTICLE
module.exports.removeArticle = function(id, callback) {
  Article.find({_id: id}).remove(callback);
}
