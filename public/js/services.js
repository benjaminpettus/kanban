var myApp = angular.module('myApp');


//accesses database and returns and object to the
myApp.service('CardService', ['$http', function ($http) {

  function CardService ($http) {
    var cards = this.cards = [];
  }

  this.addCard = function(data){
    return $http({
      method: 'POST',
      url: '/api/cards',
      data: data
  });
};


  this.getCards = function () {
    return $http({
      method:'GET',
      url: '/api/cards'
    });
    
  };

  this.removeCard = function (id) {
    return $http({
      method:'POST',
      url: '/api/cards/' + id +'/delete'
    });
  };
    
  this.updateCard = function (id, data) { 
    return $http({
      method: 'PUT',
      url: '/api/cards/' + id,
      data: data

    });
  };
    
  
}]);

myApp.service('UserService', ['$http', function ($http) {
  function UserService ($http) {
    var users = this.users = [];
  }

  this.addUser = function (data) {
    console.log()
    return $http({
      method: 'POST',
      url: 'api/users',
      data: data
    });
  };
}]);

