angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(function ($routeProvider, CardsProvider) {
    CardsProvider.setEndpoint('/api');

  $routeProvider
    .when('/cards',  {
      templateUrl: 'index.html',
      controller: 'CardController'
    });

  })
    .run([
      '$rootScope',
      function ($rootScope) {
      //start application
      // $rootScope.version = APP_VERSION;
    }]);