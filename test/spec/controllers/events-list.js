'use strict';

describe('Controller: EventsListCtrl', function () {

  // load the controller's module
  beforeEach(module('shareAtoastApp'));

  var EventsListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventsListCtrl = $controller('EventsListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventsListCtrl.awesomeThings.length).toBe(3);
  });
});
