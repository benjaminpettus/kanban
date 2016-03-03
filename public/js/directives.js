// var myApp = angular.module('myApp');



// app.directive('draggable', function () {
//   return function(scope, element) {

//     var crd = card[0];

//     crd.draggable = true;

//     crd.addEventListener(
//       'dragstart',
//       function(e) {
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('Text', this.id);
//         this.classList.add('drag');
//         return false;
//       },
//       false
//     );

//     crd.addEventListener(
//       'dragend', 
//       function(e) {
//         this.classList.remove('drag');
//         return false;
//       },
//       false
//       );
//   };
// });

// app.directive('droppable', function() {
//   return {
//     scope: {
//       drop: '&', 
//       column: '=' //bi-directional scope
//     }, 
//     link: function(scope, element) {
//       var crd = card[0];

//     crd.addEventListener(
//       'dragover', 
//       function(e) {
//         e.dataTransfer.dropEffect= 'move';
//         //allows drop
//         if(e.preventDefault) e.preventDefault();
//         this.classList.add('over');
//         return false;
//       },
//       false
//     );

//     crd.addEventListener(
//       'dragenter', 
//       function(e) {
//         this.classlist.add('over');
//         return false;
//       },
//       false
//     );
//     crd.addEventListener(
//       'dragleave', 
//       function(e) {
//         this.classlist.remove('over');
//         return false;
//       },
//       false
//     );

//     crd.addEventListener(
//       'drop',
//       function(e) {
//         //stops browsers from redirecting.
//         if (e.stopPropagation) e.stopPropagation();

//         this.classList.remove('over');
        
//         var cardId = this.id;
//         var item = document.getElementById(e.dataTransfer.getData('Text'));
//         this.appendChild(item);

//         //call the drop passed drop function 
//         scope.$apply(function(scope) {
//           var fn = scope.drop();
//           if ('undefined' !== typeof fn) {
//             fn(item.id, cardId);
//           }
//         });

//         return false;
//       },
//       false
//     );
//     }
//   };
// });