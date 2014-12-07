'use strict';

var app = angular.module('app', ['ui.router', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  });
});

app.service('Request', function($resource) {
  return $resource('/api/requests/:id', {id: '@_id'});
});


app.controller('HomeController', function($scope, Request) {
  $scope.requests = Request.query();
  
  $scope.request = new Request();

  $scope.newRequest = function() {
    $scope.request.$save(function() {
      $scope.requests = Request.query();
    });

    $scope.request = new Request();
  };
});
