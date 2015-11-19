(function(module) {
	'use strict';

	module.directive('profilePart', function() {
		return {
			restrict: 'E',
			scope: {
				profile: '=',
				field: '@',
				text: '@'
			},
			replace: true,
			template: '<div><h3><em>{{ text }}</em></h3>' + 
						'<p ng-show="!!profile[field]" class="profile-text">{{ profile[field] }}</p>'+
						'<p ng-hide="profile[field]" class="profile-text">No data specified yet</p>'+
					    '</div>'
		}
	});


})(angular.module('app'));