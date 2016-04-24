import React from 'react';
import { Link } from "react-router";
import {Panel, Input,Label, Row} from 'react-bootstrap';
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Well = require('react-bootstrap').Well;
var Table = require('react-bootstrap').Table;
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import Weekly from '../common/Weekly';
var DateTimeField = require('react-bootstrap-datetimepicker');
var Loader = require('react-loader');

var InputError = React.createClass({
    getInitialState: function () {
        return {
            message: 'Input is invalid'
        };
    },
    render: function () {
        var errorClass = classNames(this.props.className, {
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });

        return (
            <div className={errorClass}>
                <span>{this.props.errorMessage}</span>
            </div>
        )
    }

});

var Splash = React.createClass({
    render: function () {
        return (
            <div className="login-page">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                        <img src={require("../../common/images/Hecate.png")}/>

                        <h1>Hecate</h1>
                    </div>
                </div>
                <div className="row">
                    <h1>Welcome to Hecate!</h1>

                    <h3>Let us optimize your route</h3>
                    <Button onClick={this.props.start}>Yes Please!</Button>
                </div>
            </div>
        );
    }
});

var SignUp = React.createClass({
    getInitialState: function () {
        return {
            "signup": null
        }
    },

    handleChange: function (e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({route_days: value})
        //this.props.someCallback(value);
    },

    componentDidMount: function () {
        var input = document.getElementById('home');
        new google.maps.places.Autocomplete(input);
        var input = document.getElementById('work');
        new google.maps.places.Autocomplete(input);
    },

    submit: function (e) {
        this.setState(
            {
                signup: true,
                start_address: this.refs.home.getInputDOMNode().value.trim(),
                end_address: this.refs.work.getInputDOMNode().value.trim(),
                transport_method: this.refs.mode.getInputDOMNode().value.trim(),
            }
        )

        var user = {};
        user['username'] = '';
        user['name'] = '';
        user['admin'] = false;
        var route = {};
        route['transportation'] = this.refs.mode.getInputDOMNode().value.trim();
        route['days'] = {};
        var address = {};
        var start = {};
        start['formatted_address'] = this.refs.home.getInputDOMNode().value.trim();
        address['start_location'] = start;
        var end = {};
        end['formatted_address'] = this.refs.work.getInputDOMNode().value.trim();
        address['end_location'] = end;
        route['address'] = address;
        route['times'] = {};
        user['route'] = route;

        var currentdate = new Date();
        var datetime = currentdate.toLocaleString();

        user['updated_at'] = datetime;
        user['password'] = '';
        user['created_at'] = datetime;
        user['next_check_time'] = datetime;

        this.setState({user: user});
    },

    _handleInvalidSubmit(errors, values) {
        // Errors is an array containing input names
        // that failed to validate
    },

    render: function () {
        if (this.state.signup) {
            return (<SignUpPhase2 start={this.state.start_address} end={this.state.end_address}
                                  transport={this.state.transport_method} user={this.state.user}
                />)
        }
        else {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Panel header={<span>Tell Us About Your Route...</span>}
                                               bsStyle="info"
                                            >
                                            {status}
                                            <Form
                                                onValidSubmit={this.submit}
                                                >
                                                <ValidatedInput
                                                    type='text'
                                                    label='Where are you leaving from?'
                                                    name='home'
                                                    id='home'
                                                    ref='home'
                                                    validate='required'
                                                    errorHelp={{
                                                required: 'Please enter where you are leaving from',
                                            }}
                                                    placeholder="1600 Amphitheatre Pkwy, Mountain View, CA 94043"
                                                    />
                                                <ValidatedInput
                                                    type='text'
                                                    label='Where are you going?'
                                                    name='work'
                                                    ref='work'
                                                    id='work'
                                                    validate='required'
                                                    errorHelp={{
                                                required: 'Please enter where you are going',
                                            }}
                                                    placeholder="1401 N Shoreline Blvd, Mountain View, CA 94043"
                                                    />
                                                <ValidatedInput
                                                    type='select'
                                                    label='What is your mode of transport?'
                                                    name='mode'
                                                    ref='mode'
                                                    validate='required'
                                                    errorHelp={{
                                                required: 'Please select a mode of transport.'
                                            }}
                                                    placeholder="select"
                                                    >
                                                    <option value="driving">Personal Vehicle</option>
                                                    <option value="driving">Ride Share</option>
                                                    <option value="bycling">Bike</option>
                                                    <option value="transit">Public Transit</option>
                                                    <option value="walking">Walking</option>
                                                </ValidatedInput>
                                                <ButtonInput
                                                    type='submit'
                                                    bsSize='large'
                                                    bsStyle='primary'
                                                    value='Next'
                                                    />
                                            </Form>

                                        </Panel>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );

        }
    }
});

