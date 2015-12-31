(function(module) {

	module.controller('EditProfileController', EditProfileController);

	EditProfileController.$inject = ['$scope', '$location', 'Upload', 'dataService', 'identityService', 'modalService']
	function EditProfileController($scope, $location, Upload, dataService, identityService, modalService) {

		var username,
			vm = this;
		
		vm.profile = {};
		vm.genderOptions = ['male', 'female', 'katoy'];
		vm.years = createYearArray();
  		vm.format = 'dd-MMMM-yyyy';
  		vm.initDate = undefined;
		
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
			username = identityService.getCurrentUser().username || '';
			dataService.getProfileByUsername(username).then(onSuccess, onFailure);

			function onSuccess(profile) {
				vm.profile = profile;

				vm.initDate = vm.profile.birthDate || new Date();
			}

			function onFailure() {
				console.log('boo.. error fetching profile');
			}
		}

		vm.open = function($event) {
	    	vm.status.opened = true;
	  	};

		vm.yearSelected = function(year) {
			var month,
				day;

			vm.editYearOfBirth = false;
			vm.profile.yearOfBirth = year;
			
			if (!!vm.profile.birthDate) {
				month = new Date(vm.profile.birthDate).getUTCMonth(),
				day = new Date(vm.profile.birthDate).getUTCDate();
				vm.profile.birthDate = new Date( year, month, day );
			} else {
				vm.initDate = new Date(year, 0, 1);
			}
			updateProfile(vm.profile);
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
			});
		}

		vm.setGender = function(gender) {
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

		function updateProfile(profileToUpdate) {
			dataService.updateProfile(profileToUpdate).then(
					function(profile) {
						vm.profile = profile;
						toastr.info('Profile saved!');
					}, 
					function() {
						toastr.info('Error saving profile!');
					});
		}

		function createYearArray() {
	  		var years = [];
	  		for (var i = 1940; i <= 2007; i++) {
	  			years.push(i);
	  		}
	  		return years;
	  	}
	}
})(angular.module('app'));