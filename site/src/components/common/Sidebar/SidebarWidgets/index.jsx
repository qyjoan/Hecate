import React from 'react';
import Router from 'react-router';
import SidebarCalendar from './SidebarCalendar';
import SidebarRecommendationsfeed from './SidebarNewsfeed';
import SidebarProfile from './SidebarProfile';

var SidebarWidgets = React.createClass({

    getInitialState: function () {
        return {};
    },

    render: function () {

        return ( <div className="side-widgets">
                <div className="widgets-content">
                    <SidebarProfile user={this.props.user} />
                    <SidebarRecommendationsfeed user={this.props.user}/>
                </div>
            </div>
        );
    }

});

export default SidebarWidgets;