var myApp = angular.module('myApp');

myApp.service('CardService', CardService);

function CardService() {
  var cards = this.cards = [
  {title: routes, priority: low, created_by: ben, assigned_to: me }
  ];
}

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
  if (index < 0 || index > cards.length) {
    return null;
  }
  return cards[index];
};