import React from 'react';
import { Link } from "react-router";
import {Panel, Input, ButtonInput, Row, Col} from 'react-bootstrap';
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Route = React.createClass({
        handleSelect: function (index, last) {
            console.log('Selected tab: ' + index + ', Last tab: ' + last);
        },

        loadUserFromServer: function () {
            console.log('Route Loading')
            var self = this;

            // get walking directions from central park to the empire state building
            var http = require("http");
            var url = "http://54.191.104.28:5000/hecate/api/v1.0/getUser";
            var data = "user7"

            $.ajax({
                type: "GET",
                url: url,
                data: {username: data},
                success: this.handleSubmitSuccess,
                error: this.handleSubmitFailure,
            });

        }, // load from server end

        handleSubmitSuccess: function (data) {
            console.log('Submit Success')
            console.log(data)
            var user_data = JSON.parse(data);

            // TODO: SET ALL THE USER PARAMETERS HERE
            this.setState({
                user: user_data,
            })
        },

        handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
            console.log('Error')
        },

        getInitialState: function () {
            return {
                user: {}
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

            this.loadUserFromServer();
        },

        componentWillLeave: function () {
            AppStore.removeChangeListener(this._onChange);
        },

        render: function () {
            var route = this.state.user['route']
            if (route == undefined) {
                route = {};
                var start = '';
                var end = '';
            }
            else {
                if (route['transportation'] == 'driving') {
                    var driving = "selected"
                }
                if (route['transportation'] == 'bycling') {
                    var bycling = "selected"
                }
                if (route['transportation'] == 'transit') {
                    var transit = "selected"
                }
                if (route['transportation'] == 'walking') {
                    var walking = "selected"
                }
                var address = route['address'];
                var start_location = address['start_location'];
                var start = start_location['formatted_address'];
                var end_location = address['end_location'];
                var end = end_location['formatted_address'];
                var days = ''
                var first = true
                route['days'].forEach(function (s) {
                    if (first == true) {
                        days = s
                        first = false
                    }
                    else {
                        days = days + ', ' + s
                    }
                });
                if (days.indexOf('Monday') != -1) {
                    var monday = "selected"
                    var monday_outbound_current = route['times']['outbound']['Monday']['current_start']
                    var monday_outbound_earliest = route['times']['outbound']['Monday']['earliest_start']
                    var monday_outbound_duration = route['times']['outbound']['Monday']['current_duration']
                    var monday_outbound_latest = route['times']['outbound']['Monday']['latest_start']
                    var monday_homebound_current = route['times']['homebound']['Monday']['current_start']
                    var monday_homebound_earliest = route['times']['homebound']['Monday']['earliest_start']
                    var monday_homebound_duration = route['times']['homebound']['Monday']['current_duration']
                    var monday_homebound_latest = route['times']['homebound']['Monday']['latest_start']
                }
                if (days.indexOf('Tuesday') != -1) {
                    var tuesday = "selected"
                    var tuesday_outbound_current = route['times']['outbound']['Tuesday']['current_start']
                    var tuesday_outbound_earliest = route['times']['outbound']['Tuesday']['earliest_start']
                    var tuesday_outbound_duration = route['times']['outbound']['Tuesday']['current_duration']
                    var tuesday_outbound_latest = route['times']['outbound']['Tuesday']['latest_start']
                    var tuesday_homebound_current = route['times']['homebound']['Tuesday']['current_start']
                    var tuesday_homebound_earliest = route['times']['homebound']['Tuesday']['earliest_start']
                    var tuesday_homebound_duration = route['times']['homebound']['Tuesday']['current_duration']
                    var tuesday_homebound_latest = route['times']['homebound']['Tuesday']['latest_start']
                }
                if (days.indexOf('Wednesday') != -1) {
                    var wednesday = "selected"
                    var wednesday_outbound_current = route['times']['outbound']['Wednesday']['current_start']
                    var wednesday_outbound_earliest = route['times']['outbound']['Wednesday']['earliest_start']
                    var wednesday_outbound_duration = route['times']['outbound']['Wednesday']['current_duration']
                    var wednesday_outbound_latest = route['times']['outbound']['Wednesday']['latest_start']
                    var wednesday_homebound_current = route['times']['homebound']['Wednesday']['current_start']
                    var wednesday_homebound_earliest = route['times']['homebound']['Wednesday']['earliest_start']
                    var wednesday_homebound_duration = route['times']['homebound']['Wednesday']['current_duration']
                    var wednesday_homebound_latest = route['times']['homebound']['Wednesday']['latest_start']
                }
                if (days.indexOf('Thursday') != -1) {
                    var thursday = "selected"
                    var thursday_outbound_current = route['times']['outbound']['Thursday']['current_start']
                    var thursday_outbound_earliest = route['times']['outbound']['Thursday']['earliest_start']
                    var thursday_outbound_duration = route['times']['outbound']['Thursday']['current_duration']
                    var thursday_outbound_latest = route['times']['outbound']['Thursday']['latest_start']
                    var thursday_homebound_current = route['times']['homebound']['Thursday']['current_start']
                    var thursday_homebound_earliest = route['times']['homebound']['Thursday']['earliest_start']
                    var thursday_homebound_duration = route['times']['homebound']['Thursday']['current_duration']
                    var thursday_homebound_latest = route['times']['homebound']['Thursday']['latest_start']
                }
                if (days.indexOf('Friday') != -1) {
                    var friday = "selected"
                    var friday_outbound_current = route['times']['outbound']['Friday']['current_start']
                    var friday_outbound_earliest = route['times']['outbound']['Friday']['earliest_start']
                    var friday_outbound_duration = route['times']['outbound']['Friday']['current_duration']
                    var friday_outbound_latest = route['times']['outbound']['Friday']['latest_start']
                    var friday_homebound_current = route['times']['homebound']['Friday']['current_start']
                    var friday_homebound_earliest = route['times']['homebound']['Friday']['earliest_start']
                    var friday_homebound_duration = route['times']['homebound']['Friday']['current_duration']
                    var friday_homebound_latest = route['times']['homebound']['Friday']['latest_start']
                }
                if (days.indexOf('Saturday') != -1) {
                    var saturday = "selected"
                    var saturday_outbound_current = route['times']['outbound']['Saturday']['current_start']
                    var saturday_outbound_earliest = route['times']['outbound']['Saturday']['earliest_start']
                    var saturday_outbound_duration = route['times']['outbound']['Saturday']['current_duration']
                    var saturday_outbound_latest = route['times']['outbound']['Saturday']['latest_start']
                    var saturday_homebound_current = route['times']['homebound']['Saturday']['current_start']
                    var saturday_homebound_earliest = route['times']['homebound']['Saturday']['earliest_start']
                    var saturday_homebound_duration = route['times']['homebound']['Saturday']['current_duration']
                    var saturday_homebound_latest = route['times']['homebound']['Saturday']['latest_start']
                }
                if (days.indexOf('Sunday') != -1) {
                    var sunday = "selected"
                    var sunday_outbound_current = route['times']['outbound']['Sunday']['current_start']
                    var sunday_outbound_earliest = route['times']['outbound']['Sunday']['earliest_start']
                    var sunday_outbound_duration = route['times']['outbound']['Sunday']['current_duration']
                    var sunday_outbound_latest = route['times']['outbound']['Sunday']['latest_start']
                    var sunday_homebound_current = route['times']['homebound']['Sunday']['current_start']
                    var sunday_homebound_earliest = route['times']['homebound']['Sunday']['earliest_start']
                    var sunday_homebound_duration = route['times']['homebound']['Sunday']['current_duration']
                    var sunday_homebound_latest = route['times']['homebound']['Sunday']['latest_start']
                }
            }
            return (
                <div>
                    <pageheader pagename="Form" subtitle="Edit Route"></pageheader>

                    <div className="conter-wrapper" ng-animate=" 'animate' ">
                        <div className="row">
                            <div className="col-md-12">
                                <Panel header={<span>Edit Route</span>}
                                       bsStyle="info"
                                    >
                                    <form className="form-horizontal">
                                        <Input ref="home" type="text" label="Where are leaving from?" value={start}/>
                                        <Input ref="work" type="text" label="Where are going?"
                                               value={end}/>
                                        <Input ref="mode" type="select" label="What is your mode of transport?"
                                               placeholder="select">
                                            <option value="driving" selected={driving}>Driving</option>
                                            <option value="bycling" selected={bycling}>Bike</option>
                                            <option value="transit" selected={transit}>Public Transit</option>
                                            <option value="walking" selected={walking}>Walking</option>
                                        </Input>
                                        <Input ref="days" type="select"
                                               label="What days of the week? (shift/control click to select all that apply)"
                                               multiple>
                                            <option value="Monday" selected={monday}>Monday</option>
                                            <option value="Tuesday" selected={tuesday}>Tuesday</option>
                                            <option value="Wednesday" selected={wednesday}>Wednesday</option>
                                            <option value="Thursday" selected={thursday}>Thursday</option>
                                            <option value="Friday" selected={friday}>Friday</option>
                                            <option value="Saturday" selected={saturday}>Saturday</option>
                                            <option value="Sunday" selected={sunday}>Sunday</option>
                                        </Input>

                                        <Tabs onSelect={this.handleSelect}>

                                            <TabList>
                                                <Tab>Monday</Tab>
                                                <Tab>Tuesday</Tab>
                                                <Tab>Wednesday</Tab>
                                                <Tab>Thursday</Tab>
                                                <Tab>Friday</Tab>
                                                <Tab>Saturday</Tab>
                                                <Tab>Sunday</Tab>
                                            </TabList>
                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="monday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={monday_outbound_current}/>
                                                <Input ref="monday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={monday_outbound_duration}/>
                                                <Input ref="monday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={monday_outbound_earliest}/>
                                                <Input ref="monday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={monday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="monday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={monday_homebound_current}/>
                                                <Input ref="monday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={monday_homebound_duration}/>
                                                <Input ref="monday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={monday_homebound_earliest}/>
                                                <Input ref="monday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={monday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="tuesday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={tuesday_outbound_current}/>
                                                <Input ref="tuesday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={tuesday_outbound_duration}/>
                                                <Input ref="tuesday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={tuesday_outbound_earliest}/>
                                                <Input ref="tuesday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={tuesday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="tuesday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={tuesday_homebound_current}/>
                                                <Input ref="tuesday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={tuesday_homebound_duration}/>
                                                <Input ref="tuesday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={tuesday_homebound_earliest}/>
                                                <Input ref="tuesday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={tuesday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="wednesday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={wednesday_outbound_current}/>
                                                <Input ref="wednesday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={wednesday_outbound_duration}/>
                                                <Input ref="wednesday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={wednesday_outbound_earliest}/>
                                                <Input ref="wednesday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={wednesday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="wednesday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={wednesday_homebound_current}/>
                                                <Input ref="wednesday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={wednesday_homebound_duration}/>
                                                <Input ref="wednesday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={wednesday_homebound_earliest}/>
                                                <Input ref="wednesday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={wednesday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="thursday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={thursday_outbound_current}/>
                                                <Input ref="thursday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={thursday_outbound_duration}/>
                                                <Input ref="thursday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={thursday_outbound_earliest}/>
                                                <Input ref="thursday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={thursday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="thursday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={thursday_homebound_current}/>
                                                <Input ref="thursday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={thursday_homebound_duration}/>
                                                <Input ref="thursday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={thursday_homebound_earliest}/>
                                                <Input ref="thursday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={thursday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="friday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={friday_outbound_current}/>
                                                <Input ref="friday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={friday_outbound_duration}/>
                                                <Input ref="friday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={friday_outbound_earliest}/>
                                                <Input ref="friday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={friday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="friday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={friday_homebound_current}/>
                                                <Input ref="friday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={friday_homebound_duration}/>
                                                <Input ref="friday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={friday_homebound_earliest}/>
                                                <Input ref="friday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={friday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="saturday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={saturday_outbound_current}/>
                                                <Input ref="saturday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={saturday_outbound_duration}/>
                                                <Input ref="saturday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={saturday_outbound_earliest}/>
                                                <Input ref="saturday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={saturday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="saturday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={saturday_homebound_current}/>
                                                <Input ref="saturday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={saturday_homebound_duration}/>
                                                <Input ref="saturday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={saturday_homebound_earliest}/>
                                                <Input ref="saturday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={saturday_homebound_latest}/>
                                            </TabPanel>

                                            <TabPanel>
                                                <b>When travelling from {start} to {end}:</b><br/><br/>
                                                <Input ref="sunday_leave_time" type="text"
                                                       label="What time do you plan on leaving?"
                                                       value={sunday_outbound_current}/>
                                                <Input ref="sunday_leave_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={sunday_outbound_duration}/>
                                                <Input ref="sunday_leave_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={sunday_outbound_earliest}/>
                                                <Input ref="sunday_leave_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={sunday_outbound_latest}/>

                                                <br/><br/><b>When travelling from {end} to {start}:</b><br /><br />

                                                <Input ref="sunday_return_time" type="text"
                                                       label="What time do you plan on coming back?"
                                                       value={sunday_homebound_current}/>
                                                <Input ref="sunday_return_duration" type="text"
                                                       label="How many minutes do you expect it to take?"
                                                       value={sunday_homebound_duration}/>
                                                <Input ref="sunday_return_early" type="text"
                                                       label="When is the earliest you would consider leaving?"
                                                       value={sunday_homebound_earliest}/>
                                                <Input ref="sunday_return_late" type="text"
                                                       label="When is the latest you would consider leaving?"
                                                       value={sunday_homebound_latest}/>
                                            </TabPanel>

                                        </Tabs>
                                        <ButtonInput
                                            value="Submit"
                                            wrapperClassName="col-xs-offset-5"/>
                                    </form>
                                </Panel>
                            </div>
                        </div>

                    </div>

                    <div>
                        <Tabs/>

                    </div>
                </div>

            );
        },

  _onChange: function() {

      this.setState({
          language: AppStore.getLanguage()
      })
  }

    })
    ;

export default Route;
