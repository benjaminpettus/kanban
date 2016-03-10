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
      var newCard = {
        title:        event.target.title.value,
        priority:     event.target.priority.value,
        created_by:   event.target.created_by.value,
        assigned_to:  event.target.assigned_to.value
      };
      
      return CardService
       .addCard(newCard)
       .then(function () {
          // console.log(newCard);
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

    // $scope.update = function ($event) {

    // }

    // $scope.updateStatus = function (id, status) {
    //   card.Status = status;
    //   Cards.updateStatus(id, status)
    //     .then(function (response) {
    //       Cards.getCards()
    //       .then(function (response) {
    //         $scope.cards = res.data;
    //       });
    //     });
    // };


  
      
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
      $scope.updateStatus = function (id, status) {
        var data = {status: status};
        return CardService.updateCard(id, data)
          .then(function () {
            return CardService.getCards()
          .then(function (response) {
            return $scope.$parent.$parent.cards = response.data;
          });
        });
       
        
        
      };

      $scope.removeCard = function (id) {
        console.log(id);
        CardService.removeCard(id)
          .then(function () {
            CardService.getCards()
              .then(function (response) {
                console.log($scope.$parent);
                return $scope.$parent.$parent.cards = response.data; 
              });
          });


      };
    }
    ], 
    templateUrl: 'templates/status.html'
  };

});