var SignUpPhase2 = React.createClass({
    getInitialState: function () {
        return {
            "signup": null,
            "route_days": ""
        }
    },

    handleChange: function (e) {
        console.log(e)
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({route_days: value})
        //this.props.someCallback(value);
    },

    submit: function (e) {
        this.setState({signup: true})
        var user = this.props.user;
        var route = user['route'];
        var times = route['times'];
        var days = this.state.route_days;
        route['days'] = days;

        var outbound = {};
        for (var i = 0; i < days.length; i++) {
            var day = {};
            day['earliest_start'] = this.refs.leave_early.getInputDOMNode().value.trim();
            day['latest_start'] = this.refs.leave_late.getInputDOMNode().value.trim();
            day['current_start'] = this.refs.leave_time.getInputDOMNode().value.trim();
            day['current_duration'] = this.refs.leave_duration.getInputDOMNode().value.trim();

            outbound[days[i]] = day;
        }

        times['outbound'] = outbound;

        this.setState({user: user})

    },

    onChange: function (value) {
        var date = new Date(parseInt(value));
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2);

        this.setState({'current_start': formattedTime})
    },

    render: function () {
        if (this.state.signup) {
            return (<SignUpPhase3 start={this.props.start} end={this.props.end}
                                  transport={this.props.transport} days={this.state.route_days}
                                  current_start={this.refs.leave_time.getInputDOMNode().value.trim()}
                                  earliest_start={this.refs.leave_early.getInputDOMNode().value.trim()}
                                  latest_start={this.refs.leave_late.getInputDOMNode().value.trim()}
                                  user={this.state.user}
                />)
        }
        else {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row home-row">
                                    <div className="col-md-12">
                                        <Panel header={<span>What Time Do You Leave?</span>}
                                               bsStyle="info"
                                            >
                                            {status}
                                            <Form onValidSubmit={this.submit}>
                                                <ValidatedInput
                                                    type='select'
                                                    label='What days of the week? (shift/control click to select all that apply)'
                                                    name='days'
                                                    ref='days'
                                                    validate='required'
                                                    errorHelp={{
                                                required: 'Please select at least one day.',
                                            }}
                                                    placeholder="select"
                                                    multiple
                                                    onChange={this.handleChange}
                                                    >
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                    <option value="Friday">Friday</option>
                                                    <option value="Saturday">Saturday</option>
                                                    <option value="Sunday">Sunday</option>
                                                </ValidatedInput>

                                                <ValidatedInput ref="leave_time" type="text" name="leave_time"
                                                                label="What time do you plan on leaving (24 hour time)?"
                                                                placeholder="7:55"
                                                                validate='required'
                                                                errorHelp={{
                                                required: 'Please enter the time you plan on leaving.',
                                            }}
                                                    />

                                                <ValidatedInput ref="leave_duration" type="text" name="leave_duration"
                                                                label="How many minutes do you expect it to take?"
                                                                placeholder="30"
                                                                validate='required'
                                                                errorHelp={{
                                                required: 'Please enter how many minutes you expect it to take.',
                                            }}
                                                    />
                                                <ValidatedInput ref="leave_early" type="text" name="leave_early"
                                                                label="When is the earliest you would consider leaving (24 hour time)?"
                                                                placeholder="7:00"
                                                                validate='required'
                                                                errorHelp={{
                                                required: 'Please enter the earliest you would consider leaving.',
                                            }}
                                                    />
                                                <ValidatedInput ref="leave_late" type="text" name="leave_late"
                                                                label="When is the latest you would consider leaving (24 hour time)?"
                                                                placeholder="8:15"
                                                                validate='required'
                                                                errorHelp={{
                                                required: 'Please enter the latest you would consider leaving.',
                                            }}
                                                    />
                                                <ButtonInput
                                                    type='submit'
                                                    bsSize='large'
                                                    bsStyle='primary'
                                                    value='Next'
                                                    />
                                            </Form>

                                        </Panel> (24 hour time)
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
});

var SignUpPhase3 = React.createClass({
    getInitialState: function () {
        return {
            "complete": null,
            loaded: false
        }
    },

    submit: function (e) {
        this.setState({complete: true});

        var outbound_times_data = {};

        var d = String(this.props.days);
        var day_array = d.split(',');
        for (var i = 0; i < day_array.length; i++) {
            outbound_times_data[day_array[i]] = {};
            var day = {};
            day['current_start'] = this.props.current_start;
            day['earliest_start'] = this.props.earliest_start;
            day['latest_start'] = this.props.latest_start;
            outbound_times_data[day_array[i]] = day;
        }

        var homebound_times_data = {};

        for (var i = 0; i < day_array.length; i++) {
            homebound_times_data[day_array[i]] = {};
            var day = {};
            day['current_home'] = this.refs.return_time.getInputDOMNode().value.trim();
            day['earliest_home'] = this.refs.return_early.getInputDOMNode().value.trim();
            day['latest_home'] = this.refs.return_late.getInputDOMNode().value.trim();
            homebound_times_data[day_array[i]] = day;
        }

        var body = {}
        body["start_address"] = this.props.start
        body["end_address"] = this.props.end
        body["transport_method"] = this.props.transport
        body["days"] = String(this.props.days)
        body["homebound_outbound"] = 'outbound'
        body["outbound_times"] = JSON.stringify(outbound_times_data)
        body["homebound_times"] = JSON.stringify(homebound_times_data)

        this.setState(
            {
                outbound_times: outbound_times_data,
                homebound_times: homebound_times_data
            }
        );

        var user = this.props.user;
        var route = user['route'];
        var times = route['times'];
        var days = route['days'];

        var homebound = {};
        for (var i = 0; i < days.length; i++) {
            var day = {};
            day['earliest_start'] = this.refs.return_early.getInputDOMNode().value.trim();
            day['latest_start'] = this.refs.return_late.getInputDOMNode().value.trim();
            day['current_start'] = this.refs.return_time.getInputDOMNode().value.trim();
            day['current_duration'] = this.refs.return_duration.getInputDOMNode().value.trim();

            homebound[days[i]] = day;
        }

        times['homebound'] = homebound;

        this.setState({user: user})

        var http = require("http");
        var url = "http://54.191.104.28:5000/hecate/api/v1.0/route";
        var post_data = body

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: post_data,
            success: this.handleFormSuccess,
            error: this.handleFormFailure
        });
    },

    handleFormSuccess: function (data) {
        this.setState(
            {
                outbound_data: data['outbound_data'],
                homebound_data: data['homebound_data'],
                loaded: true
            }
        )
        this.render()
    },

    handleFormFailure: function () {
        console.log('Got Route Failure');
    },

    render: function () {
        if (this.state.complete) {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                                                            <Panel header={<span>Procesing Route Optimization...</span>}
                                               bsStyle="info"
                                            >

                    <div className="row" id='div' name='div'>
                        <Loader loaded={this.state.loaded}>
                            <Results outbound_data={this.state.outbound_data} homebound_data={this.state.homebound_data}
                                     current_start={this.props.current_start} user={this.state.user}/>
                        </Loader>
                        <br /><br /><br />
                    </div>
                                                                </Panel>
                </div>
            )
        }
        else {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">

                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row home-row">
                                    <div className="col-md-12">
                                        <Panel header={<span>What Time Do you return?</span>}
                                               bsStyle="info"
                                            >
                                            {status}
                                            <Form onValidSubmit={this.submit}>
                                                <ValidatedInput ref="return_time" type="text" name="return_time"
                                                                label="What time do you plan on coming back (24 hour time)?"
                                                                placeholder="16:55"
                                                                validate='required'
                                                                errorHelp={{
                        required: 'Please enter the time you plan on coming back.',
                    }}
                                                    />
                                                <ValidatedInput ref="return_duration" type="text" name="return_duration"
                                                                label="How many minutes do you expect it to take?"
                                                                placeholder="25"
                                                                validate='required'
                                                                errorHelp={{
                        required: 'Please enter how many minutes you expect it to take.',
                    }}
                                                    />
                                                <ValidatedInput ref="return_early" type="text" name="return_early"
                                                                label="When is the earliest you would consider leaving (24 hour time)?"
                                                                placeholder="16:45"
                                                                validate='required'
                                                                errorHelp={{
                        required: 'Please enter the earliest you would consider leaving.',
                    }}
                                                    />
                                                <ValidatedInput ref="return_late" type="text" name="return_late"
                                                                label="When is the latest you would consider leaving (24 hour time)?"
                                                                placeholder="17:15"
                                                                validate='required'
                                                                errorHelp={{
                        required: 'Please enter the latest you would consider leaving.',
                    }}
                                                    />
                                                <ButtonInput
                                                    type='submit'
                                                    bsSize='large'
                                                    bsStyle='primary'
                                                    value='Optimize!'
                                                    />
                                            </Form>

                                        </Panel>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
});

