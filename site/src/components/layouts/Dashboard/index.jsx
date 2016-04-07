import React from "react";
import Router, { Link, RouteHandler } from "react-router";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar, OverlayTrigger,
    Tooltip, DropdownButton, Button, ButtonGroup, Table} from "react-bootstrap";
import $ from "jquery";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Sidebar from '../../common/Sidebar';
import TopNav from '../../common/TopNav';
import Home from '../../pages/dashboard/Home/Home';

var HomePage = React.createClass({

    componentWillMount: function() {
        this.setState({Height: $(window).height()});

        var user_name = sessionStorage.getItem('username');

        if (!user_name) {
            this.props.history.push('/login');
        }
        else {
            this.setState({username: user_name})
        }
    },

    loadUserFromServer: function () {
        var self = this;

        // get walking directions from central park to the empire state building
        var http = require("http");
        var url = "http://54.191.104.28:5000/hecate/api/v1.0/getUser";
        var data = this.state.username //"user7"

        $.ajax({
            type: "GET",
            url: url,
            data: {username: data},
            success: this.handleSubmitSuccess,
            error: this.handleSubmitFailure,
        });

    }, // load from server end

    handleSubmitSuccess: function (data) {
        var user_data = JSON.parse(data);

        // TODO: SET ALL THE USER PARAMETERS HERE
        this.setState({
            user: user_data
        })
    },

    handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
        console.log('Error')
    },

    componentDidMount: function () {
        this.loadUserFromServer();
    },

    componentWillUnmount: function () {

        $(window).unbind('resize', this.adjustResize);

    },

    getInitialState: function () {

        return {
            user: {},
            username: null
        };

    },

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {

        const { pathname } = this.props.location;

        if (this.state.username)
        {
        return (
            <div className="dashboard-page">

                <TopNav user={this.state.user}></TopNav>

                <Sidebar user={this.state.username}></Sidebar>

                <ReactCSSTransitionGroup component="div"
                                         transitionName="ng"
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}

                    >
                    {React.cloneElement(<section id="body-container"
                                                 className="ui-view">{this.props.children}</section> ||
                        <div />, {key: pathname})}
                </ReactCSSTransitionGroup>


            </div>
        );
        }
        else{
            return (
                <div className="dashboard-page" />
        );
        }
    },

    statics: {
        fetchData: function (params) {
        }
    }

});

export default HomePage;
