import React from 'react';
import { Link } from "react-router";
import {Panel, Table} from 'react-bootstrap';

var CurrentRoute = React.createClass({

	    getInitialState: function () {

        return {
            route: {}
        };

    },

  render: function() {
	  var route = this.props.user['route']
	  if (route == undefined) {
		  route = {};
		  route['days'] = [];
		  var start = '';
		  var end = '';
	  }
	  else {
	  	var address = route['address'];
		  var start_location = address['start_location'];
		  var start = start_location['formatted_address'];
		  var end_location = address['end_location'];
		  var end = end_location['formatted_address'];
		  var days = ''
		  var first = true
		  route['days'].forEach( function(s) {
			  if (first == true) {
				  days = s
				  first = false
			  }
			  else
			  {
				  days = days + ', ' + s
			  }
			} );

	  }

    return (

      <div>
      	<pageheader pagename="Table" subtitle="Bootstrap UI Elements"></pageheader>
				<div className="conter-wrapper">
					<div className="row">
						<div className="col-md-12">
							<Panel header={<span>Current Route <a href="/#/dashboard/route/">[Edit]</a></span>}
								bsStyle="primary"
							>
								<Table>
									<thead>
										<tr>
											<th>Start Address</th>
											<th>End Address</th>
											<th>Travel Days</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{start}</td>
											<td>{end}</td>
											<td>{days}</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
					</div>

				</div>
      </div>



    );
  }

});

export default CurrentRoute;