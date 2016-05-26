'use strict';

/**
 * @ngdoc function
 * @name shareAtoastApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the shareAtoastApp
 */
angular.module('shareAtoastApp')
  .controller('AccountCtrl',[ '$localStorage', '$scope', '$http', 'toastr', 'serverAddress', function ($localStorage, $scope, $http, toastr, serverAddress) {

    console.log($localStorage.header);

    $http.get(serverAddress + '/api/me', $localStorage.header).success(function(data) {
      $scope.account = data;
      $scope.accvalid = true;
    }).error(function () {
        toastr.error("Could not load your account info. Try refreshing the page!");
        $scope.accvalid = false;
    });
  }]);
