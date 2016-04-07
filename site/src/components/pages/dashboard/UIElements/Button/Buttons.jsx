import React from 'react';
import { Link } from "react-router";
import {Panel, Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

var Buttons = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Button" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">                
				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Buttons</span>}
				        			bsStyle="primary"
				        		>
				        			<ButtonToolbar>
					        			<Button bsStyle="default" className="btn-rounded">Default Button</Button>
					        			<Button bsStyle="primary" className="btn-rounded">Primary Button</Button>
					        			<Button bsStyle="success" className="btn-rounded">Success Button</Button>
					        			<Button bsStyle="info" className="btn-rounded">Info Button</Button>
					        			<Button bsStyle="warning" className="btn-rounded">Warning Button</Button>
					        			<Button bsStyle="danger" className="btn-rounded">Danger Button</Button>
				        			</ButtonToolbar>
				        			<hr />
				        			<ButtonToolbar>
					        			<Button bsStyle="default">Default Button</Button>
					        			<Button bsStyle="primary">Primary Button</Button>
					        			<Button bsStyle="success">Success Button</Button>
					        			<Button bsStyle="info">Info Button</Button>
					        			<Button bsStyle="warning">Warning Button</Button>
					        			<Button bsStyle="danger">Danger Button</Button>
					        		</ButtonToolbar>
				        			<hr />
				        			<ButtonToolbar>
					        			<Button bsStyle="info" className="btn-rounded btn-outline">Info Button</Button>
					        			<Button bsStyle="primary" className="btn-rounded btn-outline">Primary Button</Button>
					        			<Button bsStyle="success" className="btn-rounded btn-outline">Success Button</Button>
					        			<Button bsStyle="warning" className="btn-rounded btn-outline">Warning Button</Button>
					        			<Button bsStyle="danger" className="btn-rounded btn-outline">Danger Button</Button>
					        		</ButtonToolbar>
				        		</Panel>
				        </div>
				    </div>

				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Loading Buttons</span>}
				        			bsStyle="primary"
				        		>
				        			<ButtonToolbar>
				        				<Button bsStyle="primary" className="progress-button content" data-style="fill" data-horizontal>SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        			</ButtonToolbar>
				        			<hr />
				        			<ButtonToolbar>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        			</ButtonToolbar>
				        			<hr />
				        			<ButtonToolbar>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        				<Button bsStyle="primary" className="progress-button">SUBMIT</Button>
				        			</ButtonToolbar>
				        		</Panel>
				        </div>
				    </div>

				    <div className="row">
				        <div className="col-md-4">
				    				<Panel header={<span>Button Sizes</span>}
				    					bsStyle="primary"
				    				>
				    					<p>
				    					<Button bsStyle="danger" bsSize="xsmall" className="btn-rounded">Extra Small Button</Button>
				    					</p>
				    					<p>
				    					<Button bsStyle="success" bsSize="small" className="btn-rounded">Small Button</Button>
				    					</p>
				    					<p>
				    					<Button bsStyle="info" bsSize="large" className="btn-rounded">Large Button</Button>
				    					</p>
				    					<p>
				    					<Button bsStyle="warning" className="btn-rounded" block>Block Level Button</Button>
				    					</p>
				    					
				    				</Panel>
				        </div>
		            <div className="col-md-8">
		            		<Panel header={<span>Button Groups</span>}
		            			bsStyle="primary"
		            		>
		            			<ButtonGroup>
		            				<Button bsStyle="primary">Primary Button</Button>
		            				<Button bsStyle="default">Default Button</Button>
		            			</ButtonGroup>
		            			<hr />
		            			<h4>Justified Button Groups</h4>
		            			<div className="btn-group btn-group-justified" role="group">
	                        <div className="btn-group" role="group">
	                            <button type="button" className="btn btn-primary">Primary </button>
	                        </div>
	                        <div className="btn-group" role="group">
	                            <button type="button" className="btn btn-info">Info</button>
	                        </div>
	                        <div className="btn-group" role="group">
	                            <button type="button" className="btn btn-warning">Warning</button>
	                        </div>
	                        <div className="btn-group" role="group">
	                            <button type="button" className="btn btn-danger">Danger</button>
	                        </div>
		                   </div>
		            		</Panel>
		            </div>
				    </div>

				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Buttons with Icons</span>}
				        			bsStyle="primary"
				        		>
				        			<Button bsStyle="primary" bsSize="large" className="btn-circle"><i className="fa fa-twitter"></i></Button>
	                    <Button bsStyle="info" bsSize="large" className="btn-circle"><i className="fa fa-facebook"></i></Button>
	                    <Button bsStyle="warning" className="btn-rounded">Download&nbsp;&nbsp;<i className="fa fa-download"></i></Button>
	                    <Button bsStyle="success" className="btn-rounded btn-outline"><i className="fa fa-plus"></i>&nbsp;&nbsp;View More</Button>
	                    <Button bsStyle="danger"><i className="fa fa-phone"></i>&nbsp;&nbsp;Call Us!</Button>
				        		</Panel>
				        </div>
				    </div>
				</div>
      </div>
      
    );
  }

});

export default Buttons;