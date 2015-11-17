(function(module) {

	module.controller('EditProfileController', EditProfileController);

	EditProfileController.$inject = ['$scope','$routeParams', '$location', 'Upload', 'dataService', 'identityService', 'modalService']
	function EditProfileController($scope, $routeParams, $location, Upload, dataService, identityService, modalService) {

		//var id = $routeParams.id || authService.currentUser.username,
		var username,
			vm = this;
		
		vm.profile = {};
		vm.genderOptions = ['male', 'female', 'katoy'];
		vm.years = createYearArray();
  		vm.format = 'dd-MMMM-yyyy';
		
  		vm.files = [];

		vm.options = {
			TEXT_AREA: true,
			NOT_TEXT_AREA: false
		};

		vm.status = {
			opened: false
		};

		init();

		function init() {
			if (!identityService.isAuthenticated()) {
				console.log('not authenticated');
				$location.path('/');
			}
			username = identityService.currentUser.username || '';

			dataService.getProfileByUsername(username).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('success fetching profile : %s', data[0].username);
				vm.profile = data[0];
				console.log(vm.profile.username);
			}

			function onFailure() {
				console.log('boo.. error fetching profile');
			}
		}

		vm.open = function($event) {
	    	vm.status.opened = true;
	  	};

		vm.YearSelected = function() {
			vm.profile.birthDate = new Date(vm.profile.yearOfBirth, 0, 1);
		}

		vm.dateChanged = function() {
			updateProfile(vm.profile);
		}

		vm.deleteInterest = function(index) {
			vm.profile.interests.splice(index, 1);
			updateProfile(vm.profile);
		}

		vm.addToField = function(field) {
			modalService.addToField(vm.profile, field).then(function(profile) {
				
				updateProfile(profile);
			})
		}

		vm.setGender = function(gender) {
			console.log('inside setGender: ' + gender);
			vm.profile.gender = gender;
			vm.editGender = false;

			updateProfile(vm.profile);
		}


		vm.editField = function(field, isTextarea) {
			console.log('field attempted editted: ' + field);
			modalService.editField(vm.profile, field, isTextarea).then(function(profile) {
				updateProfile(profile);
			})
		}

		vm.uploadPhoto = function (files) {
            Upload.upload({
            	url: '/api/profiles/photo', 
            	method: 'POST',
            	fields: { username: vm.profile.username }, 
            	file: files
            }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                vm.profile.imageUrl = vm.picFile.name;
                vm.picFile = undefined;
            });
        }

        vm.uploadPic = function (file) {
		    if (file != null) {
		      vm.uploadPhoto(file)
		    }
		  };

   	  vm.upload = function(file, resumable) {
		    $scope.errorMsg = null;
		    if ($scope.howToSend === 1) {
		      uploadUsingUpload(file, resumable);
		    } else if ($scope.howToSend == 2) {
		      uploadUsing$http(file);
		    } else {
		      uploadS3(file);
		    }
		  };

		function updateProfile(profileToUpdate) {
			dataService.updateProfile(profileToUpdate).then(
					function(profile) {
						vm.profile = profile;
					}, 
					function() {
						console.log('boo.. error updating profile');
					});
		}

		function createYearArray() {
	  		var years = [];

	  		for (var i = 1910; i <= 2015; i++) {
	  			years.push(i);
	  		}

	  		return years;
	  	}
	}
})(angular.module('app'));