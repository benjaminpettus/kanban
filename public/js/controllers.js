var myApp = angular.module('myApp');

myApp.controller('CardController', [
  '$scope',
  'CardService',
  function ($scope, CardService) {
    $scope.card = "card1";
    $scope.CardService = CardService;
  }
    
]);