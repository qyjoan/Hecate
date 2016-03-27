import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import fullcalendar from 'fullcalendar';
import $ from 'jquery';

var Calendar = React.createClass({
  
  componentDidMount: function() {
    $(this.refs.calendar).fullCalendar({
        // put your options and callbacks here
    })

  },

  render: function() {
    return (

      <div>

		    <pageheader pagename="Calendar" subtitle="Full Calendar widget"></pageheader>
				<div className="conter-wrapper">
					<div className="panel panel-default">
						<div className="panel-body" ng-controller="calendarCtrl">
							<div ref='calendar'></div>
						</div>
					</div>
				</div>

      </div>
      
    );
  }

});

export default Calendar;