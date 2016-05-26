'use strict';

angular
  .module('shareAtoastApp')
  .factory('userService', ['$http', 'serverAddress', function ($http, serverAddress) {
    return {
      createUser: function (user) {
        var parsedUser = {
          name: user.name,
          email: user.email,
          password: user.password
        };
        // console.info(parsedUser);
        console.info()
        return $http({
          url: serverAddress + '/api/users',
          method: 'POST',
          data: parsedUser,
          headers: {'Content-Type': 'application/json'}
        });
      }
    };
  }]);
