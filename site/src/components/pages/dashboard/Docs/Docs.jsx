import React from 'react';
import { Link } from "react-router";
import {Well, Panel, Button, DropdownButton, MenuItem, Label, ProgressBar,
    Alert, Tooltip, OverlayTrigger, Popover, Pagination, Accordion, Table,
    Input, ButtonInput} from 'react-bootstrap';
import TodoList from '../../../common/TodoList';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';
import {Pie} from 'react-chartjs';
import C3Chart from "../../../common/ChartElement/C3Chart";

var data1 = [{
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
},
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
];

var options1 = {
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 2,
    percentageInnerCutout: 0,
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false
};

let data = [
    {
        key: "data-1",
        values: [
            {label: "0", value: 30},
            {label: "1", value: 200},
            {label: "2", value: 100},
            {label: "3", value: 400},
            {label: "4", value: 150},
            {label: "5", value: 250}
        ]
    }
];

let options = {
    padding: {
        top: 20,
        bottom: 20,
        left: 40,
        right: 10
    },
    size: {
        width: 450,
        height: 300
    },
    subchart: false,
    zoom: true,
    grid: {
        x: false,
        y: false
    }
};

var Docs = React.createClass({
    getInitialState: function () {
        return {
            activePage: 2,
            showGrowl: false,
            switchState: true
        };
    },

    componentDidMount: function () {
        $(this.refs.calendar).fullCalendar({
            // put your options and callbacks here
        })

    },

    render: function () {
        return (
            <div>
                <pageheader pagename="Panel" subtitle="Bootstrap UI Elements"></pageheader>
                <div className="conter-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="docs-content">
                                <div id="installation">
                                    <h3>Installation</h3>

                                    <div className="subject-content">
                                        To use the Ani React Theme, you need to make sure you have <code>npm</code>
                                        globally installed. Now navigate to your app directory (<code>$ cd
                                        myReactApp/</code>) and run the following terminal commands :
                                        <ul>
                                            <li>
                                                <code>$ npm install</code>
                                            </li>
                                            <li>
                                                <code>$ npm start</code>
                                            </li>
                                        </ul>
                                        You have now succesfully set up Ani React Theme!
                                    </div>
                                </div>

                                <div id="basics">
                                    <h3>Features</h3>

                                    <div className="subject-content">
                                        <div className="subject-content">
                                            Ani is a lightweight and feature rich admin template which is clean and easy
                                            to use.
                                            Current release comes with the following features:
                                            <ul className="features-list">
                                                <li>
                                                    Can be configured in 6 different theme colors
                                                    <br />
                                                    (with a single 'import' statement change e.g. to change from blue to
                                                    red theme, replace this statement in app.jsx
                                                    <ul>
                                                        <li>
                                                            <code>import "./common/styles/app-blue.less";</code>
                                                        </li>
                                                        with this one
                                                        <li>
                                                            <code>import "./common/styles/app-red.less";</code>
                                                        </li>
                                                    </ul>
                                                    Available theme colors are
                                                    <ul>
                                                        <li><i><b>app-blue.less</b></i></li>
                                                        <li><i><b>app-green.less</b></i></li>
                                                        <li><i><b>app-lynch.less</b></i></li>
                                                        <li><i><b>app-midnight-blue.less</b></i></li>
                                                        <li><i><b>app-purple.less</b></i></li>
                                                        <li><i><b>app-red.less</b></i></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    Responsive design based on Bootstrap 3.3.2
                                                </li>
                                                <li>
                                                    Custom elements and plugins including:
                                                    <ul className="features-list-extended">
                                                        <li>
                                                            Pure CSS3 checkbox, radio and On/Off switch elements
                                                        </li>
                                                        <li>
                                                            User Profile
                                                        </li>
                                                        <li>
                                                            Email-template
                                                        </li>
                                                        <li>
                                                            Customizable widgets in different colors and styles
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    Boostrap, React Bootstrap UI and third party plugins and elements
                                                    including:
                                                    <ul className="features-list-extended">
                                                        <li>
                                                            Dynamic Charts
                                                        </li>
                                                        <li>
                                                            Tables
                                                        </li>
                                                        <li>
                                                            Form validation
                                                        </li>
                                                        <li>
                                                            Date Picker
                                                        </li>
                                                        <li>
                                                            DateRange Picker
                                                        </li>
                                                        <li>
                                                            Time Picker
                                                        </li>
                                                        <li>
                                                            Carousel for Gallery
                                                        </li>
                                                        <li>
                                                            Full Calendar
                                                        </li>
                                                        <li>
                                                            Progress Bars
                                                        </li>
                                                        <li>
                                                            Labels and Badges
                                                        </li>
                                                        <li>
                                                            Collapse
                                                        </li>
                                                        <li>
                                                            To-do List
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div id="widgets">
                                    <h3>Widgets</h3>

                                    <div className="subject-content">
                                        The following widgets have been used in Ani React Theme :
                                        <div className="widget-docs">
                                            <Well>
                                                <h4>Panels</h4>
                                                <Panel bsStyle="primary"
                                                       header={<span>Primary Panel</span>}
                                                    >
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                    veniam,
                                                    quis nostrud exercitation.
                                                </Panel>

                                                <div className="widget-docs-code">
												<pre>
													&lt;Panel bsStyle="primary" <br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;header=&#123;&lt;span&gt;Primary Panel&lt;
                                                    /span&gt;&#125;<br />
                                                    &gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;quis nostrud exercitation.<br />
                                                    &lt;/Panel&gt;
												</pre>
                                                </div>
                                            </Well>
                                            <Well>
                                                <h4>Buttons</h4>
                                                <Button bsStyle="success" className="btn-rounded">Success
                                                    Button</Button>

                                                <div className="widget-docs-elements">
												<pre>
													&lt;Button bsStyle="success" className="btn-rounded"&gt;Success Button&lt;
                                                    /Button&gt;
												</pre>
                                                </div>
                                            </Well>
                                            <Well>
                                                <h4>Dropdowns</h4>
                                                <DropdownButton bsStyle="danger" className="btn-rounded"
                                                                title={<span>Button dropdown</span>}
                                                    >
                                                    <MenuItem eventKey="1">Action</MenuItem>
                                                    <MenuItem eventKey="2">Another action</MenuItem>
                                                    <MenuItem eventKey="3">Something else here</MenuItem>
                                                    <MenuItem divider/>
                                                    <MenuItem eventKey="4">Separated link</MenuItem>
                                                </DropdownButton>

                                                <div className="widget-docs-code">
												<pre>
													&lt;DropdownButton bsStyle="danger" className="btn-rounded"<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;title=&#123;&lt;span&gt;Button dropdown&lt;
                                                    /span&gt;&#125;<br />
                                                    &gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;MenuItem eventKey="1"&gt;Action&lt;
                                                    /MenuItem&gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;MenuItem eventKey="2"&gt;
                                                    Another action&lt;/MenuItem&gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;MenuItem eventKey="3"&gt;Something else here&lt;
                                                    /MenuItem&gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;MenuItem divider /&gt;<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;MenuItem eventKey="4"&gt;
                                                    Separated link&lt;/MenuItem&gt;<br />
                                                    &lt;/DropdownButton&gt;<br />
												</pre>
                                                </div>

                                                <Well>
                                                    <h4>Labels</h4>
                                                    <Label bsStyle="info">Label</Label>

                                                    <div className="widget-docs-code">
                                                        <pre>&lt;Label bsStyle="info"&gt;Label&lt;/Label&gt;</pre>
                                                    </div>
                                                </Well>

                                                <Well>
                                                    <h4>Progress Bars</h4>
                                                    <ProgressBar active now={65}/>

                                                    <div className="widget-docs-code">
													<pre>
														&lt;ProgressBar active now=&#123;65&#125; /&gt;
													</pre>
                                                    </div>
                                                </Well>

                                                <Well>
                                                    <h4>Alerts</h4>
                                                    <Alert bsStyle="warning">
                                                        <Button className="close"><span
                                                            aria-hidden="true">×</span></Button>
                                                        My alert message.
                                                    </Alert>

                                                    <div className="widget-docs-code">
													<pre>
														&lt;Alert bsStyle="warning"&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Button className="close"&gt;&lt;span aria-hidden="true"&gt;
                                                        ×&lt;/span&gt;&lt;/Button&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;My alert message.<br />
                                                        &lt;/Alert&gt;
													</pre>
                                                    </div>
                                                </Well>

                                                <Well>
                                                    <h4>Tooltip & Popover</h4>
                                                    <OverlayTrigger placement="left" overlay=<Tooltip>On the
                                                        Left!</Tooltip> >
                                                    <Button>Left Tooltip</Button>
                                                </OverlayTrigger>

                                                <div className="widget-docs-code">
													<pre>
														&lt;OverlayTrigger placement="left" overlay=&lt;Tooltip&gt;On the Left!&lt;
                                                        /Tooltip&gt; &gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Button&gt;Left Tooltip&lt;
                                                        /Button&gt;<br />
                                                        &lt;/OverlayTrigger&gt;
													</pre>
                                                </div>
                                                <OverlayTrigger trigger="click" placement="left"
                                                                overlay={<Popover>To the Left!</Popover>}>
                                                    <Button>Left Popover</Button>
                                                </OverlayTrigger>

                                                <div className="widget-docs-code">
													<pre>
														&lt;
                                                        OverlayTrigger trigger="click" placement="left" overlay=&#123;&lt;
                                                        Popover&gt;To the Left!&lt;/Popover&gt;&#125;&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Button&gt;Left Popover&lt;
                                                        /Button&gt;<br />
                                                        &lt;/OverlayTrigger&gt;
				                  </pre>
                                                </div>
                                                <code>For popovers and tooltips in different replace "left" with
                                                    "top/right/bottom"</code>
                                            </Well>

                                            <Well>
                                                <h4>Pagination</h4>
                                                <Pagination
                                                    first
                                                    last
                                                    activePage={this.state.activePage}
                                                    items={5}
                                                    maxButtons={5}
                                                    bsSize="medium"
                                                    onSelect={this.handleSelect}/>

                                                <div className="widgets-docs-code">
									      	<pre>
									      		&lt;Pagination<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;first<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;last<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;activePage=&#123;this.state.activePage&#125;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;items=&#123;5&#125;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;maxButtons=&#123;5&#125;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;bsSize="medium"<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;onSelect=&#123;this.handleSelect&#125; /&gt;
									      	</pre>
                                                    JavaScript
									      	<pre>
									      		getInitialState: function() &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;return &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activePage: 2<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;;<br />
                                                &#125;<br /><br />
													  handleSelect: function(event, selectedEvent) &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;this.setState(&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activePage: selectedEvent.eventKey<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                                                &#125;
									      	</pre>
                                                </div>
                                            </Well>

                                            <Well>
                                                <h4>Collapse</h4>
                                                <Accordion>
                                                    <Panel header="Click here for Collapse" eventKey="1">
                                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                                                        cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                                                        vice lomo.
                                                    </Panel>
                                                    <Panel header="Click here for Collapse" eventKey="2">
                                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                                                        cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                                                        vice lomo.
                                                    </Panel>
                                                    <Panel header="Click here for Collapse" eventKey="3">
                                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                                                        cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                                                        vice lomo.
                                                    </Panel>
                                                </Accordion>

                                                <div className="widgets-docs-code">
									      	<pre>
									      		&lt;Accordion&gt;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;Panel header="Click here for Collapse" eventKey="1"&gt;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ad vegan excepteur butcher vice lomo.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Panel&gt;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;Panel header="Click here for Collapse" eventKey="2"&gt;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ad vegan excepteur butcher vice lomo.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Panel&gt;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;Panel header="Click here for Collapse" eventKey="3"&gt;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ad vegan excepteur butcher vice lomo.<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Panel&gt;<br />
                                                &lt;/Accordion&gt;
									      	</pre>
                                                </div>
                                            </Well>

                                            <Well>
                                                <h4>Icons</h4>
                                                <i className="fa fa-glass"></i> &nbsp;&nbsp; <i
                                                className="fa fa-bar-chart-o"></i>

                                                <div className="widget-docs-code">
													<pre>
														&lt;i className="fa fa-glass">&lt;/i&gt;<br />
                                                        &lt;i className="fa fa-bar-chart-o"&gt;&lt;/i&gt;
													</pre>
                                                </div>
                                            </Well>

                                            <Well>
                                                <Table bordered>
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>John</td>
                                                        <td>john@gmail.com</td>
                                                        <td>London, UK</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Andy</td>
                                                        <td>andygmail.com</td>
                                                        <td>Merseyside, UK</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Frank</td>
                                                        <td>frank@gmail.com</td>
                                                        <td>Southampton, UK</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>

                                                <div className="widget-docs-code">
													<pre>
														&lt;Table bordered&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;thead&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        th&gt;Name&lt;/th&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        th&gt;Email&lt;/th&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        th&gt;Address&lt;/th&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/thead&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;tbody&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;John&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;john@gmail.com&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;London, UK&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;Andy&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;andygmail.com&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;Merseyside, UK&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;Frank&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;frank@gmail.com&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        td&gt;Southampton, UK&lt;/td&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/tbody&gt;<br />
                                                        &lt;/Table&gt;
													</pre>
                                                </div>
                                                <code>The table classes can be changed using bordered/hover/condensed
                                                    props. </code>
                                            </Well>

                                            <Well>
                                                <h4>Switch</h4>

                                                <div className="widgets-docs-elements">
                                                    <div className="onoffswitch">
                                                        <input type="checkbox" name="onoffswitch"
                                                               className="onoffswitch-checkbox" id="switch3"
                                                               onClick={() => this.setState({switchState : !this.state.switchState})}/>
                                                        <label className="onoffswitch-label" htmlFor="switch3">
                                                            <span className="onoffswitch-inner"></span>
                                                            <span className="onoffswitch-switch"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="widget-docs-code">
													<pre>
														&lt;div className="widgets-docs-elements"&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="onoffswitch"&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="switch3" <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        onClick=&#123;() => this.setState(&#123;switchState : !this.state.switchState&#125;
                                                        )&#125; /&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label className="onoffswitch-label" for="switch3"&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        span className="onoffswitch-inner"&gt;&lt;/span&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                                                        span className="onoffswitch-switch"&gt;&lt;/span&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/label&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                                                        &lt;/div&gt;
													</pre>
                                                </div>
                                            </Well>

                                            <Well>
                                                <h4>Form Elements</h4>

                                                <form>
                                                    <Input type="email" label="Email address" placeholder="Enter email"
                                                           className="underline"/>
                                                    <Input type="password" label="Password" placeholder="Password"
                                                           className="underline"/>
                                                    <Input type="checkbox" label="Remember me"/>
                                                    <ButtonInput value="Submit"/>
                                                </form>
                                                <div className="widget-docs-code">
													<pre>
														&lt;form&gt;<br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Input type="email" label="Email address" placeholder="Enter email" className="underline" /&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Input type="password" label="Password" placeholder="Password" className="underline" /&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;Input type="checkbox" label="Remember me" /&gt;
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;ButtonInput value="Submit" /&gt;
                                                        <br />
                                                        &lt;/form&gt;
													</pre>
                                                </div>
                                            </Well>

                                            <Well>
                                                <h4>To Do List</h4>
                                                <TodoList></TodoList>

                                                <div className="widget-docs-code">
													<pre>
														&lt;TodoList&gt;&lt;/TodoList&gt;
													</pre>
                                                </div>
                                            </Well>
                                        </Well>
                                    </div>
                                </div>
                            </div>

                            <div id="add-widgets">
                                <h3>Plugins</h3>

                                <div className="subject-content">
                                    <Well>
                                        <h4>Calendar</h4>

                                        <div ref='calendar'></div>
                                        <div className="widget-docs-code">
											<pre>
												&lt;div ref='calendar'&gt;&lt;/div&gt;
											</pre>
                                            JavaScript
											<pre>
												componentDidMount: function() &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;$(this.refs.calendar).fullCalendar(&#123;&#125;
                                                );<br />
                                                &#125;
											</pre>
                                        </div>
                                    </Well>

                                    <Well>
                                        <h4>Chart.js Charts</h4>

                                        <div>
                                            <Pie data={data1} options={options1} width="600" height="250"/>
                                        </div>
                                        <div className="widget-docs-code">
											<pre>
												&lt;Pie data=&#123;data1&#125; options=&#123;options1&#125; width="600" height="250"/&gt;
											</pre>
                                            JavaScript
											<pre>
												var data1 = [ &#123; value: 300,	color:"#F7464A", highlight: "#FF5A5E", label: "Red" &#125;
                                                ,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                value: 50, color: "#46BFBD", highlight: "#5AD3D1", label: "Green" &#125;
                                                , <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                value: 100, color: "#FDB45C", highlight: "#FFC870", label: "Yellow" &#125;
                                                ];<br />
												<br />
												var options1 = &#123; segmentShowStroke : true,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                segmentStrokeColor : "#fff",<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                segmentStrokeWidth : 2,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                percentageInnerCutout : 0,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                animationSteps : 100,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                animationEasing : "easeOutBounce",<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                animateRotate : true,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                animateScale : false &#125;;
											</pre>
                                        </div>
                                    </Well>

                                    <Well>
                                        <h4>C3 Charts</h4>
                                        <C3Chart data={data} type={"pie"} options={options} value={2}/>

                                        <div className="widget-docs-code">
											<pre>
												&lt;C3Chart data=&#123;data&#125 type=&#123;"pie"&#125 options=&#123;
                                                options&#125 value=&#123;2&#125 /&gt;
											</pre>
                                            JavaScript
											<pre>
												let data = [&#123; <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;key: "data-1",<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;values: [ &#123;label: "0", value: 30&#125;
                                                ,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                label: "1", value: 30&#125;,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                label: "2", value: 40&#125;,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                label: "3", value: 40&#125;,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                label: "4", value: 20&#125;,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                label: "5", value: 40&#125;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                ]<br />
                                                &#125;];<br />
												<br />
												let options = &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;padding: &#123; top: 20, bottom: 20, left: 40, right: 10 &#125;
                                                ,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;size: &#123; width: 450, height: 300 &#125;
                                                ,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;subchart: false,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;zoom: true,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;grid: &#123; x: false, y: false &#125;<br />
                                                &#125;;<br />
											</pre>
                                        </div>
                                    </Well>

                                    <Well>
                                        <h4>Growl Alerts</h4>
                                        <Button bsStyle="warning" onClick={this.toggleGrowl} name="Warning">Warning
                                            Growl</Button>
                                        <growl-notifications>
                                            <growl-notification class="growl-warning"
                                                                style={ {display: this.state.showGrowl?'':'none'} }>
                                                Warning Notification
                                            </growl-notification>
                                        </growl-notifications>
                                        <div className="widget-docs-code">
											<pre>
												&lt;Button bsStyle="warning" onClick=&#123;this.toggleGrowl&#125;
                                                name="Warning">Warning Growl&lt;/Button&gt; <br />
                                                &lt;growl-notifications&gt;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;growl-notification class="growl-warning" style=&#123; &#123;
                                                display: this.state.showGrowl?'':'none'&#125; &#125;&gt;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                Warning Notification<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/growl-notification&gt;<br />
                                                &lt;/growl-notifications&gt;
											</pre>
                                            JavaScript
											<pre>
												getInitialState: function() &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;return &#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showGrowl: false<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;;<br />
                                                &#125;<br />
												<br />
												toggleGrowl: function()&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;var that = this;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;this.setState(&#123;showGrowl: !this.state.showGrowl&#125;
                                                );<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function()&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that.setState(&#123;
                                                showGrowl: false&#125;);<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,5000)<br />
                                                &#125;
											</pre>
                                        </div>
                                    </Well>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
        ;
    },

    handleSelect: function (event, selectedEvent) {
        this.setState({
            activePage: selectedEvent.eventKey
        });
    },

    toggleGrowl: function () {
        var that = this;
        this.setState({showGrowl: !this.state.showGrowl});
        setTimeout(function () {
            that.setState({showGrowl: false});
        }, 5000)
    }

});

export default Docs;