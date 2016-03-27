import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {ProgressBar} from 'react-bootstrap';

var Stats = React.createClass({

	// propTypes: {
	// 	icon: React.PropTypes.string.isRequired,
 //    value: React.PropTypes.string.isRequired,
 //    text: React.PropTypes.string.isRequired,
 //    bgclass: React.PropTypes.string.isRequired,
 //    link: React.PropTypes.string.isRequired,
 //    progressValue: React.PropTypes.string.isRequired
	// }, 
	// usage - name: {this.props.username}

  getInitialState: function(){
    return {};
  },

	render: function(){
		var iconClass = "fa fa-" + this.props.icon + " fa-4x text-" + this.props.bgclass;

  	return ( <Link to={this.props.link} className="stat hvr-wobble-horizontal">
        <div className=" stat-icon">
          <i className={iconClass}></i>
        </div>
        <div className=" stat-label">
          <div className="label-header">
            {this.props.value}
          </div>
          <ProgressBar bsStyle={this.props.bgclass} className="progress-sm" now={this.props.progressValue} key={1} />
          <div className="clearfix stat-detail">
            <div className="label-body">
              <i className="fa fa-arrow-circle-o-right pull-right text-muted"></i>
              {this.props.text}
            </div>
          </div>
        </div>
      </Link>
    );
  }

});

export default Stats;