var React = require('react');
var ReactDOM = require('react-dom');
var request = require('browser-request');
var urls = require('./urls');

var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Well = require('react-bootstrap').Well;


var SignUp = React.createClass({
    submit: function(e) {
        e.preventDefault();
        console.log(this.props.setResults);
        // TODO: Fix body
        console.log(this.refs.home.getValue().trim());
        var options = {
            "method": "POST",
            "url": urls.ROUTE,
            "body": {
                start_address: this.refs.home.getValue().trim(),
                end_address: this.refs.work.getValue().trim(),
                transport_method: this.refs.mode.getValue().trim(),
                date: this.refs.date.getValue().trim(),

                current_start: this.refs.leave_time.getValue().trim(),
                leave_duration: this.refs.leave_duration.getValue().trim(),
                earliest_start: this.refs.leave_early.getValue().trim(),
                leave_late: this.refs.leave_late.getValue().trim(),

                return_time: this.refs.return_time.getValue().trim(),
                return_duration: this.refs.return_duration.getValue().trim(),
                return_early: this.refs.return_early.getValue().trim(),
                return_late: this.refs.return_late.getValue().trim()
            },
            "json": true
        };
        request(options, function(er, response, body) {
            if (er) {
                console.log(er)
            } else {
                this.props.setResults(body);
            }
        }.bind(this));
    },
    render: function() {
        return (
            <Well>
                <form>
                    <Input ref="home" type="text" label="Where are leaving from?" placeholder="1600 Amphitheatre Pkwy, Mountain View, CA 94043" />
                    <Input ref="work" type="text" label="Where are going?" placeholder="1401 N Shoreline Blvd, Mountain View, CA 94043" />
                    <Input ref="mode" type="select" label="What is your mode of transport?" placeholder="select">
                        <option value="car">Personal Vehicle</option>
                        <option value="share">Ride Share</option>
                        <option value="bike">Bike</option>
                        <option value="public">Public Transit</option>
                        <option value="walk">Walking</option>
                    </Input>
                    <Input ref="date" type="text" label="What day do you plan on traveling?" placeholder="03/18/2016" />
                    <Input ref="leave_time" type="text" label="What time do you plan on leaving?" placeholder="7:55am" />
                    <Input ref="leave_duration" type="text" label="How many minutes do you expect it to take?" placeholder="30" />
                    <Input ref="leave_early" type="text" label="When is the earliest you would consider leaving?" placeholder="7:00am" />
                    <Input ref="leave_late" type="text" label="When is the latest you would consider leaving?" placeholder="8:15am" />

                    <Input ref="return_time" type="text" label="What time do you plan on coming back?" placeholder="4:55pm" />
                    <Input ref="return_duration" type="text" label="How many minutes do you expect it to take?" placeholder="35" />
                    <Input ref="return_early" type="text" label="When is the earliest you would consider leaving?" placeholder="4:45pm" />
                    <Input ref="return_late" type="text" label="When is the latest you would consider leaving?" placeholder="5:15pm" />
                    <ButtonInput onClick={this.submit} type="submit" value="Optimize!" />
                </form>
            </Well>
        );

    }
});

var Results = React.createClass({
    getInitialState: function() {
        return {
            "leaveIDX": 0,
            "returnIDX": 0
        }
    },
    render: function() {
        var saveLoseLeave = this.props.results.leave_savings[this.state.leaveIDX] < 0 ? "save" : "lose";
        var saveLoseReturn = this.props.results.leave_savings[this.state.returnIDX] < 0 ? "save" : "lose";
        return (
            <Well>
                <p>By leaving at {this.props.results.leave_times[0]} you could {saveLoseLeave} {this.props.results.leave_savings[0]}</p>
                <p>By returning at {this.props.results.return_times[0]} you could {saveLoseReturn} {this.props.results.return_savings[0]}</p>
                <p></p>
                <p>Is this a commute? Would you like us to monitor this route for you?</p>
            </Well>
        );
    }

});



var Main = React.createClass({
    getInitialState: function() {
        return {
            "results": null
        };
    },
    setResults: function(results) {
        this.setState({"results": results});
    },
    render: function() {
        if (this.state.results) {
            return (<Results results={this.state.results} />);
        } else {
            return (<SignUp setResults={this.setResults} />);
        }
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById("content")
);