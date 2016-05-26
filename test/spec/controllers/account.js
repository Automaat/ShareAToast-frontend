'use strict';

describe('Controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('shareAtoastApp'));

  var AccountCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    AccountCtrl = $controller('AccountCtrl', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('should get account data in json format', function () {
    httpBackend
      .when('GET', 'data/accjson.json')
      .respond(200, {
        "name": "Bronek",
        "email": "bronek@po.pl",
        "imgPath": "Icon-user.png"
      });

    httpBackend.flush();
    expect(scope.account).toEqual({
      "name": "Bronek",
      "email": "bronek@po.pl",
      "imgPath": "Icon-user.png"
    });
    expect(scope.valid).toBe(true);
  });
});
