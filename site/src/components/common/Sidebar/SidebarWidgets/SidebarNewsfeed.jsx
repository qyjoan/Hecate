import React from 'react';
import Router from 'react-router';
import AppStore from '../../../../stores/AppStore';
import Translate from '../../Translate';

var SidebarNewsfeed = React.createClass({

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
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

  componentWillLeave: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
  
    return ( <div className="news-feed">
        <div className="feed-header">RECOMMENDATION HISTORY</div>
        <div className="feed-content">
          <ul className="feed">
            <li>
              <a href="">Updated Time - Monday. Possible time saving of 5 minutes!</a> <span className="feed-date">25/4/2015</span>
            </li>
            <li>
              <a href="">Updated Time - Wednesday. Possible time saving of 15 minutes!</a> <span className="feed-date">25/4/2015</span>
            </li>
          </ul>
        </div>
      </div> 
    );
  },

  _onChange: function(){
    this.setState({language: AppStore.getLanguage()});
  }

});

export default SidebarNewsfeed;