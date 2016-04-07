import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';

var SidebarProfile = React.createClass({

  getInitialState: function(){
    return {};
  },

  render: function(){
    return ( <div className="text-center">
        <img src={require("../../../../common/images/flat-avatar.png")} className="user-avatar" />
        <div className="text-center avatar-name">{this.props.user}
        </div>
      </div>
    );
  }

});

export default SidebarProfile;