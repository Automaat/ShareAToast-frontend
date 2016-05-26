'use strict';

/**
 * @ngdoc function
 * @name shareAtoastApp.controller:EventsListCtrl
 * @description
 * # EventsListCtrl
 * Controller of the shareAtoastApp
 */
angular.module('shareAtoastApp')
  .controller('EventsListCtrl', function (serverAddress, $http, $localStorage, $scope, eventService, toastr, $route) {

    $http.get(serverAddress + '/api/events', $localStorage.header)
      .then(function (response) {
        $scope.events = response.data;
        console.info(response.data);
      }, function () {
        console.info('Event not found')
      });

    var searchType = {ownerName: ''};
    $scope.searchType = searchType;
    $scope.user = $localStorage.userName;

    $scope.joinEvent = function (event) {
      eventService.joinEvent(event)
        .then(function success(response) {
          toastr.success('Joined');
          $route.reload();
        }, function error(response) {
          console.error(response);
        });
    };

  });
