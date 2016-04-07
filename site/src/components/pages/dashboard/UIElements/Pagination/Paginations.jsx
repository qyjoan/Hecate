import React from 'react';
import { Link } from "react-router";
import {Panel, Breadcrumb, BreadcrumbItem, Pager, PageItem, Pagination} from 'react-bootstrap';

var Paginations = React.createClass({

	getInitialState: function() {
    return {
      activePage1: 1,
      activePage2: 4,
      activePage3: 3,
    };
  },

  render: function() {
    return (

      <div>
      	<pageheader pagename="Pagination" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">                
				    <div className="row">
				        <div className="col-md-6">
				        		<Panel header={<span>Breadcrumbs</span>}
				        			bsStyle="success"
				        		>
				        			<div className="clearfix">
	                        <ol className="breadcrumb no-bg no-m-t">
	                            <li className="active"><i className="fa fa-home"></i></li>
	                            <li><a href="javascript:void(0);">Library</a></li>
	                            <li><a href="javascript:void(0);">Home</a></li>
	                        </ol>
	                    </div>
	                    <div className="line-h-ex"></div>
	                    <div className="clearfix">
	                        <ol className="breadcrumb pull-right no-bg m-t">
	                            <li><a href="javascript:void(0);">Home</a></li>
	                            <li><a href="javascript:void(0);">Library</a></li>
	                            <li className="active"><i className="fa fa-home"></i></li>
	                        </ol>
	                    </div>
	                    <div className="line-h-ex"></div>
	                    <div className="clearfix">
	                        <ol className="breadcrumb m-t no-m-b">
	                            <li className="active"><i className="fa fa-home"></i></li>
	                            <li><a href="javascript:void(0);">Library</a></li>
	                            <li><a href="javascript:void(0);">Home</a></li>
	                        </ol>
	                    </div>
				        		</Panel>
				            
				            <Panel header={<span>Pager</span>}
				            	bsStyle="warning"
				            >
				            	<Pager>
										    <PageItem href="javascript:void(0);">Previous</PageItem>
										    <PageItem href="javascript:void(0);">Next</PageItem>
										  </Pager>
										  <Pager>
										    <PageItem previous href="javascrihrefpt:void(0);"><i className="fa fa-angle-double-left"></i> Previous</PageItem>
										    <PageItem next href="javascript:void(0);">Next <i className="fa fa-angle-double-right"></i></PageItem>
										  </Pager>
				            </Panel>
				        </div>

				        <div className="col-md-6">
				        		<Panel header={<span>Pagination</span>}
				        			bsStyle="info"
				        		>
				        			<div>
					        			<Pagination
									        prev
									        next
									        first
									        last
									        activePage={this.state.activePage1}
									        items={20}
									        maxButtons={7}
									        bsSize="small"
									        onSelect={this.handleSelect1} />
									    </div>
								      <div className="text-center">
									      <Pagination
									        prev
									        next
									        first
									        last
									        activePage={this.state.activePage2}
									        items={20}
									        maxButtons={7}
									        bsSize="small" 
									        onSelect={this.handleSelect2} />
								      </div>
								      <div className="pull-right">
									      <Pagination
									        prev
									        next
									        first
									        last
									        activePage={this.state.activePage3}
									        items={20}
									        maxButtons={7}
									        bsSize="small" 
									        onSelect={this.handleSelect3} />
									    </div>
				        		</Panel>
				            
				            <Panel header={<span>Pagination Sizes</span>}
				            	bsStyle="danger"
				            >
				            	<Pagination
									        prev
									        next
									        first
									        last
									        items={20}
									        maxButtons={5}
									        bsSize="large" /><br />
									    <Pagination
									        prev
									        next
									        first
									        last
									        items={20}
									        maxButtons={5}
									        bsSize="medium" /><br />
									    <Pagination
									        prev
									        next
									        first
									        last
									        items={20}
									        maxButtons={5}
									        bsSize="small" />
				            </Panel>
				        </div>
				    </div>
				</div>
      </div>
      
    );
  },

  handleSelect1: function(event, selectedEvent) {
    this.setState({
      activePage1: selectedEvent.eventKey
    });
  },

  handleSelect2: function(event, selectedEvent) {
    this.setState({
      activePage2: selectedEvent.eventKey
    });
  },

  handleSelect3: function(event, selectedEvent) {
    this.setState({
      activePage3: selectedEvent.eventKey
    });
  },

});

export default Paginations;