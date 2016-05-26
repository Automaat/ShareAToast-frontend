'use strict';

angular
  .module('shareAtoastApp')
  .factory('eventService', ['$http', '$localStorage', 'serverAddress', function($http, $localStorage, serverAddress){
    return{
      createEvent: function(event){
        var timeInMili = new Date(event.date).getTime();
        var isPublic = event.scope == "public" ? "true" : false;

        var parsedEvent = {
          name: event.name,
          place: event.place,
          ownerName: '',
          date: timeInMili,
          publicEvent: isPublic,
          description: event.description
        };
        console.info(parsedEvent);
        return $http.post(serverAddress + '/api/events', parsedEvent, $localStorage.header);
      },

      joinEvent: function (event) {
        return $http.post(serverAddress + '/api/events/' + event.id + '/me', null, $localStorage.header);
      }
    };
  }]);

