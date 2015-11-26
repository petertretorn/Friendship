(function(module) {
	'use strict';

	module.controller('CalenderController', CalenderController)


	function CalenderController($state, events) {
		var calenderVm = this;
		
		calenderVm.eventSources =  [ _.map(events, mapToCalenderEvent) ];


		//calenderVm.eventSources =  [makeEvents()];

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

		calenderVm.calendarConfig = {
            height: 550,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: dayClick,
            editable: true,
            eventClick: eventClick
             /*,
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
                end: moment(event.date).add(2, 'hour').toDate()
        	}
        }

        function eventClick(event) {
            console.log('clicked');
            $state.go('event', { eventId: event.id} );
        }

        function dayClick() {
            console.log('day clicked');
        }
	}

})(angular.module('app'));