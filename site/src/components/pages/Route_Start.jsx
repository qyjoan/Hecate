import React from 'react';
import { Link } from "react-router";
import {Panel, Input, Row} from 'react-bootstrap';
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Well = require('react-bootstrap').Well;
import { Form, ValidatedInput } from 'react-bootstrap-validation';

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
            <Well>
                <h1>Welcome to Hecate!</h1>

                <h3>Let us optimize your route</h3>
                <Button onClick={this.props.start}>Yes Please!</Button>
            </Well>
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
        this.setState(
            {
                signup: true,
                start_address: this.refs.home.getInputDOMNode().value.trim(),
                end_address: this.refs.work.getInputDOMNode().value.trim(),
                transport_method: this.refs.mode.getInputDOMNode().value.trim()
            }
        )
    },

    _handleInvalidSubmit(errors, values) {
        // Errors is an array containing input names
        // that failed to validate
    },

    render: function () {
        if (this.state.signup) {
            return (<SignUpPhase2 start={this.state.start_address} end={this.state.end_address}
                                  transport={this.state.transport_method}
                    />)
        }
        else {
            return (
                <div>
                    <pageheader id="heading" pagename="Form" subtitle="Enter Route"></pageheader>
                    <div className="conter-wrapper home-container">
                        <div className="row home-row">
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
    },
    render: function () {
        if (this.state.signup) {
            return (<SignUpPhase3 start={this.props.start} end={this.props.end}
                                  transport={this.props.transport} days={this.state.route_days}
                                  current_start={this.refs.leave_time.getInputDOMNode().value.trim()}
                                  earliest_start={this.refs.leave_time.getInputDOMNode().value.trim()}
                                  latest_start={this.refs.leave_late.getInputDOMNode().value.trim()}
                />)
        }
        else {

            return (
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

                                        <ValidatedInput
                                            type='text'
                                            label='Where are you going?'
                                            name='work'
                                            ref='work'
                                            validate='required'
                                            errorHelp={{
                                                required: 'Please enter where you are going',
                                            }}
                                               placeholder="1401 N Shoreline Blvd, Mountain View, CA 94043"
                                            />
                                        <ValidatedInput ref="leave_time" type="text" name="leave_time"
                                               label="What time do you plan on leaving?"
                                               placeholder="7:55am"
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
                                               label="When is the earliest you would consider leaving?"
                                               placeholder="7:00am"
                                            validate='required'
                                            errorHelp={{
                                                required: 'Please enter the earliest you would consider leaving.',
                                            }}
                                            />
                                        <ValidatedInput ref="leave_late" type="text" name="leave_late"
                                               label="When is the latest you would consider leaving?"
                                               placeholder="8:15am"
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

                                </Panel>
                            </div>
                        </div>

                    </div>

                </div>
            );
        }
    }
});

var SignUpPhase3 = React.createClass({
    submit: function (e) {
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
        body["days"] = this.props.days
        body["homebound_outbound"] = 'outbound'
        body["outbound_times"] = outbound_times_data
        body["homebound_times"] = homebound_times_data
        console.log(body)

        var options = {
            method: "POST",
            url: "http://test.com",
            "body": body,
            "json": true
        };

        request(options, function (er, response, body) {
            if (er) {
                console.log(er)
            } else {
                console.log(body);
                this.props.setResults(body);
            }
        }.bind(this));
    },
    render: function () {
        return (
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
                                           label="What time do you plan on coming back?"
                                           placeholder="4:55pm"
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
                                           label="When is the earliest you would consider leaving?"
                                           placeholder="4:45pm"
                                        validate='required'
                                        errorHelp={{
                                            required: 'Please enter the earliest you would consider leaving.',
                                        }}
                                        />
                                    <ValidatedInput ref="return_late" type="text" name="return_late"
                                           label="When is the latest you would consider leaving?"
                                           placeholder="5:15pm"
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
        );
    }
});

var Results = React.createClass({
    getInitialState: function () {
        return {
            "leaveIDX": 0,
            "returnIDX": 0
        }
    },
    render: function () {
        var saveLoseLeave = this.props.results.leave_savings[this.state.leaveIDX] < 0 ? "save" : "lose";
        var saveLoseReturn = this.props.results.leave_savings[this.state.returnIDX] < 0 ? "save" : "lose";
        return (

            <Well>
                <p>By leaving at {this.props.results.leave_times[0]} you
                    could {saveLoseLeave} {this.props.results.leave_savings[0]}</p>

                <p>By returning at {this.props.results.return_times[0]} you
                    could {saveLoseReturn} {this.props.results.return_savings[0]}</p>

                <p></p>

                <p>Is this a commute? Would you like us to monitor this route for you?</p>
            </Well>
        );
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

export default Main;
