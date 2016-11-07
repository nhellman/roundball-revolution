angular.module('kB')

.controller('AuthorCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });
}])

.controller('AuthorsCreateCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.addAuthor = function() {
    var data = {
      name:       $scope.name,
      bio:        $scope.bio,
      image:      $scope.image
    }

    $http.post('/authors', data).success(function(status) {
      console.log(status);
      $location.path('/authors');
    });
  }
}])

.controller('AuthorEditCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $http.get('/authors/edit/' + $routeParams.id).success(function(data) {
    console.log(data);
    $scope.author = data;
  });

  $scope.updateAuthor = function() {
    var data = {
      id:         $routeParams.id,
      name:       $scope.author.name,
      bio:        $scope.author.bio,
      image:      $scope.author.image
    }

    $http.put('/authors', data).success(function() {
      $location.path('/authors');
      console.log("This has been successfully updated");
    });
  }

  $scope.removeAuthor = function() {
    $http.delete('/authors/' + $routeParams.id).success(function(data) {
      console.log(data);
    });

    $location.path('/authors');
  }
}]);
