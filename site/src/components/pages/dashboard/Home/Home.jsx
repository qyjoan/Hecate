import React, { PropTypes, Component } from 'react';
import Router from 'react-router';
import { Link } from "react-router";
import {ProgressBar, Panel} from 'react-bootstrap';
import C3Chart from "../../../common/ChartElement/C3Chart";
import CurrentRoute from '../../../common/CurrentRoute';
import MapRoute from '../../../common/GoogleMaps';
import Stats from '../../../common/Stats';
import vectorMap from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-2.0.3.min';
import code from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-world-mill-en';
import AppStore from '../../../../stores/AppStore';
import Translate from '../../../common/Translate';
import {History} from 'history';

var GoogleMaps = require('google-maps'),
    ReactDOM = require('react-dom');

let data = [
    {
        key: "Referral user",
        values: [
            {label: "0", value: 2},
            {label: "1", value: 13},
            {label: "2", value: 27},
            {label: "3", value: 16},
            {label: "4", value: 17},
            {label: "5", value: 15},
            {label: "6", value: 58}
        ]
    },
    {
        key: "Returning user",
        values: [
            {label: "0", value: 6},
            {label: "1", value: 17},
            {label: "2", value: 36},
            {label: "3", value: 12},
            {label: "4", value: 36},
            {label: "5", value: 27},
            {label: "6", value: 40}
        ]
    },
    {
        key: "New user",
        values: [
            {label: "0", value: 10},
            {label: "1", value: 19},
            {label: "2", value: 29},
            {label: "3", value: 11},
            {label: "4", value: 30},
            {label: "5", value: 22},
            {label: "6", value: 28}
        ]
    }
];

let options = {
    padding: {
        top: 50,
        bottom: 20,
        left: 0,
        right: 10
    },
    size: {
        height: 255
    },
    subchart: false,
    grid: {
        x: false,
        y: false
    },
    labels: false,
    axisLabel: {
        x: "",
        y: ""
    },
    showAxisLabel: false,
    onClick: function (d) {
        let categories = this.categories(); //c3 function, get categorical labels
        console.log(d);
        console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
    }
};

let data1 = [
    {
        key: "",
        values: [
            {label: "0", value: 33},
            {label: "1", value: 27},
            {label: "2", value: 36},
            {label: "3", value: 47},
            {label: "4", value: 55},
            {label: "5", value: 37},
            {label: "6", value: 32},
            {label: "7", value: 39},
            {label: "8", value: 28},
            {label: "9", value: 21},
            {label: "10", value: 37},
            {label: "11", value: 42},
            {label: "12", value: 32},
            {label: "13", value: 26},
            {label: "14", value: 18}
        ]
    }
];

let options1 = {
    padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    size: {
        height: 149
    },
    subchart: false,
    grid: {
        x: false,
        y: false
    },
    labels: false,
    axisLabel: {
        x: "",
        y: ""
    },
    showLegend: false,
    showAxisLabel: false,
    color: '#de5b57',
    onClick: function (d) {
        let categories = this.categories(); //c3 function, get categorical labels
        console.log(d);
        console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
    }
};

let data2 = [
    {
        key: "",
        values: [
            {label: "0", value: 33},
            {label: "1", value: 15},
            {label: "2", value: 10}
        ]
    }
];

let options2 = {
    padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    size: {
        height: 130
    },
    subchart: false,
    grid: {
        x: false,
        y: false
    },
    labels: false,
    axisLabel: {
        x: "",
        y: ""
    },
    showLegend: false,
    showAxisLabel: false,
    onClick: function (d) {
        let categories = this.categories(); //c3 function, get categorical labels
        console.log(d);
        console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
    }
};

