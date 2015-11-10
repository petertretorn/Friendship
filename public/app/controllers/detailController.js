(function(module) {

	module.controller('DetailController', DetailController);

	DetailController.$inject = ['$routeParams', 'dataService', 'authService', 'modalService']
	function DetailController($routeParams, dataService, authService, modalService) {

		//var id = $routeParams.id || authService.currentUser.username,
		var id = (authService.currentUser.signedIn) ? authService.currentUser.username : '',
			vm = this;
			
		vm.profile = {};
		vm.genderOptions = ['male', 'female', 'katoy'];
		vm.years = createYearArray();
		vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		vm.format = vm.formats[0];
		
		vm.options = {
			TEXT_AREA: true,
			NOT_TEXT_AREA: false
		};

		vm.status = {
			opened: false
		};

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
			/*
			dataService.updateProfile(vm.profile).then(
					function(profile) {
						vm.profile = profile;
					}, 
					function() {
						console.log('boo.. error updating profile');
					});*/
		}

		vm.addToField = function(field) {
			//vm.profile[field] = vm.profile[field] || ['music'];
			//vm.profile[field] =  ['music', 'drugs', 'sex'];

			modalService.addToField(vm.profile, field).then(function(profile) {
				
				updateProfile(profile);
				/*
				dataService.updateProfile(profile).then(
					function(profile) {
						vm.profile = profile;
					}, 
					function() {
						console.log('boo.. error updating profile');
					});*/
			})
			//vm.profile[field].push(item);
		}

		vm.setGender = function(gender) {
			console.log('inside setGender: ' + gender);
			vm.profile.gender = gender;
			vm.editGender = false;

			updateProfile(vm.profile);
			/*
			dataService.updateProfile(vm.profile).then(
					function() {
						console.log('profile updated');
					}, 
					function() {
						console.log('boo.. error updating profile');
					});*/
		}


		vm.editField = function(field, isTextarea) {
			console.log('field attempted editted: ' + field);
			modalService.editField(vm.profile, field, isTextarea).then(function(profile) {
				updateProfile(profile);
				/*
				dataService.updateProfile(profile).then(
					function(profile) {
						vm.profile = profile;
					}, 
					function() {
						console.log('boo.. error updating profile');
					});*/
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
	}
})(angular.module('app'));