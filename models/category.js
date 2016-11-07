var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String
  }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

//GET ALL CATEGORIES
module.exports.getCategories = function(callback) {
  Category.find(callback);
}

//GET CATEGORIES BY ID
module.exports.getCategoryById = function(id, callback) {
    Category.findById(id, callback);
}

//GET CATEGORY ARTICLES
module.exports.getCategoriesByCategory = function(category, callback) {
  var query = {category: category};
  Category.find(query, callback);
}

//CREATE CATEGORY
module.exports.createCategory = function(newCategory, callback) {
    newCategory.save(callback);
}
