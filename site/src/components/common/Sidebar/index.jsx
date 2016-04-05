import React from 'react';
import Router from 'react-router';
import SidebarWidgets from './SidebarWidgets';
import MenuBar from './MenuBar';

var Sidebar = React.createClass({

  render: function(){
    return ( <aside id="sidebar">
        <div className="sidenav-outer">
          <MenuBar></MenuBar>
          <SidebarWidgets user={this.props.user}></SidebarWidgets>
        </div>
      </aside>
    );
  }

});

export default Sidebar;