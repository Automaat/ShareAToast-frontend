'use strict';

/**
 * @ngdoc overview
 * @name shareAtoastApp
 * @description
 * # shareAtoastApp
 *
 * Main module of the application.
 */
var app = angular
  .module('shareAtoastApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'toastr',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/event/create', {
        templateUrl: 'views/event-creator.html',
        controller: 'eventCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/user/register', {
        templateUrl: 'views/register.html',
        controller: 'userCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtr'
      })
      .when('/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'SingleEventCtrl',
        controllerAs: 'event'
      })
      .when('/events-list', {
        templateUrl: 'views/events-list.html',
        controller: 'EventsListCtrl',
        controllerAs: 'eventsList'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  });

app.constant('serverAddress', 'http://vps259039.ovh.net:8081');

app.run(function ($rootScope, $localStorage, $http, serverAddress) {
  $rootScope.authenticated = $localStorage.authenticated;

  $rootScope.logout = function() {
    $http.post(serverAddress + '/api/logout', {}).finally(function() {
      $localStorage.$reset();
      $rootScope.authenticated = false;
      $location.path("/");
    });
  };
});
