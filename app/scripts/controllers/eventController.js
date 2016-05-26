'use strict';

var app = angular.module('shareAtoastApp');

app.controller('eventCtrl',['$scope', 'eventService', 'toastr', '$location', function($scope, eventService, toastr, $location){
  $scope.event = {
    name: '',
    place: '',
    date: '',
    scope: '',
    description: ''
  };
  $scope.prompt='';

  $scope.setPrompt = function() {
    $scope.prompt="Valid date format: DD/MM/YYYY";
  }
  $scope.unsetPrompt = function() {
    $scope.prompt="";
  }

  $scope.createEvent = function(){
    var event = $scope.event;
    eventService
      .createEvent(event)
      .then(function success(response) {
        toastr.success('Created');
        $location.url('/event/' + response.data.id);
      }, function error(response) {
        console.error(response);
      });
  };
}]);
