'use strict';

var app = angular.module('shareAtoastApp');

app.controller('userCtrl', ['$scope', 'userService', 'toastr', '$location', function ($scope, userService, toastr, $location) {
  $scope.user = {
    name: '',
    email: '',
    password: ''
  };

  $scope.createUser = function () {
    var user = $scope.user;
    userService
      .createUser(user)
      .then(function success() {
        toastr.success('Created');
        $location.url('/login');
      }, function error(response) {
        toastr.error(response.data.errDescr);
      });
  };
}]);

//password validation directive
app.directive('equals', function () {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function (scope, elem, attrs, ngModel) {
      // do nothing if no ng-model
      if (!ngModel) {
        return;
      }

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function () {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function () {
        validate();
      });

      var validate = function () {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
      };
    }
  };
});
