var app = angular.module('kB', ['ngRoute', 'textAngular', 'oi.select', 'ngResource', 'angularUtils.directives.dirDisqus', 'ngAnimate', 'angularMoment']);

//FILTERS

//CONFIG
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
      templateUrl: 'views/home.view.html',
      controller: 'HomeCtrl',
      access: {restricted: false},
    }).when('/categories', {
      templateUrl: 'views/categories.view.html',
      controller: 'CategoriesCtrl',
      title: 'Categories',
      access: {restricted: false}
    }).
    when('/articles', {
        templateUrl: 'views/articles.view.html',
        controller: 'ArticlesCtrl',
        title: 'Articles',
        access: {restricted: false}
    }).
    when('/articles/details/:id', {
        templateUrl: 'views/article_details.view.html',
        controller: 'ArticlesDetailsCtrl',
        title: 'Articles',
        access: {restricted: false}
    }).
    when('/articles/category/:category', {
        templateUrl: 'views/cat_articles.view.html',
        controller: 'ArticlesCategoryCtrl',
        access: {restricted: false}
    }).
    when('/articles/type/:type', {
        templateUrl: 'views/type_articles.view.html',
        controller: 'ArticlesTypeCtrl',
        access: {restricted: false}
    }).
    when('/articles/add', {
        templateUrl: 'views/add_article.view.html',
        controller: 'ArticleCreateCtrl',
        access: {restricted: true}
    }).
    when('/articles/edit/:id', {
        templateUrl: 'views/edit_article.view.html',
        controller: 'ArticleEditCtrl',
        access: {restricted: true}
    }).
    when('/authors', {
        templateUrl: 'views/authors.view.html',
        controller: 'AuthorCtrl',
        access: {restricted: false}
    }).
    when('/articles/author/:author', {
        templateUrl: 'views/author_details.view.html',
        controller: 'AuthorsDetailsCtrl',
        access: {restricted: false}
    }).
    when('/authors/add', {
        templateUrl: 'views/add_author.view.html',
        controller: 'AuthorsCreateCtrl',
        access: {restricted: true}
    }).
    when('/authors/edit/:id', {
        templateUrl: 'views/edit_author.view.html',
        controller: 'AuthorEditCtrl',
        access: {restricted: true}
    }).
    when('/tags', {
        templateUrl: 'views/tags.view.html',
        controller: 'TagCtrl',
        access: {restricted: false}
    }).
    when('/tags/details/:name', {
        templateUrl: 'views/tag_details.view.html',
        controller: 'TagsDetailsCtrl',
        access: {restricted: false}
    }).
    when('/tags/add', {
        templateUrl: 'views/add_tag.view.html',
        controller: 'TagsCreateCtrl',
        access: {restricted: true}
    }).
    when('/tags/edit/:id', {
        templateUrl: 'views/edit_tag.view.html',
        controller: 'TagEditCtrl',
        access: {restricted: true}
    }).
    when('/backend', {
        templateUrl: 'views/welcome_backend.view.html',
        access: {restricted: true}
    }).
    when('/backend/articles', {
        templateUrl: 'views/articles_backend.view.html',
        controller: 'ArticlesCtrl',
        access: {restricted: true}
    }).
    when('/backend/tags', {
        templateUrl: 'views/tags_backend.view.html',
        controller: 'TagCtrl',
        access: {restricted: true}
    }).
    when('/backend/authors', {
        templateUrl: 'views/authors_backend.view.html',
        controller: 'AuthorCtrl',
        access: {restricted: true}
    }).
    when('/login', {
      templateUrl: 'views/login.view.html',
      controller: 'LoginCtrl',
      access: {restricted: false}
    }).
    when('/logout', {
      controller: 'LogoutCtrl',
      access: {restricted: true}
    }).
    when('/register', {
      templateUrl: 'views/register.view.html',
      controller: 'RegisterCtrl',
      access: {restricted: false}
    }).
    when('/:type/:category/:slug', {
        templateUrl: 'views/article_content.view.html',
        controller: 'ArticlesSlugCtrl',
        access: {restricted: false}
    }).
    otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});

app.run(['$rootScope', function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | Roundball Revolution';
        }
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.page.setTitle(current.$$route.title || 'NBA analysis, infographics, news and more');
    });
}]);
