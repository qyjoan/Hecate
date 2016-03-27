import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
var ReactDOM = require('react-dom');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var RTabs = React.createClass({
    handleSelect: function (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },

    render: function () {
        return (

            <Tabs onSelect={this.handleSelect}>

                <TabList>
                    <Tab>Foo</Tab>
                    <Tab>Bar</Tab>
                    <Tab>Baz</Tab>
                </TabList>

                <TabPanel>
                    <h2>Hello from Foo</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Hello from Bar</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Hello from Baz</h2>
                </TabPanel>
            </Tabs>

        );
    }

});

export default RTabs;