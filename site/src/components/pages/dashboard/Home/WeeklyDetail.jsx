import React, { PropTypes, Component } from 'react';
import Router from 'react-router';
import { Link } from "react-router";
import {ProgressBar, Panel} from 'react-bootstrap';
import CurrentRoute from '../../../common/CurrentRoute';
import WeeklyDetails from '../../../common/WeeklyDetails';
import vectorMap from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-2.0.3.min';
import code from '../../../common/jquery-jvectormap-2.0.3/jquery-jvectormap-world-mill-en';
import AppStore from '../../../../stores/AppStore';
import Translate from '../../../common/Translate';
import {History} from 'history';
var Slider = require('react-slick');

var ReactDOM = require('react-dom');

var WeeklyDetail = React.createClass({
        mixins: [History],

        propTypes: {
            onClick:   React.PropTypes.func
        },

        changeHandler: function(e) {
            this.props.onClick(this)
        },

        componentWillMount: function () {
            var username = sessionStorage.getItem('username');

            if (!username) {
                this.props.history.push('/login');
            }
            else {
                this.state.username = username;
            }
        },

        loadDataFromServer: function () {
            var http = require("http");
            var url = "http://54.191.104.28:5000/hecate/api/v1.0/dayStats";
            var data = this.state.username

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

        handleStatsSubmitSuccess: function (data) {
            var stats = JSON.parse(data);
            console.log(stats)
            this.setState({
                outbound: stats['outbound'],
                homebound: stats['homebound']
            })
        },

        handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Get Daily Stats Error')
        },

        handleWeatherSubmitSuccess: function (data) {
            var weather_data = JSON.parse(data);
            console.log(weather_data)
            this.setState({
                weather: weather_data['weather'],
                min_temp: weather_data['min'],
                max_temp: weather_data['max']
            })
        },

        handleWeatherSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Get Daily Stats Error')
        },

        getInitialState: function () {

            return {
                user: {},
                username: null,
                outbound: {},
                homebound: {},
                weather: null,
                min_temp: null,
                max_temp: null

            };

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

            this.loadDataFromServer();
            AppStore.addChangeListener(this._onChange);
        },

        buildHTML: function (outbound, dayName) {
            console.log(dayName)
            var html = ""

            if (dayName in outbound) {
                var day = outbound[dayName]
                var times = day['times']
                console.log(day)

                const times_ordered = {};
                Object.keys(times).sort().forEach(function (key) {
                    times_ordered[key] = times[key];
                });

                if (day['weather'] == undefined) {
                    var weather = 'Clear'
                }
                else {
                    var weather = day['weather']
                }


                if (day['max_temp'] == undefined) {
                    var max_temp = 0
                }
                else {
                    var max_temp = day['max_temp']
                }


                if (day['min_temp'] == undefined) {
                    var min_temp = 0
                }
                else {
                    var min_temp = day['min_temp']
                }

                html += "<tr>"
                html += "<td width='15%'><b>" + dayName + "</b></td>"
                html += "<td width='85%'>" +
                    "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../../../common/images/" + weather + ".png") + "' alt='" + weather + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>" +
                    "</td></tr>"
                html += "<tr><td/><td colspan='3'><table width='100%'>" +
                    "<thead><td><b>Departure Time</b></td><td><b>Duration</b></td><td><b>Est. Arrival</b></td>"
                "<tbody>"
                // Now loop through the times and output them
                for (var time in times_ordered) {
                    var data = times_ordered[time]
                    var departure_time = data['departure_time']

                    var dep_time_split = departure_time.split(':')
                    var d = new Date('1900', '01', '01', dep_time_split[0], dep_time_split[1])
                    var hours = d.getHours();
                    var minutes = d.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var departure = hours + ':' + minutes + ' ' + ampm;

                    var duration = Math.round(data['duration'] / 60)
                    var d = new Date('1900', '01', '01', dep_time_split[0], dep_time_split[1])
                    d.setSeconds(d.getSeconds() + data['duration'] + data['weather_impact']);

                    var hours = d.getHours();
                    var minutes = d.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var arrival = hours + ':' + minutes + ' ' + ampm;

                    html += "<tr><td width='33%'>" + departure + "</td>" // Time
                    html += "<td width='33%'>" + duration + " mins</td>" // Duration
                    html += "<td width='33%'>" + arrival + "</td>" // Est Arrival
                    html += "</tr>"
                }
                html += "</table></tr>"
            }
            return html
        },

        getDaysHTML: function (data) {
            var html = ""
            html += this.buildHTML(data, 'Monday')
            html += this.buildHTML(data, 'Tuesday')
            html += this.buildHTML(data, 'Wednesday')
            html += this.buildHTML(data, 'Thursday')
            html += this.buildHTML(data, 'Friday')
            html += this.buildHTML(data, 'Saturday')
            html += this.buildHTML(data, 'Sunday')

            return (html)
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

            return (
                <div>

                    <div className="conter-wrapper home-container">
                        <div className="row home-row">
                            <div className="col-lg-12 col-md-12">
                                <CurrentRoute user={this.props.user}></CurrentRoute>
                            </div>
                        </div>
                        <div className="row home-row">
                            <div className="col-md-12 col-lg-12">
                                <div className="home-stats">
                                        <span><WeeklyDetails type="Outbound - This Week"
                                                             html={this.getDaysHTML(this.state.outbound)} onClick={this.changeHandler} /></span>
                                        <span><WeeklyDetails type="Homebound - This Week"
                                                             html={this.getDaysHTML(this.state.homebound)} onClick={this.changeHandler} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            );
        }
        ,
        _onChange: function () {

            this.setState({
                language: AppStore.getLanguage()
            })
        }
    })
    ;

export default WeeklyDetail;