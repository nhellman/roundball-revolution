angular.module('kB')

.controller('TagCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });
}])

.controller('TagsDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $http.get('/tags/details/' + $routeParams.name).success(function(data) {
    $scope.tag = data;
  });

  $http.get('/articles').success(function(data) {
    $scope.articles = data;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

}])

.controller('TagsCreateCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $scope.addTag = function() {
    var data = {
      name:         $scope.name,
      image:        $scope.image,
      type:         $scope.type,
      team:         $scope.team,
      position:     $scope.position,
      leagueRank:   $scope.leagueRank,
      positionRank: $scope.positionRank,
      conference:   $scope.conference,
      division:     $scope.division
    }

    $http.post('/tags', data).success(function(status) {
      console.log(status);
      $location.path('/backend');
    });
  }
}])

.controller('TagEditCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $http.get('/tags/edit/' + $routeParams.id).success(function(data) {
    $scope.tag = data;
  });

  $scope.updateTag = function() {
    var data = {
      id:           $routeParams.id,
      name:         $scope.tag.name,
      image:        $scope.tag.image,
      type:         $scope.tag.type,
      team:         $scope.tag.team,
      position:     $scope.tag.position,
      leagueRank:   $scope.tag.leagueRank,
      positionRank: $scope.tag.positionRank,
      conference:   $scope.tag.conference,
      division:     $scope.tag.division
    }

    $http.put('/tags', data).success(function() {
      $location.path('/backend');
      console.log("This has been successfully updated");
    });
  }

  $scope.removeTag = function() {
    $http.delete('/tags/' + $routeParams.id).success(function(data) {
    });

    $location.path('/tags');
  }
}]);
