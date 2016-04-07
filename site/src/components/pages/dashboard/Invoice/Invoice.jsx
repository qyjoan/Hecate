import React from 'react';
import { Link } from "react-router";
import {Panel, Well, Table} from 'react-bootstrap';

var Invoice = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Invoice" subtitle="Invoice Page subtitle"></pageheader>
      	<Panel>
      			<div className="invoice">
							<div className="row">
								<div className="col-md-6">
									<a href="{{ url('/') }}"><span className="text text-muted">&nbsp;Ani Theme</span></a>
								</div>
								<div className="col-md-6 text-right">
									<p className="text-dark">
										#1233219 / 01 Jan 2014  <br /><small className="text-light"> Lorem ipsum dolor sit amet </small>
									</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-md-4">
									<h4>Client:</h4>
									<Well>
										<address>
											<strong className="text-dark">Customer Company, Inc.</strong>
											<br />
											1 Infinite Loop
											<br />
											Cupertino, CA 95014
											<br />
											<abbr title="Phone">P:</abbr> (123) 456-7890
										</address>
										<address>
											<strong className="text-dark">E-mail:</strong>
											&nbsp;
											<a href="mailto:#">
												info@customer.com
											</a>
										</address>
									</Well>
								</div>
								<div className="col-md-4"></div>
								<div className="col-md-4 pull-right payment-detals-wrap">
									<h4>Payment Details:</h4>
									<ul className="list-unstyled invoice-details">
										<li>
											<strong>V.A.T Reg #:</strong> 233243444
										</li>
										<li>
											<strong>Account Name:</strong> Company Ltd
										</li>
										<li>
											<strong>SWIFT code:</strong> 1233F4343ABCDEW
										</li>
										<li>
											<strong>DATE:</strong> 01/01/2014
										</li>
										<li>
											<strong>DUE:</strong> 11/02/2014
										</li>
									</ul>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-12">
									<Table bordered striped>
										<thead>
											<tr>
												<th> # </th>
												<th> Item </th>
												<th className="hidden-480"> Description </th>
												<th className="hidden-480"> Quantity </th>
												<th className="hidden-480"> Unit Cost </th>
												<th> Total </th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td> 1 </td>
												<td> Lorem </td>
												<td className="hidden-480"> Drem psum dolor </td>
												<td className="hidden-480"> 12 </td>
												<td className="hidden-480"> $35 </td>
												<td> $1152 </td>
											</tr>
											<tr>
												<td> 2 </td>
												<td> Ipsum </td>
												<td className="hidden-480"> Consectetuer adipiscing elit </td>
												<td className="hidden-480"> 21 </td>
												<td className="hidden-480"> $469 </td>
												<td> $6159 </td>
											</tr>
											<tr>
												<td> 3 </td>
												<td> Dolor </td>
												<td className="hidden-480"> Olor sit amet adipiscing eli </td>
												<td className="hidden-480"> 24 </td>
												<td className="hidden-480"> $144 </td>
												<td> $8270 </td>
											</tr>
											<tr>
												<td> 4 </td>
												<td> Sit </td>
												<td className="hidden-480"> Laoreet dolore magna </td>
												<td className="hidden-480"> 194 </td>
												<td className="hidden-480"> $317 </td>
												<td> $966 </td>
											</tr>
										</tbody>
									</Table>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 invoice-block">
									<ul className="list-unstyled amounts text-small" style={ {textAlign: 'right'} }>
										<li>
											<strong>Sub-Total:</strong> $12,876
										</li>
										<li>
											<strong>Discount:</strong> 9.9%
										</li>
										<li>
											<strong>VAT:</strong> 22%
										</li>
										<li className="text-extra-large">
											<strong>Total:</strong> $11,400
										</li>
									</ul>
									<a className="btn btn-rounded btn-primary btn-o hidden-print pull-right">
										Submit Your Invoice <i className="fa fa-check"></i>
									</a> &nbsp;&nbsp;&nbsp;
									<a onclick="javascript:window.print();" className="btn btn-bordered btn-primary hidden-print pull-right">
										Print <i className="fa fa-print"></i>
									</a>
								</div>
							</div>
						</div>
				</Panel>
      </div>
      
    );
  }

});

export default Invoice;