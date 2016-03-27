import React from 'react';
import { Link } from "react-router";
import {Panel, ProgressBar, Button} from 'react-bootstrap';

var Progressbars = React.createClass({

	getInitialState: function(){
		return {
			value1: 81,
			value2: 81,
			color1: 'danger',
			message1: 'Danger !!! Watch out !!!',
			value3: 17,
			value4: 24,
			value5: 11,
			color2: 'info',
			color3: 'danger',
			color4: 'warning'
		}
	},

  render: function() {
    return (

      <div>
      	<pageheader pagename="Progressbar" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">                
				    <div className="row">
				        <div className="col-md-6">
				        		<Panel header={<span>Progress Bars</span>}
				        			bsStyle="success"
				        		>
				        			<h4>Regular</h4>
				        			<ProgressBar now={47} />
	                    <h4>With label</h4>
	                    <ProgressBar now={63} label="%(percent)s%" />
	                    <h4>Stacked</h4>
	                    <ProgressBar>
										    <ProgressBar bsStyle="success" now={22} key={1} />
										    <ProgressBar bsStyle="danger" now={12} key={2} />
										    <ProgressBar active bsStyle="warning" now={27} key={3} />
										  </ProgressBar>
				        		</Panel>
				        </div>
				        <div className="col-md-6">
				        		<Panel header={<span>Contextual Progressbars</span>}
				        			bsStyle="info"
				        		>
				        			<ProgressBar bsStyle="success" now={97} />
									    <ProgressBar bsStyle="primary" now={63} />
									    <ProgressBar bsStyle="info" now={52} />
									    <ProgressBar bsStyle="warning" now={31} />
									    <ProgressBar bsStyle="danger" now={16} />
				        		</Panel>
				        </div>
				   </div>

				    <div className="row">
				        <div className="col-md-6">
				        		<Panel header={<span>Striped Progresbars</span>}
				        			bsStyle="primary"
				        		>
				        			<ProgressBar striped bsStyle="success" now={97} />
									    <ProgressBar striped bsStyle="info" now={52} />
									    <ProgressBar striped bsStyle="primary" now={63} />
									    <ProgressBar striped bsStyle="warning" now={31} />
									    <ProgressBar striped bsStyle="danger" now={16} />
				        		</Panel>
				        </div>
				        <div className="col-md-6">
				        		<Panel header={<span>Animated Progresbars</span>}
				        			bsStyle="danger"
				        		>
				        			<ProgressBar active bsStyle="primary" now={65} />
									    <ProgressBar active bsStyle="success" now={92} />
									    <ProgressBar active bsStyle="info" now={77} />
									    <ProgressBar active bsStyle="warning" now={34} />
									    <ProgressBar active bsStyle="danger" now={22} />
				        		</Panel>
				        </div>
				    </div>
				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>ReactJS Dynamic Progressbars</span>}
				        			bsStyle="warning"
				        		>
				        			<h3>Dynamic <Button bsStyle="primary" bsSize="small" onClick={this.randomizeValues}>Randomize</Button></h3>
				              <ProgressBar max={200} now={this.state.value1} label={this.state.value1 + '/200'} />

				              <small><em>No animation</em></small>
				              <ProgressBar bsStyle="success" now={this.state.value2} label="%(percent)s%" />

                      <small><em>Object (changes type based on value)</em></small>
                      <ProgressBar active bsStyle={this.state.color1} now={this.state.value2} label={this.state.message1} />

                      <hr />
                      <h3>Stacked <Button bsStyle="primary" bsSize="small" onClick={this.randomStackValues}>Randomize</Button></h3>
                      <ProgressBar>
										    <ProgressBar bsStyle={this.state.color2} now={this.state.value3} label="%(percent)s%" />
										    <ProgressBar bsStyle={this.state.color3} now={this.state.value4} label="%(percent)s%" />
										    <ProgressBar bsStyle={this.state.color4} now={this.state.value5} label="%(percent)s%" />
										  </ProgressBar>
				        		</Panel>
				        </div>
				    </div>
				</div>
      </div>
      
    );
  },

  randomizeValues: function(){
  	this.setState({value1: Math.floor(Math.random()*200)});
  	this.setState({value2: Math.floor(Math.random()*100)});
  	if(this.state.value2 < 30){
  		this.setState({color1: 'success'});
  		this.setState({message1: 'success'});
  	}
  	else if(this.state.value2 < 50){
  		this.setState({color1: 'info'});
  		this.setState({message1: 'info'});
  	}
  	else if(this.state.value2 < 70){
  		this.setState({color1: 'warning'});
  		this.setState({message1: 'Warning !!! Watch out !!!'});
  	}
  	else{
  		this.setState({color1: 'danger'});
  		this.setState({message1: 'Danger !!! Watch out !!!'});
  	}
  },

  randomStackValues: function(){
  	this.setState({value3: Math.floor(Math.random()*30)});
  	this.setState({value4: Math.floor(Math.random()*30)});
  	this.setState({value5: Math.floor(Math.random()*40)});
  	if(this.state.value3 < 15)
  		this.setState({color2: 'info'});
  	else
  		this.setState({color2: 'success'});
  	if(this.state.value3 < 15)
  		this.setState({color2: 'primary'});
  	else
  		this.setState({color2: 'warning'});
  	if(this.state.value3 < 15)
  		this.setState({color2: 'success'});
  	else
  		this.setState({color2: 'danger'});
  }

});

export default Progressbars;