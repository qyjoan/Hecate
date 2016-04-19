import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {ProgressBar} from 'react-bootstrap';

var Weekly = React.createClass({

    propTypes: {
        onClick:   React.PropTypes.func
    },

    // propTypes: {
    // 	icon: React.PropTypes.string.isRequired,
    //    value: React.PropTypes.string.isRequired,
    //    text: React.PropTypes.string.isRequired,
    //    bgclass: React.PropTypes.string.isRequired,
    //    link: React.PropTypes.string.isRequired,
    //    progressValue: React.PropTypes.string.isRequired
    // },
    // usage - name: {this.props.username}

    getInitialState: function () {
        return {};
    },

    changeHandler: function(e) {
        this.props.onClick(this)
    },

    render: function () {
        if (this.props.details == "No") {
            var detailText = "normal-hidden"
        }
        else {
            var detailText = "normal"
        }

        return ( <span className="stat">
            <div className="stat-label">
                    <div className="label-header">
                        {this.props.type} <span className={detailText}><Link to="#" onClick={this.changeHandler}>[Details]</Link></span>
                    </div>
                    <ProgressBar bsStyle="success" className="progress-sm"
                                 now="88" key={1}/>

                    <div className="clearfix stat-detail">
                        <div className="label-body">
                            <table width='100%'>
                                <thead>
                                <tr>
                                    <td width='15%'>Day</td>
                                    <td width='40%'>Weather</td>
                                    <td width='15%'>Departure</td>
                                    <td width='15%'>Duration</td>
                                    <td width='15%'>Est. Arrival</td>
                                </tr>
                                </thead>
                                <tbody dangerouslySetInnerHTML={{__html: this.props.html}}/>
                            </table>
                        </div>
                    </div>
                </div>
            </span>
        );
    }

});

export default Weekly;
