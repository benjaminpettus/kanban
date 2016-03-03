var myApp = angular.module('myApp');


myApp.controller('CardController', [
  '$scope',
  'CardService',
  function ($scope, CardService) {
    $scope.CardService = CardService;
    CardService.getCards()
      .then(function (response) {
        $scope.cards = response.data;
      });
    $scope.saveCard = function (event)  {
      event.preventDefault();
      console.log(event.target.priority.value);
      CardService.saveCard;
    };

   console.log($scope.saveCard);
    
    $scope.removeCard = function (event, id) {
      event.preventDefault();
      CardService.removeCard(id)
        .then(function () {
          CardService.getCards()
            .then(function (response) {
              $scope.cards = response.data;
            });
        });


    };
      
    console.log($scope);
  }
    
]);

// myApp.controller('dragAndDrop', 
//   function ($scope) {
//     $scope.models = {
//       selected: null, 
//       column:{"left": [], "middle": [], "right": []}
//     };
//     $scope.$watch('models', function(model) {
//       $scope.modelAsJson = angular.toJson(model, true);
//     }, 
//     true);
//   });