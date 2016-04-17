import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {ProgressBar} from 'react-bootstrap';

var WeeklyDetails = React.createClass({
    propTypes: {
        onClick:   React.PropTypes.func
    },

    getInitialState: function () {
        return {};
    },

    changeHandler: function(e) {
        this.props.onClick(this)
    },

    render: function () {
        return ( <span className="stat">
                <div className="stat-label">
                    <div className="label-header">
                        {this.props.type} <span className="normal"><Link to="#" onClick={this.changeHandler}>[Return To Dashboard]</Link></span>
                    </div>
                    <ProgressBar bsStyle="success" className="progress-sm"
                                 now="88" key={1}/>

                    <div className="clearfix stat-detail">
                        <div className="label-body">
                            <table width='100%'>
                                <tbody dangerouslySetInnerHTML={{__html: this.props.html}}/>
                            </table>
                        </div>
                    </div>
                </div>
            </span>
        );
    }

});

export default WeeklyDetails;