var Results = React.createClass({

    getInitialState: function () {
        return {
            "complete": null
        }
    },

    getIconUrl: function (icon) {
        //icon .pngs placed in github io repo
        return "../../../../common/images/" + icon + ".png";
    },

    buildHTML: function (data, dayName) {
        var html = ""

        if (data != undefined) {
            var day = data[dayName]
            if (day != undefined) {

                var departure_time = day['optimal_time'];
                if (departure_time.indexOf('AM') > -1) {
                    var dep = departure_time.split('AM')[0]
                }
                if (departure_time.indexOf('PM') > -1) {
                    var dep = departure_time.split('PM')[0]
                }
                var dep_time_split = dep.split(':')
                var d = new Date('1900', '01', '01', dep_time_split[0], dep_time_split[1])
                var hours = d.getHours();
                var minutes = d.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var departure = hours + ':' + minutes + ' ' + ampm;

                var duration = Math.round(day['optimal_duration_value'] / 60)
                d.setSeconds(d.getSeconds() + day['optimal_duration_value']);

                var hours = d.getHours();
                var minutes = d.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var arrival = hours + ':' + minutes + ' ' + ampm;

                var weather = day['weather']
                var weather_print = weather['start_address']
                if (weather_print != undefined) {
                    var weather_output = weather_print['weather']

                    var temp = weather_print['temperature']
                    var far = temp['fahrenheit']
                    var max_temp = far['max']
                    var min_temp = far['min']
                }
                else {
                    var weather_output = 'Clear'
                    var max_temp = 0.00
                    var min_temp = 0.00
                }

                html += "<tr>"
                html += "<td width='15%'>" + dayName + "</td>"
                html += "<td width='40%'>"
                html += "<table width='100%'><tbody><tr>" +
                    "<td align='center'><img src='" + require("../../common/images/" + weather_output + ".png") + "' alt='" + weather_output + "' width='50' height='50'></td>" +
                    "<td><table width='80%'><tbody><tr><td><img src='" + require("../../common/images/min.png") + "' />" + min_temp +
                    "</td><td><img src='" + require("../../common/images/max.png") + "' />" + max_temp + "</td></tr></tbody></table></td></tr></tbody></table>"
                html += "</td>"
                html += "<td width='15%'>" + departure + "</td>"
                html += "<td width='15%'>" + duration + " mins</td>"
                html += "<td width='15%'>" + arrival + "</td>"
                html += "</tr>"
            }
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

    submit: function (e) {
        this.setState({complete: true})
    },

    render: function () {
        if (this.state.complete) {
            return (<CreateUser user={this.props.user}/>);
        }
        else {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Panel header={<span>Route Optimization Results...</span>}
                                               bsStyle="info"
                                            >
                                            <div className="home-stats"><br /><br />
                            <span align="center"><Weekly type="Outbound"
                                                         html={this.getDaysHTML(this.props.outbound_data)}
                                                         onClick={this.setDetails}
                                                         details="No"
                                />
                            </span>

                            <span><Weekly type="Homebound"
                                          html={this.getDaysHTML(this.props.homebound_data)}
                                          onClick={this.setDetails}
                                          details="No"
                                /></span>
                                            </div>
                                        </Panel>
                                    </div>
                                </div>
                                <div className="row">
                                    <h3>Is this a commute? Would you like us to monitor this route for you?</h3>
                                    <Button onClick={this.submit}>Yes Please!</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var Main = React.createClass({
    getInitialState: function () {
        return {
            "results": null,
            "splash": true
        };
    },
    setResults: function (results) {
        this.setState({"results": results});
    },
    start: function () {
        this.setState({"splash": false});
    },
    render: function () {
        if (this.state.splash) {
            return (<Splash start={this.start}/>);
        }
        if (this.state.results) {
            return (<Results results={this.state.results}/>);
        } else {
            return (<SignUp setResults={this.setResults}/>);
        }
    }
});

var CreateUser = React.createClass({
    getInitialState: function () {
        return {
            complete: false
        }
    },

    submit: function (e) {
        var user = this.props.user;
        user['username'] = this.refs.email_address.getInputDOMNode().value.trim();
        user['password'] = this.refs.password.getInputDOMNode().value.trim();

        var http = require("http");
        var url = "http://54.191.104.28:5000/hecate/api/v1.0/create_user";
        var post_data = {user: user};

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: JSON.stringify(post_data),
            success: this.handleFormSuccess,
            error: this.handleFormFailure
        });
    },

    handleFormSuccess: function (data) {
        this.setState(
            {
                complete: true
            }
        );
    },

    handleFormFailure: function (data) {
        var response = JSON.parse(data['responseText']);
        this.setState({type: 'warning', message: response['error']});
    },

    render: function () {
        if (this.state.type && this.state.message) {
            var classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">
                ERROR: {this.state.message}
            </div>;
        }

        if (this.state.complete) {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row home-row">
                                    <Panel header={<span>Thankyou - registration successful.</span>}
                                           bsStyle="info"
                                        >
                                        <div className='form-group'>
                                                    <span className='control-label'><b>Congratulations - your route is
                                                        now being monitored!
                                                        Click <a href='/' target='_blank'>here</a> to login
                                                        now.</b></span>
                                        </div>

                                    </Panel>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="login-page">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                            <img src={require("../../common/images/Hecate.png")}/>

                            <h1>Hecate</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                            <div className="conter-wrapper home-container">
                                <div className="row home-row">
                                    <div className="col-md-12">
                                        <Panel header={<span>Please enter your details below to register.</span>}
                                               bsStyle="info"
                                            >
                                            {status}
                                            <Form onValidSubmit={this.submit}>

                                                <ValidatedInput ref="email_address" type="text" name="email_address"
                                                                label="Email Address"
                                                                validate='required,isEmail'
                                                                errorHelp={{
                                                required: 'Please enter your email address.',
                                                isEmail: 'Please enter a valid email address.'
                                            }}
                                                    />

                                                <ValidatedInput ref="password" type="password" name="password"
                                                                label="Password"
                                                                validate='required,isLength:6:60'
                                                                errorHelp={{
                                                required: 'Please enter a password.',
                                                isLength: 'Password must be at least 6 characters.'
                                            }}
                                                    />
                                                <ValidatedInput ref="password-confirm" type="password"
                                                                name="password-confirm"
                                                                label="Re-enter Password"
                                                                validate={(val, context) => val === context.password}
                                                                errorHelp='Passwords do not match.'
                                                    />
                                                <ButtonInput
                                                    type='submit'
                                                    bsSize='large'
                                                    bsStyle='primary'
                                                    value='Register'
                                                    />
                                            </Form>

                                        </Panel>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
});

export default Main;
