import React from 'react';
import { Link } from "react-router";
import {Panel, Alert, Button, Input, ButtonToolbar} from 'react-bootstrap';

var Alerts = React.createClass({

	getInitialState: function(){
    
    return {
    	alertVisible1: true,
      alertVisible2: true,
      alertVisible3: true,
      alertVisible4: false,
      alertValue: '',
      showGrowlDefault: false,
      showGrowlPrimary: false,
      showGrowlInfo: false,
      showGrowlWarning: false,
      showGrowlError: false
    };

  },
  render: function() {
    return (

      <div>
      	<pageheader pagename="Alerts" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">
					<Panel header={<span>Dismissable Alerts</span>}
						bsStyle="primary"
					>
						{this.state.alertVisible1?
						<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss1}>
		          <p>Oh snap! Change a few things up and try submitting again.</p>
		        </Alert>
		        :null}
		        {this.state.alertVisible2?
						<Alert bsStyle="info" onDismiss={this.handleAlertDismiss2} name='2' style={ {display: this.state.alertVisible2?'':'none'} }>
		          <p>Ok! Not bad, but you can do better.</p>
		        </Alert>
		        :null}
		        {this.state.alertVisible3?
						<Alert bsStyle="success" onDismiss={this.handleAlertDismiss3} name='3' style={ {display: this.state.alertVisible3?'':'none'} }>
		          <p>Well done! You successfully read this important alert message.</p>
		        </Alert>
		        :null}
		        {this.state.alertVisible4?
						<Alert bsStyle="warning" onDismiss={this.handleAlertDismiss4} name='4' style={ {display: this.state.alertVisible4?'':'none'} }>
		          <p>{this.state.alertValue}</p>
		        </Alert>
		        :null}
		        <form className="form-inline" onSubmit={this.addAlert}>
							<Input type="text" placeholder="Enter Alert Message" />
							&nbsp;
							<Button type="submit">Add Alert</Button>
						</form>
					</Panel>

					<Panel header={<span>Growl Alerts</span>}
						bsStyle="info"
					>
						<ButtonToolbar>
							<Button bsStyle="default" onClick={this.toggleGrowl} name="Default">Show Growl</Button>
							<Button bsStyle="primary" onClick={this.toggleGrowl} name="Primary">Primary Growl</Button>
							<Button bsStyle="info" onClick={this.toggleGrowl} name="Info">Info Growl</Button> 
							<Button bsStyle="warning" onClick={this.toggleGrowl} name="Warning">Warning Growl</Button> 
							<Button bsStyle="danger" onClick={this.toggleGrowl} name="Error">Danger Growl</Button> 
						</ButtonToolbar>

						<growl-notifications>
							<growl-notification class="fading" style={ {display: this.state.showGrowlDefault?'':'none'} } >
								<a href="javascript:;" onClick={this.closeGrowl} className="close"><i className="fa fa-times" name="Default"></i></a>
								Default Notification</growl-notification>

							<growl-notification class="growl-primary fading" style={ {display: this.state.showGrowlPrimary?'':'none'} }>
								<a href="javascript:;" onClick={this.closeGrowl} className="close"><i className="fa fa-times" name="Primary"></i></a>
								Primary Notification</growl-notification>

							<growl-notification class="growl-info fading" style={ {display: this.state.showGrowlInfo?'':'none'} }>
								<a href="javascript:;" onClick={this.closeGrowl} className="close"><i className="fa fa-times" name="Info"></i></a>
								Info Notification</growl-notification>

							<growl-notification class="growl-warning" style={ {display: this.state.showGrowlWarning?'':'none'} }>
								<a href="javascript:;" onClick={this.closeGrowl} className="close"><i className="fa fa-times" name="Warning"></i></a>
								Warning Notification
							</growl-notification>

							<growl-notification class="growl-error fading" style={ {display: this.state.showGrowlError?'':'none'} }>
								<a href="javascript:;" onClick={this.closeGrowl} className="close"><i className="fa fa-times" name="Error"></i></a>
								Error Notification</growl-notification>
						</growl-notifications>
					</Panel>
				</div>
      </div>
      
    );
  },

  handleAlertDismiss1: function() {
  	this.setState({alertVisible1: false});
  },

	handleAlertDismiss2: function() {
  	this.setState({alertVisible2: false});
  },

	handleAlertDismiss3: function() {
  	this.setState({alertVisible3: false});
  },

  handleAlertDismiss4: function() {
  	this.setState({alertVisible4: false});
  },

  toggleGrowl: function(e){
  	var that = this;
  	switch(e.target.name){
  		case 'Default':
  			this.setState({showGrowlDefault: !this.state.showGrowlDefault});
  			setTimeout(function(){
  				that.setState({showGrowlDefault: false});
  			},5000);
  			break; 
  		case 'Primary':
  			this.setState({showGrowlPrimary: !this.state.showGrowlPrimary});
  			setTimeout(function(){
  				that.setState({showGrowlPrimary: false});
  			},5000);
  			break;
  		case 'Info':
  			this.setState({showGrowlInfo: !this.state.showGrowlInfo});
  			setTimeout(function(){
  				that.setState({showGrowlInfo: false});
  			},5000);
  			break;
  		case 'Warning':
  			this.setState({showGrowlWarning: !this.state.showGrowlWarning});
  			setTimeout(function(){
  				that.setState({showGrowlWarning: false});
  			},5000);
  			break;
  		case 'Error':
  			this.setState({showGrowlError: !this.state.showGrowlError});
  			setTimeout(function(){
  				that.setState({showGrowlError: false});
  			},5000);
  			break;
  	}
  	
  },

  closeGrowl: function(e){
  	switch(e.target.getAttribute('name')){
  		case 'Default':
  			this.setState({showGrowlDefault: false});
  			break; 
  		case 'Primary':
  			this.setState({showGrowlPrimary: false});
  			break;
  		case 'Info':
  			this.setState({showGrowlInfo: false});
  			break;
  		case 'Warning':
  			this.setState({showGrowlWarning: false});
  			break;
  		case 'Error':
  			this.setState({showGrowlError: false});
  			break;
  	}
  	
  },

  addAlert: function(e){
  	e.preventDefault();
    
    if(!this.state.alertVisible4){
      this.setState({alertValue: e.target[0].value});
      this.setState({alertVisible4: true});
    }
    
    e.target[0].value = "";
    return false;
  }


});

export default Alerts;