import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';
import AppStore from '../../../../stores/AppStore';

var SidebarRecommendationsfeed = React.createClass({
    mixins: [History],

    getInitialState: function () {

        return {
            routes: null
        };

    },

    loadUserFromServer: function () {
        var http = require("http");
        var url = "http://54.191.104.28:5000/hecate/api/v1.0/recommendationsNews";
        var data = this.props.user; //"user7"

        $.ajax({
            type: "GET",
            url: url,
            data: {username: data},
            success: this.handleSubmitSuccess,
            error: this.handleSubmitFailure,
        });

    }, // load from server end

    handleSubmitSuccess: function (data) {
        var data = JSON.parse(data);

        this.setState({
            routes: data
        })
    },

    handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
        console.log('Error')
    },

    componentDidMount: function () {
        this.loadUserFromServer();
        AppStore.addChangeListener(this._onChange);
    },

    componentWillLeave: function () {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function () {

        var data = null
        if (this.state.routes) {
            data = this.state.routes
        }

            return ( <div className="news-feed">
                    <div className="feed-header">RECOMMENDATION HISTORY</div>
                    <div className="feed-content">
                        <ul className="feed" dangerouslySetInnerHTML={{__html: data}}>
                        </ul>
                    </div>
                </div>
            );
    },

    _onChange: function () {
        this.setState({language: AppStore.getLanguage()});
    }

});

export default SidebarRecommendationsfeed;