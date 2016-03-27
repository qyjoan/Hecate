import React from 'react';
import { Link } from "react-router";
import {Panel} from 'react-bootstrap';

var Profile = React.createClass({

  render: function() {
    return (

      <div>
      	<div className="conter-wrapper">
					<div className="cover-wrapper">
						<div className="cover-photo" style={ {'background-image': 'images/profile-cover.jpg '} }>
							<div className="name-desg">
								<h3>
									Kumar Sanket
									<small>CEO and Founder @Sahusoft</small>
								</h3>
							</div>
						</div>
						<div className="profile-photo-warp">
							<img className="profile-photo img-responsive img-circle" src={require("../../../../common/images/flat.png")} alt="" />
						</div>
						<div className="foobar">
							<a href=""><i className="fa fa-heart text-danger"></i> 443</a> &nbsp;&nbsp;&nbsp; <i className="fa fa-users"></i> 443
							<span className="probutton"> <button type="button" className="btn btn-primary  btn-bordered   ">
								Follow</button> 
							</span>
							<span className="links pull-right"><a href=""><i className="fa fa-twitter"></i></a> <a href=""><i className="fa fa-facebook"></i></a> <a href=""><i className="fa fa-google-plus"></i></a> <a href=""><i className="fa fa-github"></i></a></span>
						</div>
					</div>
					<div className="conter-wrapper">
						<div>
							<div className="profile-body row" id="profile-items">
								<div className="col-sm-6">
									<div className="profile-comment prophoto">	
										<Panel bsStyle="default"
											footer={ <span><div className="submit-footer"><a href=""><i className="fa fa-picture-o"></i></a><a href=""><i className="fa fa-calendar"></i></a><a href=""><i className="fa fa-video-camera"></i></a></div>
													<span className="probutton">
														<button type="button" className="btn btn-primary pull-right btn-rounded">Send Message</button> 
													</span>
												</span>
											}
										>
											<textarea name="" id="" cols="54" rows="4"></textarea>
										</Panel>
									</div>
									<div className="prophoto">
										<Panel bsStyle="default"
											header={<h3 className="panel-title"><img className="panel-photo img-responsive img-circle" src={require("../../../../common/images/flat-avatar.png")} alt="" />
													Kumar Sanket <br /><span className="text-muted">Posted on 3rd March 2014</span> 
												</h3>
											}
										>
												<img className="img-responsive" src={require("../../../../common/images/colorful4.jpg")} alt="" height="200" />
												<div className="comment-links clearfix">
													<a href=""><i className="fa fa-share-alt"></i>22</a><a href=""><i className="fa fa-comments-o"></i>106</a><a href=""><i className="fa fa-heart text-danger"></i>862</a>
												</div>
										</Panel>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="prophoto">
										<div className="comment-link">
											<Panel bsStyle="default"
												header={<h3 className="panel-title"><img className="panel-photo img-responsive img-circle" src={require("../../../../common/images/flat-avatar.png")} alt="" />
														Kumar Sanket <br /><span className="text-muted">Posted on 3rd March 2014</span> 
													</h3>
												}
											>
												<div className="lorem">
													Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur harum aliquid tempore molestias nemo modi quas repellat. Accusantium praesentium, cupiditate tempore culpa voluptate laboriosam itaque error iste accusamus reprehenderit illum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est saepe voluptas, eligendi necessitatibus adipisci soluta, amet magnam, rerum, iure minima fuga praesentium nobis veniam quisquam illum repellat beatae. Consectetur, asperiores.
												</div>
												<div className="comment-links clearfix">
													<a href=""><i className="fa fa-share-alt"></i>22</a><a href=""><i className="fa fa-comments-o"></i>106</a><a href=""><i className="fa fa-heart text-danger"></i>862</a>
												</div>
												<div className="comments-here media">
													<a className="pull-left" href="">
														<img className="media-object img-circle img-responsive" src={require("../../../../common/images/flat-avatar.png")} alt="Media Object" />
													</a>
													<div className="media-body">
														<a href=""><h5 className="media-heading">Kumar Pratik</h5></a>
														<span className="timely pull-right text-muted"> 3 hours ago</span>
														Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic repudiandae exercitationem provident nihil consectetur.
														<div className="comment-like"><a href=""><i className="fa fa-comments-o"></i>106</a><a href=""><i className="fa fa-heart text-danger"></i>862</a></div>
													</div>
												</div>
											</Panel>
										</div>

									</div>
								</div>
								<div className=" col-sm-6 ">
									<div className="prophoto">
										<Panel bsStyle="default"
											header={<h3 className="panel-title"><img className="panel-photo img-responsive img-circle" src={require("../../../../common/images/flat-avatar.png")} alt="" />
													Kumar Sanket <br /><span className="text-muted">Posted on 3rd March 2014</span> 
												</h3>
											}
										>
											<img className="img-responsive" src={require("../../../../common/images/colorful4.jpg")} alt="" height="200" />
											<div className="comment-links clearfix">
												<a href=""><i className="fa fa-share-alt"></i>22</a><a href=""><i className="fa fa-comments-o"></i>106</a><a href=""><i className="fa fa-heart text-danger"></i>862</a>
											</div>
										</Panel>
									</div>
								</div>
							</div>		
						</div>
					</div>
				</div>

      </div>
      
    );
  }

});

export default Profile;