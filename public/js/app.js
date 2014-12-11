'use strict';

var app = angular.module('app', ['ui.router', 'ngResource']);

var thingiurlbase = '/components/thingiview.js/javascripts';
var Thingiview = Thingiview || {};

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'partials/register.html',
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html'
  })
  .state('account', {
    url: '/account',
    templateUrl: 'partials/account.html',
    controller: 'AccountController'
  })
  .state('request', {
    url: '/request',
    templateUrl: 'partials/request.html',
    controller: 'RequestController'
  });
});

app.service('Request', function($resource) {
  return $resource('/api/requests/:id', {id: '@_id'}, {
    me: {method: 'GET', url: '/api/requests/me', isArray:true },
    reserve: {method: 'POST', url: '/api/requests/:id/reserve'}
  });
});

app.service('Job', function($resource) {
  return $resource('/api/jobs/:id', {id: '@_id'});
});

app.service('User', function($resource) {
  return $resource('/api/user/:id', {id: '@_id'}, {
    register: {method: 'POST', url: '/api/user/register'},
    me: {method: 'GET', url: '/api/users/me' },
    update: {method: 'PUT', url: '/api/users/:id'}
  });
});

app.controller('HeaderController', function($scope, User) {
  $scope.me = User.me();
});

app.controller('HomeController', function($scope, Request, User) {
  $scope.requests = Request.query();
  $scope.me = User.me();

  $scope.reserveRequest = function(_id) {
    console.log(_id);
    Request.reserve({_id: _id}, function() {
      $scope.requests = Request.query();
    });
  };
});

app.controller('RequestController', function($scope, User, Request, $state) {

  $scope.reloadModel = function() {
    var model = $scope.request.stl;
    var thingiview = new Thingiview('viewer');
    thingiview.setObjectColor('#C0D8F0');
    thingiview.initScene();
    thingiview.loadSTL(model);
  };

  $scope.request = new Request();
  $scope.request.stl = 'https://thingiverse-production.s3.amazonaws.com/assets/c8/c8/86/b5/c9/photo_frame.stl';
  $scope.request.picture = "http://thingiverse-production.s3.amazonaws.com/renders/ab/0d/27/8c/d8/photo_frame02_preview_featured.jpg"

  $scope.newRequest = function() {
    $scope.request.$save(function() {
      $state.go('home');
    });

    $scope.request = new Request();
  };
});

app.controller('AccountController', function($scope, User, Request, Job) {
  $scope.me = User.me();
  $scope.requests = Request.me();
  $scope.jobs = Job.query();
});
