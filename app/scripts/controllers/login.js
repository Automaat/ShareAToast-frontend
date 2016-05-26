'use strict';

/**
 * @ngdoc function
 * @name shareAtoastApp.controller:MainCtrl
 * @description
 * # loginCtrl
 * Controller of the shareAtoastApp
 */
angular.module('shareAtoastApp')
  .controller('LoginCtrl',
    function ($rootScope, $location, $http, $localStorage, serverAddress) {
      var self = this;

      var authenticate = function(credentials, callback) {
        var headers = credentials ? {
          authorization: credentials.username + ":" + credentials.password
        } : {};

        $http
          .get(serverAddress + '/api/login', {headers: headers})
          .then(function (response) {

            $localStorage.header = {headers:  {
              'X-AUTH-TOKEN': response.headers('X-AUTH-TOKEN')
            }
            };

            $localStorage.userName = credentials.username;
            $localStorage.authenticated = true;
            $rootScope.authenticated = true;
            callback && callback();
          }, function () {
            $localStorage.authenticated = false;
            $rootScope.authenticated = false;
            callback && callback();
          });
      };

      // authenticate();
      self.credentials = {};

      self.login = function(){
        authenticate(self.credentials, function(){
        });
      };
    });
