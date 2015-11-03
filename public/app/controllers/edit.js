(function(module) {

	module.controller('EditController', EditController);

	EditController.$inject = ['dataService'];

	function EditController(dataService) {
		var vm = this;

		vm.newProfile = {};

		vm.genders = ['male', 'female', 'trans'];

		vm.years = createYearArray();

		vm.YearSelected = function() {
			vm.newProfile.birthDate = new Date(vm.newProfile.yearOfBirth, 0, 1);
		}

		vm.register = function() {
			console.log('submitted: ' + vm.newProfile.firstName, vm.newProfile.sex);

			dataService.registerProfile(vm.newProfile);
		}

		vm.message = 'Registration';

		vm.status = {
			opened: false
		}

		vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	vm.format = vm.formats[0];
	  
	  	vm.open = function($event) {
	    	vm.status.opened = true;
	    	console.log(vm.status.opened);
	    	console.log('selected data: ' + vm.newProfile.birthDate);
	  	};

	  	function createYearArray() {
	  		var years = [];

	  		for (var i = 1910; i <= 2015; i++) {
	  			years.push(i);
	  		}

	  		return years;
	  	}
	}
})(angular.module('app'));