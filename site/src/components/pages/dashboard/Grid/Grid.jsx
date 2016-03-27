import React from 'react';
import { Link } from "react-router";
import {Panel} from 'react-bootstrap';

var Grid = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Grid" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">				

					<div className="row">
						<div className="col-sm-12">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Twelve</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Six</h4></div>
							</Panel>
						</div>

						<div className="col-sm-6">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Six</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-4">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Four</h4></div>
							</Panel>
						</div>
						<div className="col-sm-4">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Four</h4></div>
							</Panel>
						</div>
						<div className="col-sm-4">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Four</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-3">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Three</h4></div>
							</Panel>
						</div>
						<div className="col-sm-3">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Three</h4></div>
							</Panel>
						</div>
						<div className="col-sm-3">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Three</h4></div>
							</Panel>
						</div>
						<div className="col-sm-3">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Three</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-5">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Five</h4></div>
							</Panel>
						</div>
						<div className="col-sm-7">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Seven</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-4">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Four</h4></div>
							</Panel>
						</div>
						<div className="col-sm-8">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Eight</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-3">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Three</h4></div>
							</Panel>
						</div>
						<div className="col-sm-9">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Nine</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-2">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Two</h4></div>
							</Panel>
						</div>
						<div className="col-sm-10">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Ten</h4></div>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-1">
							<Panel bsStyle="default">
								<div className="text-center"><h4>One</h4></div>
							</Panel>
						</div>
						<div className="col-sm-11">
							<Panel bsStyle="default">
								<div className="text-center"><h4>Eleven</h4></div>
							</Panel>
						</div>
					</div>

				</div>
      </div>
      
    );
  }

});

export default Grid;