var Home = React.createClass({
        mixins: [History],

        componentWillMount: function() {
            var username = sessionStorage.getItem('username');

            if (!username) {
                this.props.history.push('/login');
            }
            else {
                this.state.username = username;
            }
        },

        loadUserFromServer: function () {
            var http = require("http");
            var url = "http://54.191.104.28:5000/hecate/api/v1.0/getUser";
            var data = this.state.username  //'user7'

            if (data) {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {username: data},
                    success: this.handleSubmitSuccess,
                    error: this.handleSubmitFailure,
                });
            }

            var http = require("http");
            var url = "http://54.191.104.28:5000/hecate/api/v1.0/stats";
            var data = this.state.username //'user7'

            if (data) {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {username: data},
                    success: this.handleStatsSubmitSuccess,
                    error: this.handleStatsSubmitFailure,
                });
            }

        }, // load from server end

        handleSubmitSuccess: function (data) {
            var user_data = JSON.parse(data);

            // TODO: SET ALL THE USER PARAMETERS HERE
            this.setState({
                user: JSON.parse(user_data['data']),
            })
            this.loadMaps()
        },

        handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Error')
        },

        handleStatsSubmitSuccess: function (data) {
            var user_data = JSON.parse(data);
            if (user_data['today_outbound_time_saved'] > 0) {
                var sub = 'Outbound (Save ' + user_data['today_outbound_time_saved'] + ' mins)'
            }
            else {
                var sub = 'Outbound'
            }

            // TODO: SET ALL THE USER PARAMETERS HERE
            this.setState({
                total_saved: parseFloat(user_data['total_saved_minutes']).toFixed(2) + ' Mins Saved',
                since_date: 'Since: ' + new Date(Date.parse(user_data['since'])).toDateString(),
                yearly_saved: user_data['yearly_projected'] + ' Hours',
                today_outbound: user_data['today_outbound_departure'] + ' Departure',
                today_outbound_sub: sub
            })
        },

        handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Get User Error')
        },

        getInitialState: function () {

            return {
                user: {},
                username: null
            };

        },

        loadMaps: function () {
            GoogleMaps.LIBRARIES = ['places'];
            GoogleMaps.KEY = 'AIzaSyAG7Mj4xcF8hVd0_r1CNUXCpI5ycPly6eY';
            user = this.state.user;
            GoogleMaps.load(function (google) {
                ReactDOM.render(<MapRoute mapService={google} user={user}></MapRoute>, document.getElementById('maps'))
            });

        },

        componentDidMount: function () {
            $(this.refs.worldMap).vectorMap({
                backgroundColor: '#FFFFFF',
                zoomOnScroll: false,
                regionStyle: {
                    initial: {
                        fill: '#CCC'
                    },
                    hover: {
                        fill: "#3CA2E0"
                    }
                }
            });

            this.loadUserFromServer();
            AppStore.addChangeListener(this._onChange);
        },

        render: function () {
            return (
                <div>

                    <div className="conter-wrapper home-container">
                        <div className="row home-row">
                            <div className="col-md-4 col-lg-3">
                                <div className="home-stats">
                                    <Stats icon="cloud-upload"
                                           value={this.state.total_saved}
                                           text={this.state.since_date}
                                           bgclass="info"
                                           link="/dashboard/chartc3"
                                           progressValue="88"
                                        >
                                    </Stats>
                                    <Stats icon="heartbeat"
                                           value={this.state.yearly_saved}
                                           text="Est. Saved Per Year"
                                           bgclass="success"
                                           link="/dashboard/chartc3"
                                           progressValue="88"
                                        >
                                    </Stats>
                                    <Stats icon="flag"
                                           value={this.state.today_outbound}
                                           text={this.state.today_outbound_sub}
                                           bgclass="danger"
                                           link="/dashboard/chartc3"
                                           progressValue="88"
                                        >
                                    </Stats>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-6">
                                <div className="home-charts-middle">
                                    <div className="chart-container">
                                        <div className="chart-comment clearfix">
                                            <div className="text-primary pull-left">
                                                <span className="comment-header">55%</span><br />
                                                <span className="comment-comment">{Translate.getWord('chart1')}</span>
                                            </div>
                                            <div className="text-warning pull-left m-l">
                                                <span className="comment-header">25%</span><br />
                                                <span className="comment-comment">{Translate.getWord('chart2')}</span>
                                            </div>
                                            <div className="text-success pull-left m-l">
                                                <span className="comment-header">20%</span><br />
                                                <span className="comment-comment">{Translate.getWord('chart3')}</span>
                                            </div>
                                        </div>
                                        <div bindto-id="line-chart">
                                            <C3Chart data={data} type={"lineBar"} options={options} value={1}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="home-charts-right">
                                    <div className="top-right-chart">
                                        <C3Chart data={data1} type={"bar"} options={options1} value={2}/>
                                    </div>
                                    <div className="bottom-right-chart">
                                        <div className="top-left-chart clearfix">
                                            <div className="row">
                                                <div className="col-sm-6 text-left">
                                                    <div className="padder">
                                                        <span
                                                            className="heading">{Translate.getWord('views')}: </span><br />
                                                        <big className="text-primary">22068</big>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <C3Chart data={data2} type={"pie"} options={options2} value={3}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row home-row">
                            <div className="col-lg-12 col-md-12">
                                <CurrentRoute user={this.state.user}></CurrentRoute>
                            </div>
                        </div>
                        <div className="row home-row">
                            <div className="col-lg-12 col-md-12">
                                <div className="maps" id="maps" align="center"></div>
                            </div>
                        </div>
                    </div>
                </div>


            );
        }
        ,
  _onChange: function() {

      this.setState({
          language: AppStore.getLanguage()
      })
  }
    })
    ;

export default Home;