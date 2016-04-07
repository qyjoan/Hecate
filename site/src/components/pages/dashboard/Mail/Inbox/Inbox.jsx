import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Inbox = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Inbox" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">				
					<div className="inbox-container-wrap">
						<div className="inbox-container">
							<div className="col email-options ps-container">
								<div className="padding-15">
									<div className="butt-container">
										<a ui-sref="compose" className="btn btn-primary btn-block btn-rounded">Compose</a>
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
											<a ui-sref="">
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
						<div className="message-list-wrapper">
							<div className="searchbox">
								<span className="sebox">Inbox</span> (14 unread) <i className="fa fa-envelope-o"></i>
								<input type="text" className="form-control" id="exampleInputEmail1" placeholder="Search Inbox..." />
							</div>	
							<div className="wrap-list">
								<div className="messages-list">
									<ul>
										<li className="messages-item">
											<a href="#">
												<div className="leftist"><i className="fa fa-star"></i>	
													<label className="checkbox1" for="Option45">
														<input id="Option45" type="checkbox" className="" />
														<span></span>
													</label>
												</div>
												<span className="messages-item-subject"> Nicole Bell</span>
												<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;7th Jan</span>
												<span className="messages-item-content"><p>Hi Peter, Thanks for the e-mail. Lorem ipsum dolor sit amet,</p></span>
											</a>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option55">
													<input id="Option55" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> John Doe </span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;4th Jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks I am interested in Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item active-message">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option65">
													<input id="Option65" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> Jane Doe </span>
											<span className="date-class text-muted pull-right">&nbsp;1st Jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks In response Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star fa-starred"></i>	
												<label className="checkbox1" for="Option42">
													<input id="Option42" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject">  Peter Drury </span>
											<span className="date-class text-muted pull-right">&nbsp;29th Dec</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks, As we discussed Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option32">
													<input id="Option32" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> John Smith </span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;26th Dec</span>
											<span className="messages-item-content"><p>Dear Peter, Good Day! Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option92">
													<input id="Option92" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject">Congratulations </span>
											<span className="date-class text-muted pull-right">&nbsp;7th jan</span>
											<span className="messages-item-content"><p>Dear friend Peter Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option30">
													<input id="Option30" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> Sincere request to keep in touch.</span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;7th jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks,I was shocked Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<a href="#">
												<div className="leftist"><i className="fa fa-star"></i>	
													<label className="checkbox1" for="Option45">
														<input id="Option45" type="checkbox" className="" />
														<span></span>
													</label>
												</div>
												<span className="messages-item-subject"> Nicole Bell</span>
												<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;7th Jan</span>
												<span className="messages-item-content"><p>Hi Peter, Thanks for the e-mail. Lorem ipsum dolor sit amet,</p></span>
											</a>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option55">
													<input id="Option55" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> John Doe </span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;4th Jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks I am interested in Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option65">
													<input id="Option65" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> Jane Doe </span>
											<span className="date-class text-muted pull-right">&nbsp;1st Jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks In response Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star fa-starred"></i>	
												<label className="checkbox1" for="Option42">
													<input id="Option42" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject">  Peter Drury </span>
											<span className="date-class text-muted pull-right">&nbsp;29th Dec</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks, As we discussed Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option32">
													<input id="Option32" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> John Smith </span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;26th Dec</span>
											<span className="messages-item-content"><p>Dear Peter, Good Day! Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option92">
													<input id="Option92" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject">Congratulations </span>
											<span className="date-class text-muted pull-right">&nbsp;7th jan</span>
											<span className="messages-item-content"><p>Dear friend Peter Lorem ipsum dolor sit amet,</p></span>
										</li>
										<li className="messages-item">
											<div className="leftist"><i className="fa fa-star"></i>	
												<label className="checkbox1" for="Option30">
													<input id="Option30" type="checkbox" className="" />
													<span></span>
												</label>
											</div>		
											<span className="messages-item-subject"> Sincere request to keep in touch.</span>
											<span className="date-class text-muted pull-right"><i className="fa fa-paperclip"></i>&nbsp;7th jan</span>
											<span className="messages-item-content"><p>Dear Mr. Clarks,I was shocked Lorem ipsum dolor sit amet,</p></span>
										</li>
									</ul>
								</div>	
							</div>	
						</div>
						<div className="text-wrapper bg-white">
							<div className="wrap-message">	
								<div className="n0-scroll">
									<div className="message-topic">
										<i className="fa fa-star m-r-xs text-primary"></i> Development Files <span className="pull-right text-muted"><a href=""><i className="fa fa-reply"></i></a><a href=""><i className="fa fa-trash-o"></i></a></span>
									</div>
									<div className="message-sender">
										<img className="img-circle sender-img m-r-xs" src={require("../../../../../common/images/flat-avatar.png")} alt="" /> 
										<a href="javascript:void(0);">Kumar Sanket</a> to <a href="#">me</a> &nbsp;<i className="fa fa-caret-square-o-down"></i>
										<small className="pull-right m-t-sm">
											<i className="fa fa-paperclip"></i> &nbsp;<a href="javascript:;">(2)</a> &nbsp;&nbsp; Today 7:30 AM
										</small>
									</div>
								</div>
								<div className="message-content">
									<p>Hi Peter,</p>
									<p>Thanks for the e-mail. It is always nice to hear from people, especially from you, Scott.</p>
									<p>I have not got any reply, a positive or negative one, from Seibido yet.<br />Let's wait and hope that it will make a BOOK.</p>
									<p>Have you finished your paperwork for Kaken and writing academic articles?<br />If you have some free time in the near future, I want to meet you and explain to you our next project.</p> 
									<p>Why not drink out in Hiroshima if we are accepted?<br />We need to celebrate ourselves, don't we?<br />Let's have a small end-of-the-year party!</p> <p>Sincerely, K. Nakagawa</p>
								</div>
								<div className="messagefooter">
									<button type="button" className="btn btn-primary btn-rounded pull-right"><i className="fa fa-reply"></i> Reply</button>
								</div>
							</div>
						</div>
					</div>
				</div>
      </div>
      
    );
  }

});

export default Inbox;