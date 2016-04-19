import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import classNames from "classnames";
import AppStore from '../../../stores/AppStore';
import Translate from '../Translate';

var MenuBar = React.createClass({

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
  },

  componentWillLeave: function() {
    AppStore.removeChangeListener(this._onChange);
  },
  
  hideMenu: function(){
    console.log('hiding menu')
    $('.dashboard-page').toggleClass('push-right');   
  },

  render: function(){
  
    return (
      <div className="side-menu">
        <div className="menu-body">
          <ul className="nav nav-pills nav-stacked sidenav" onClick={() => this.hideMenu()}>
            <li className={classNames({'active': this.state.home})}>
              <Link to="/dashboard/home">
                <span className="glyphicon glyphicon-home"></span>
              </Link>
              <ul className="nested-dropdown animated fadeIn">
                <li><Link to="/dashboard/home">{Translate.getWord('dashboard')}</Link></li>
              </ul>
            </li>
            <li className={classNames({'active': this.state.userInterface})}>
              <Link to="/dashboard/buttons">
                <span className="glyphicon glyphicon-cloud-download"></span>
              </Link>
              <ul className="nested-dropdown animated fadeIn">
                <li className="sidemenu-header">My Route</li>
                <li><Link to="/dashboard/route">Manage Route</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    );
      
  },

  _onChange: function(){

    this.setState({
      language: AppStore.getLanguage()
    });

  }

});

export default MenuBar;