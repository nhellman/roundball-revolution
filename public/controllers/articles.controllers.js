angular.module('kB')

.controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/articles').success(function(data) {
    $scope.articles = data;
  });
}])

.controller('ArticlesCategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/articles/category/' + $routeParams.category).success(function(data) {
    $scope.cat_articles = data;
    $scope.category = $routeParams.category;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

  function ArticlesCategoryCtrl($scope) {
    //Load product or use resolve in routing
    $scope.page.setTitle('$scope.category.name');

  }
}])

.controller('AuthorsDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $http.get('/authors/' + $routeParams.author).success(function(data) {
    $scope.author = data;
  });

  $http.get('/articles/author/' + $routeParams.author).success(function(data) {
    $scope.author_articles = data;
    $scope.article = $routeParams.author;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

}])

.controller('ArticlesDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $http.get('/articles/' + $routeParams.id).success(function(data) {
    $scope.article = data;
  });

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });
}])

.controller('ArticleCreateCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $http.get('/categories').success(function(data) {
    $scope.categories = data;
  });

  $http.get('/types').success(function(data) {
    $scope.types = data;
  });

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

  $scope.addArticle = function() {
    var data = {
      title:      $scope.title,
      blurb:      $scope.blurb,
      author:     $scope.author,
      image:      $scope.image,
      credit:     $scope.credit,
      body:       $scope.body,
      tag:        $scope.tag,
      type:       $scope.type,
      featured:   $scope.featured,
      category:   $scope.category
    }

    $http.post('/articles', data).success(function(data, status) {
      console.log(status);
      $location.path('/articles');
    });
  }
}])

.controller('ArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $http.get('/categories').success(function(data) {
    $scope.categories = data;
  });

  $http.get('/types').success(function(data) {
    $scope.types = data;
  });

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

  $http.get('/articles/' + $routeParams.id).success(function(data) {
    $scope.article = data;
  });

  $scope.updateArticle = function() {
    var data = {
      id:         $routeParams.id,
      title:      $scope.article.title,
      blurb:      $scope.article.blurb,
      author:     $scope.article.author,
      image:      $scope.article.image,
      credit:     $scope.article.credit,
      body:       $scope.article.body,
      tag:        $scope.article.tag,
      type:       $scope.article.type,
      featured:   $scope.article.featured,
      category:   $scope.article.category
    }

    $http.put('/articles', data).success(function() {
      $location.path('/articles');
      console.log("This has been successfully updated");
    });
  }

  $scope.removeArticle = function() {
    $http.delete('/articles/' + $routeParams.id).success(function(data) {
      console.log(data);
    });

    $location.path('/articles');
  }
}])


.controller('ArticlesSlugCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $http.get('/articles/' + $routeParams.type + '/' + $routeParams.category + '/' + $routeParams.slug).success(function(data) {
    $scope.article = data;
  });

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

  $http.get('/articles').success(function(data) {
    $scope.articleModule = data;
  });

  function ArticlesSlugCtrl($scope) {
    //Load product or use resolve in routing
    $scope.page.setTitle('$scope.article[0].title');
  }

}])

.controller('ArticlesTypeCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/articles/type/' + $routeParams.type).success(function(data) {
    $scope.type_articles = data;
    $scope.type = $routeParams.type;
  });

}]);
