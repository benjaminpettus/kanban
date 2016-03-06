var myApp = angular.module('myApp');


//accesses database and returns and object to the
myApp.service('CardService', ['$http', function ($http) {

  this.addCard = function(data){
    return $http({
      method: 'POST',
      url: '/api/cards'
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
  }
    
  // this.update = function ($event) {
  
  // };
    
  
}]);

