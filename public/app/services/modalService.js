(function(module) {


  module.factory('modalService', ModalService);
    
    ModalService.$inject = ['$modal'];
    function ModalService($modal) {
      
      return {
        showToast: showToast
      };
      
      function showToast(message, heading) {
        var modalInstance = $modal.open({
            templateUrl: '/app/views/modal.html',
            controller: function($scope, $modalInstance) {
              $scope.message = message;
              $scope.heading = heading || Notification;
              $scope.ok = function() {
                $modalInstance.close();
              }
            }
          });
      }
    }
    ModalService.$inject = ['$modal'];

  })(angular.module('app'));