(function(module) {


  module.factory('modalService', ModalService);
    
    ModalService.$inject = ['$uibModal', '$q'];
    function ModalService($modal, $q) {
      
      return {
        showToast: showToast,
        editField: editField,
        addToField: addToField,
        textAreaInput: textAreaInput
      };

      function textAreaInput(modalTitle) {
        var text,
          deferred = $q.defer();


        var modalInstance = $modal.open({
          templateUrl: '/app/views/modalInput.html',
          controllerAs: 'vm',
          controller: function($modalInstance) {
            var vm = this;
            vm.inputText = '';
            vm. title = modalTitle;
            console.log('modalTitle: ' + modalTitle);
            vm.ok = function() {

              text = vm.inputText;
              $modalInstance.close();

              console.log('text: ' + text);

              deferred.resolve(text);
            }
            vm.cancel = function() {
              $modalInstance.dismiss();
              $q.resolve();
            }
          }
        });
        return deferred.promise;
      }

      function addToField(profile, field) {

        console.log(profile[field]);

        var deferred = $q.defer();

        var modalInstance = $modal.open({
          templateUrl: '/app/views/addToField.html',
          resolve: {
            editProfile: function() {
              return angular.copy(profile);
            }
          },
          controllerAs: 'vm',
          controller: function($scope, $modalInstance, $q, editProfile) {
            var vm = this;
            
            vm.profile = editProfile;
            vm.field = field;

            vm.ok = function() {
              $modalInstance.close();

              vm.profile[field].push(vm.newItem);
              console.log('pushing: ' + vm.profile[field]);
              console.log(vm.profile);
              deferred.resolve(vm.profile);
            }
            vm.cancel = function() {
              $modalInstance.dismiss();

              $q.resolve();
            }
          }
        });
        return deferred.promise;
      }

      function editField(profile, field, isTextarea, options) {
        
        var deferred = $q.defer();

        var modalInstance = $modal.open({
          templateUrl: '/app/views/editField.html',
          resolve: {
            editProfile: function() {
              return angular.copy(profile);
            }
          },
          controllerAs: 'vm',
          controller: function($scope, $modalInstance, $q, editProfile) {
            var vm = this;
            
            vm.profile = editProfile;
            vm.field = field;
            vm.textarea = isTextarea || false;

            vm.ok = function() {
              $modalInstance.close();

              deferred.resolve(vm.profile);
            }
            vm.cancel = function() {
              $modalInstance.dismiss();

              $q.resolve(vm.profile);
            }
          }
        });
        return deferred.promise;
        /*
        modalInstance.result.then(onConfirm, onCancel);

*/
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

  })(angular.module('app'));