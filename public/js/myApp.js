angular.module('myApp', []);

var myApp = angular.module('myApp');

myApp
  .config(function () {

  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'public/index.html'
  //   });
  })
    .run([
      '$rootScope',
      'APP_Version',
      function ($rootScope, APP_VERSION) {
      //start application
      $rootScope.version = APP_VERSION;
    }]);