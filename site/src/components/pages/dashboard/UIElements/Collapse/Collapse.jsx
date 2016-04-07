import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Collapse = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Collapse & Tabs" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">
				    <div className="row">
				        <div className="col-md-6">
				            <div className="panel panel-primary">
				                <div className="panel-heading">
				                    <h3 className="panel-title">Collapse</h3>
				                </div>
				                <div className="panel-body">
				                    <accordion>
				                        <accordion-group heading="Click here for Collapse" is-open="true">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                        <accordion-group heading="Click here for Collapse">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                        <accordion-group heading="Click here for Collapse">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                    </accordion> 
				                </div>
				            </div>
				        </div>      
				        <div className="col-md-6">
				            <div className="panel panel-default">
				                <div className="panel-heading">
				                    <h3 className="panel-title">Collapse</h3>
				                </div>
				                <div className="panel-body">
				                    <accordion close-others="false">
				                        <accordion-group className="panel-primary" heading="Click here for Collapse" is-open="true">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                        <accordion-group className="panel-primary" heading="Click here for Collapse">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                        <accordion-group className="panel-primary" heading="Click here for Collapse">
				                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
				                        </accordion-group>
				                    </accordion> 
				                </div>
				            </div>
				        </div>
				    </div>
				    <div className="row">
				        <div className="col-md-6">
				            <div className="panel panel-primary">
				                <div className="panel-heading">
				                    <h3 className="panel-title">Tabs</h3>
				                </div>
				                <div className="panel-body">
				                    <div ng-controller="TabsDemoCtrl">
				                        <tabset>
				                            <tab>
				                                <tab-heading><i className="fa fa-home"></i> Home</tab-heading>
				                                <div className="t-p">
				                                    loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis laborum commodi, placeat voluptates quisquam accusantium corporis ipsa, distinctio, consequuntur explicabo aliquid illo doloremque. Ut, nam, cum saepe repellat cumque eaque... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda dolore unde, eos. Fugit aut officiis, et modi debitis, eum, qui praesentium ducimus dolores perferendis aliquam temporibus! Velit, tenetur, corporis?
				                                </div>
				                            </tab>
				                            <tab ng-repeat="tab in tabs" heading="tab.title" active="tab.active" disabled="tab.disabled">
				                                <div className="t-p">tab.content</div>
				                            </tab>
				                            <tab select="alertMe()">
				                                <tab-heading>
				                                    <i className="glyphicon glyphicon-bell"></i> Alert!
				                                </tab-heading>
				                                <div className="t-p">
				                                    I've got an HTML heading, and a select callback. 
				                                    Pretty cool!
				                                </div>
				                            </tab>
				                        </tabset>
				                    </div>
				                </div>
				            </div>
				        </div>
				        <div className="col-md-6">
				            <div className="panel panel-default">
				                <div className="panel-heading">
				                    <h3 className="panel-title">Tabs</h3>
				                </div>
				                <div className="panel-body">
				                    <div ng-controller="TabsDemoCtrl">
				                        <tabset className="primary-tabs">
				                            <tab>
				                                <tab-heading><i className="fa fa-home"></i> Home</tab-heading>
				                                <div className="t-p">
				                                    loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis laborum commodi, placeat voluptates quisquam accusantium corporis ipsa, distinctio, consequuntur explicabo aliquid illo doloremque. Ut, nam, cum saepe repellat cumque eaque... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda dolore unde, eos. Fugit aut officiis, et modi debitis, eum, qui praesentium ducimus dolores perferendis aliquam temporibus! Velit, tenetur, corporis?
				                                </div>
				                            </tab>
				                            <tab ng-repeat="tab in tabs" heading="tab.title" active="tab.active" disabled="tab.disabled">
				                                <div className="t-p">tab.content</div>
				                            </tab>
				                            <tab select="alertMe()">
				                                <tab-heading>
				                                    <i className="glyphicon glyphicon-bell"></i> Alert!
				                                </tab-heading>
				                                <div className="t-p">
				                                    I've got an HTML heading, and a select callback. 
				                                    Pretty cool!
				                                </div>
				                            </tab>
				                        </tabset>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				</div>

      </div>
      
    );
  }

});

export default Collapse;