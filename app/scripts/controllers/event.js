'use strict';

/**
 * @ngdoc function
 * @name shareAtoastApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the shareAtoastApp
 */
angular.module('shareAtoastApp')
  .controller('SingleEventCtrl',[ '$localStorage', '$scope', '$http', '$routeParams', 'serverAddress', 'eventService',
    function ($localStorage, $scope, $http, $routeParams, serverAddress, eventService) {

    $http.get(serverAddress + '/api/events/' + $routeParams.id, $localStorage.header)
      .then(function (response) {
              $scope.event = response.data;
          }, function () {
            console.info('Event not found')
          });

      $scope.coords = { latitude: 50.067020, longitude: 19.914118 }
      $scope.map = { center: $scope.coords, zoom: 15 ,
        events: {
          tilesloaded: function (map) {
            $scope.$apply(function () {
              $scope.mapInstance = map;
            });
          }
        }
      };

      $scope.marker = {
        id: 0,
        coords: {
          latitude: 50.067020,
          longitude: 19.914118
        }
      };

      $scope.user = $localStorage.userName;

      $scope.joinEvent = function () {
        eventService.joinEvent($scope.event.id)
          .then(function success(response) {
            toastr.success('Joined');
            $route.reload();
          }, function error(response) {
            console.error(response);
          });
      };
  }]);
