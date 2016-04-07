import React from 'react';
import { Link } from "react-router";
import {Panel, Table} from 'react-bootstrap';

var Tables = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Table" subtitle="Bootstrap UI Elements"></pageheader>
				<div className="conter-wrapper">				
					<div className="row">
						<div className="col-md-6">
							<Panel header={<span>Regular Table</span>}
								bsStyle="primary"
							>
								<Table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
						<div className="col-md-6">
							<Panel header={<span>Bordered Table</span>}
								bsStyle="default"
							>
								<Table bordered>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<Panel header={<span>Striped Table</span>}
								bsStyle="info"
							>
								<Table striped>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
						<div className="col-md-6">
							<Panel header={<span>Hover Table</span>}
								bsStyle="success"
							>
								<Table hover>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<Panel header={<span>Condensed Table</span>}
								bsStyle="danger"
							>
								<Table condensed>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
						<div className="col-md-6">
							<Panel header={<span>Condensed, Bordered, Striped Table</span>}
								bsStyle="warning"
							>
								<Table condensed bordered striped>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr>
											<td>Andy</td>
											<td>andygmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr>
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
									</tbody>
								</Table>
							</Panel>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<Panel header={<span>Coloured Table</span>}
								bsStyle="default"
							>
								<Table bordered className="white">
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										<tr className="success">
											<td>John</td>
											<td>john@gmail.com</td>
											<td>London, UK</td>
										</tr>
										<tr className="info">
											<td>Andy</td>
											<td>andy@gmail.com</td>
											<td>Merseyside, UK</td>
										</tr>
										<tr className="warning">
											<td>Frank</td>
											<td>frank@gmail.com</td>
											<td>Southampton, UK</td>
										</tr>
										<tr className="danger">
											<td>Rickie</td>
											<td>rickie@gmail.com</td>
											<td>Burnley, UK</td>
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

export default Tables;