(function(module) {
	'use strict';

	module.controller('CalenderController', CalenderController)

	function CalenderController(events) {
		var vm = this;
		
		vm.eventSources =  [ _.map(events, mapToCalenderEvent) ];

		//vm.eventSources =  [makeEvents()];

		function makeEvents() {
			return [
				{
					id: 1,
	                start: "2015-11-17T10:00:00",
	                title: "test",
	                allDay: false,
	                durationEditable: false,
	                end: "2015-11-17T11:00:00",
				}
			]
		}

		vm.calendarConfig = {
            height: 550,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            } /*,
            defaultView: 'agendaDay',
            firstHour: 8,
            dayClick: dayClick,
            editable: true,
            eventClick: eventClick,
            eventDrop: eventDrop*/
        };

        function mapToCalenderEvent(event) {
        	return {
        		id: event._id,
                start: event.date || new Date(),
                title: event.title,
                allDay: false,
                durationEditable: false,
                end: moment(event.date).add(1, 'hour').toDate()
        	}
        }
	}

})(angular.module('app'));