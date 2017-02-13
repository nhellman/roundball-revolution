angular.module('kB')

.controller('HomeCtrl', ['$scope', '$http', '$resource', '$location', function($scope, $http, $resource, $location) {
  $http.get('/articles').success(function(data) {
    $scope.articles = data;
  });

  $http.get('/authors').success(function(data) {
    $scope.authors = data;
  });

  $http.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $scope.currentPath = $location.path();

  //$http.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=hoopsrevolution').success(function() {
  	//$scope.twitter = data;
  	//console.log(data);
  //});

	//$scope.twitter = $resource('https://api.twitter.com/1.1/search/tweets.json/:action',
		//{action: '?', screen_name: 'hoopsrevolution'},
		//{get: {method: 'JSONP'}});
	//$scope.twitter.get();


}]);
