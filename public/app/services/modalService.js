(function(module) {


  module.factory('modalService', ModalService);
    
    ModalService.$inject = ['$uibModal'];
    function ModalService($modal) {
      
      return {
        showToast: showToast,
        editField:editField
      };

      function editField(profile, field) {
        
        var modalInstance = $modal.open({
          templateUrl: '/app/views/editField.html',
          resolve: {
            newRecord: function() {
              //return vm.newRecord;
            }
          },
          controller: function($scope, $modalInstance) {
            
            $scope.profile = profile;
            $scope.field = field;
            $scope.ok = function() {
              //console.log($scope.newRecord);
              console.log('field edit :' + $scope.profile[$scope.field]);
              //vm.records.push($scope.newRecord);
              $modalInstance.close();
            }
            $scope.cancel = function() {
              $modalInstance.dismiss();
            }
          }
        });

        modalInstance.result.then(onConfirm, onCancel);

        function onConfirm() {
          console.log('inside onconfirm: ' + '');
        }

        function onCancel() {
          console.log('deletion cancelled!');
        }
      }
      
      function showToast(message, heading) {
        var modalInstance = $modal.open({
            templateUrl: '/app/views/modal.html',
            controller: function($scope, $uibModalInstance) {
              $scope.message = message;
              $scope.heading = heading || Notification;
              $scope.ok = function() {
                $uibModalInstance.close();
              }
            }
          });
      }
    }
    ModalService.$inject = ['$modal'];

  })(angular.module('app'));