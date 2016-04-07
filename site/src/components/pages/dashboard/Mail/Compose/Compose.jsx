import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Compose = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Compose" subtitle="Bootstrap UI Elements"></pageheader>
				<div className="conter-wrapper">				
					<div className="inbox-container-wrap">
						<div className="inbox-container">
							<div className="col email-options ps-container">
								<div className="padding-15">
									<div className="butt-container">
									<a ui-sref="compose"><button className="btn btn-primary btn-block btn-rounded">
											Compose 
										</button></a>
									</div>
									<ul className="main-options">

										<li className="activeli">
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Inbox</span>
												<span className="badge pull-right">10</span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Junk Mail</span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Drafts</span>
												<span className="badge pull-right">16</span>
											</a>	
										</li>

										<li>
											<a href="">
												<span className="title"> &nbsp; Sent</span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Trash</span>
											</a>	
										</li>

										<hr className="poor" />
										<h5>LABELS</h5>
										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Clients <i className="fa fa-stop pull-right faorange"></i></span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Social <i className="fa fa-stop pull-right fayellow"></i></span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Family <i className="fa fa-stop pull-right facyan"></i></span>
											</a>	
										</li>

										<li>
										<a ui-sref="inbox">
												<span className="title"> &nbsp; Friends <i className="fa fa-stop pull-right fapurple"></i></span>
											</a>	
										</li>

									</ul>
								</div>
							</div>
						</div>
						<div className="compose-container">
							<div className="wrap-compose">
								<div className="mail-header">
									<h4>New Email</h4>
								</div>
								<div className="receipient">
									<strong className="to">TO </strong> <span className="label label-primary">john@doe.com</span>
								</div>
								<div className="subject">
									<strong className="strong-header">SUBJECT</strong> <strong className="subjetc">[LOGO] Envelope</strong>
								</div>
								<text-angular ng-model="htmlVariable"></text-angular>

								<div className="send-footer">
									<button type="button" className="btn btn-primary btn-rounded    ">
									Send</button> 

									&nbsp;&nbsp;&nbsp;<a href=""><i className="fa fa-paperclip"></i></a>
									<a href=""><i className="fa fa-trash-o pull-right"></i></a>
								</div>
							</div>
						</div>
					</div>	
				</div>
	
      </div>
      
    );
  }

});

export default Compose;