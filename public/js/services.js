var myApp = angular.module('myApp');


//accesses database and returns and object to the
myApp.service('CardService', ['$http', function ($http) {

  this.addCard = function(title, priority, created_by, assigned_to){
    var newCard = {
      title: title,
      priority: priority,
      created_by: created_by,
      assigned_to: assigned_to
    };  
    cards.push(newCard);
  };

  this.getCards = function () {
    return cards;
  };


  this.getCards = function () {
    return $http({
      method:'GET',
      url: '/api'
    });
    
  };

  this.saveCard = function (data) {
   
    console.log("saving", data);
  }; 

  this.removeCard = function (id) {
    return $http.delete('api/' + id);
  };
    
  
    
  
}]);

