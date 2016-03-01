 var myApp = angular.module('myApp');

myApp.provider('Cards', 
  function () {
    var _endpoint = null;
    this.setEndpoint = function (endpoint) {
      _endpoint = endpoint;
    };   
    this.$get = function ($http) {
      return {
        get: function (){
          return $http({method: 'GET', url: _endpoint});

        }
      }; 
    };
  }
);