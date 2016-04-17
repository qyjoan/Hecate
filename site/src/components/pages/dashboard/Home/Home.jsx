import React, { PropTypes, Component } from 'react';
import Router from 'react-router';
import { Link } from "react-router";
import {ProgressBar, Panel} from 'react-bootstrap';
import C3Chart from "../../../common/ChartElement/C3Chart";
import CurrentRoute from '../../../common/CurrentRoute';
import MapRoute from '../../../common/GoogleMaps';
import Stats from '../../../common/Stats';
import Weekly from '../../../common/Weekly';
import WeeklyDetail from './WeeklyDetail.jsx';
import vectorMap from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-2.0.3.min';
import code from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-world-mill-en';
import AppStore from '../../../../stores/AppStore';
import Translate from '../../../common/Translate';
import {History} from 'history';
var Slider = require('react-slick');

var GoogleMaps = require('google-maps'),
    ReactDOM = require('react-dom');

var Home = React.createClass({
        mixins: [History],

        componentWillMount: function () {
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
            console.log(user_data)
            if (user_data['today_outbound_time_saved'] > 0) {
                var sub = 'Outbound (Save ' + user_data['today_outbound_time_saved'] + ' mins)'
            }
            else {
                var sub = 'Outbound'
            }

            var t_saved = null
            console.log(parseFloat(user_data['total_saved_minutes']).toFixed(2))
            if (parseFloat(user_data['total_saved_minutes']).toFixed(2) < 1.0) {
                t_saved = '< 1 Min Saved'
            }
            else {
                t_saved = parseFloat(user_data['total_saved_minutes']).toFixed(2) + ' Mins Saved'
            }

            // TODO: SET ALL THE USER PARAMETERS HERE
            this.setState({
                total_saved: t_saved,
                since_date: 'Since: ' + new Date(Date.parse(user_data['since'])).toDateString(),
                yearly_saved: user_data['yearly_projected'] + ' Hours',
                today_outbound: user_data['today_outbound_departure'] + ' Departure',
                today_outbound_sub: sub,
                outbound: user_data['outbound'],
                homebound: user_data['homebound']
            })
        },

        handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Get User Error')
        },

        getInitialState: function () {

            return {
                user: {},
                username: null,
                outbound: {},
                homebound: {},
                weeklyDetails: false
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

        getDaysHTML: function (data) {
            var outbound = data
            var html = ""

            if ('Monday' in outbound) {
                var day = outbound['Monday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Monday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Tuesday' in outbound) {
                var day = outbound['Tuesday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Tuesday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Wednesday' in outbound) {
                var day = outbound['Wednesday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Wednesday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Thursday' in outbound) {
                var day = outbound['Thursday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Thursday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Friday' in outbound) {
                var day = outbound['Friday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Friday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Saturday' in outbound) {
                var day = outbound['Saturday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Saturday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            if ('Sunday' in outbound) {
                var day = outbound['Sunday']
                var max_temp = day['max_temp']
                var min_temp = day['min_temp']
                html += "<tr>"
                html += "<td width='15%'>Sunday</td>"
                html += "<td width='40%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + day['weather'] + ".png") + "' alt='" + day['weather'] + "' width='50' height='50'></td>" +
                    "<td><table><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td>"
                html += "<td width='15%'>" + day['departure_time'] + "</td>"
                html += "<td width='15%'>" + day['duration_weather'] + " mins</td>"
                html += "<td width='15%'>" + day['est_arrival'] + "</td>"
                html += "</tr>"
            }

            return (html)
        },

        setDetails: function () {
            console.log('setDetails')
            this.setState({
                weeklyDetails: true
            })
        },

        setNoDetails: function () {
            console.log('setNoDetails')
            this.setState({
                weeklyDetails: false
            })
        },

        render: function () {
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            };
            if (this.state.weeklyDetails) {
                return (
                    <div>
                        <WeeklyDetail user={this.state.user} onClick={this.setNoDetails}/>
                    </div>
                )
            }
            else {

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
                                <div className="col-md-8 col-lg-9">
                                    <div className="home-stats">
                                        <Slider {...settings}>
                                        <span><Weekly type="Outbound - This Week"
                                                      html={this.getDaysHTML(this.state.outbound)}
                                                      onClick={this.setDetails}/></span>
                                        <span><Weekly type="Homebound - This Week"
                                                      html={this.getDaysHTML(this.state.homebound)}
                                                      onClick={this.setDetails}/></span>
                                        </Slider>
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
        }
        ,
        _onChange: function () {

            this.setState({
                language: AppStore.getLanguage()
            })
        }
    })
    ;

export default Home;