var myApp = angular.module('myApp');


myApp.controller('CardController', [
  '$scope',
  'CardService',
  function ($scope, CardService) {
    $scope.cards = [];
    $scope.CardService = CardService;
    CardService.getCards()
      .then(function (response) {
        $scope.cards = response.data;
      });

    $scope.addCard = function (event)  {
      event.preventDefault();
      console.log(event.target.title.value);
      var newCard = {
        title:        event.target.title.value,
        priority:     event.target.priority.value,
        created_by:   event.target.created_by.value,
        assigned_to:  event.target.assigned_to.value,
      };
      
      return CardService
       .addCard(newCard)
       .then(function () {
          return CardService.getCards();
        })  
       .then(function (response){
          console.log(response.data);
          $scope.cards = response.data;
        })
       .catch(function (err) {
          console.log(err);
       });
    }; 


  
    
      
  }

    
])
.directive('status', function() {
  return {
    restrict: "E",
    scope: {
      data: "=card",
      getCards: "="
    },
    controller:  [
    '$scope',
    'CardService',
    function ($scope, CardService) {
      $scope.update = function ($event) {
        $event.preventDefault();
        var updatedCard = {
          id: $scope.data.id,
          newStatus: $event.target.newStatus.value
        };
        console.log(id);
        return $http.post('/api/', updatedCard);
      };

      $scope.removeCard = function (id) {
        console.log(id);
        CardService.removeCard(id)
          .then(function () {
            CardService.getCards()
              .then(function (data) {
                console.log(data);
                return $scope.$parent.cards = response.data; 
              });
          });


      };
    }
    ], 
    templateUrl: 'templates/status.html'
  };

});

