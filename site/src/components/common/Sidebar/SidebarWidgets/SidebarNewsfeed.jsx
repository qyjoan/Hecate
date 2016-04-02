import React from 'react';
import Router from 'react-router';
import AppStore from '../../../../stores/AppStore';
import Translate from '../../Translate';

var SidebarRecommendationsfeed = React.createClass({

    loadUserFromServer: function () {
        console.log('Recommendations Newsfeed Loading...')
        var self = this;

        // get walking directions from central park to the empire state building
        var http = require("http");
        var url = "http://54.191.104.28:5000/hecate/api/v1.0/recommendationsNews";
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
        console.log('Recommendations Submit Success')
        var data = JSON.parse(data);

        this.setState({
            routes: data
        })
    },

    handleSubmitFailure: function (xhr, ajaxOptions, thrownError) {
        console.log('Error')
    },

    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
        this.loadUserFromServer();
        AppStore.addChangeListener(this._onChange);
        //   $.ajax({
        //     url: "http://rest-service.guides.spring.io/greeting"
        //   }).then(function(data) {
        //       this.setState({
        //           greetingId: data.id,
        //           greetingContent: data.content
        //       });
        // })
    },

    componentWillLeave: function () {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function () {

        var data = this.state.routes
        console.log(data)

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