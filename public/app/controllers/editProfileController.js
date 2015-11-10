(function(module) {

	module.controller('EditProfileController', EditProfileController);

	EditProfileController.$inject = ['$routeParams', 'dataService', 'authService', 'modalService']
	function EditProfileController($routeParams, dataService, authService, modalService) {

		//var id = $routeParams.id || authService.currentUser.username,
		var id = (authService.currentUser.signedIn) ? authService.currentUser.username : '',
			vm = this;
			
		vm.profile = {};
		vm.genderOptions = ['male', 'female', 'katoy'];
		vm.years = createYearArray();
  		vm.format = 'dd-MMMM-yyyy';
		
		vm.options = {
			TEXT_AREA: true,
			NOT_TEXT_AREA: false
		};

		vm.status = {
			opened: false
		};

		init();

		function init() {
			console.log('DetailController, id: %s', id);

			dataService.getProfileByUsername(id).then(onSuccess, onFailure);

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