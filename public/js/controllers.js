var myApp = angular.module('myApp');

myApp.controller('CardController', [
  '$scope',
  'CardService',

  function ($scope, CardService) {
    CardService.getCards()
      .then(function (response) {
        $scope.cards = response.data;
      });
  }
    
]);