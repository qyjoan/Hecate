import React from 'react';
import { Link } from "react-router";
import {Panel, Input, FormControls, Row, Col, Button} from 'react-bootstrap';

var Components = React.createClass({

	getInitialState: function(){
    
    return {
    	switchState: true
    };

  },

  render: function() {
    return (

      <div>

	      <pageheader pagename="Form Components" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">				
					<div className="row">
						<div className="col-md-12">

							<Panel header={<span>Components</span>}
								bsStyle="primary"
							>
								<form className="form-horizontal">
									<Input type="text" label="Normal" placeholder="" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
									<hr />
									<Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
									<hr />
									<Input type="text" label="Help Text" labelClassName="col-xs-2" wrapperClassName="col-xs-10" help="Example block-level help text here" />
									<hr />
									<Input type="text" label="Placeholder" placeholder="Placeholder" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
									<hr />
									<Input type="text" label="Line" placeholder="Underlined" labelClassName="col-xs-2" wrapperClassName="col-xs-10" className="underline" />
									<hr />
									<Input type="text" label="Disabled" placeholder="Disabled Input here" labelClassName="col-xs-2" wrapperClassName="col-xs-10" disabled />
									<hr />
									<FormControls.Static label="Static" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value="email@example.com" />
									<hr />
									<label className="col-xs-2 control-label">Checkbox and Radio</label>
									<Input type="checkbox" label="Option one is this and that—be sure to include why it's great" />
									<Input type="checkbox" label="Option two is disabled" wrapperClassName="col-xs-offset-2" disabled />
									<Input type="radio" name="two" label="Option one is this and that—be sure to include why it's great" wrapperClassName="col-xs-offset-2" />
									<Input type="radio" name="two" label="Option two can be something else and selecting it will deselect option one" wrapperClassName="col-xs-offset-2" />
									<Input type="radio" label="Option three is disabled" wrapperClassName="col-xs-offset-2" disabled />
									<hr />
									<label className="col-sm-2 control-label">Custom Checkboxes and Radio Buttons</label>
									<label className="checkbox1" for="Option"> 
										<input id="Option" type="checkbox" className="" />
										<span></span>
									</label>
									<label className="radio1" for="Option1"> 
										<input id="Option1" name="one" type="radio" className="" />
										<span></span>
									</label>
									<label className="radio1" for="Option2"> 
										<input id="Option2" name="one" type="radio" className="" />
										<span></span>
									</label>
									<label className="radio1" for="Option3"> 
										<input id="Option3" name="one" type="radio" className="" />
										<span></span>
									</label>
									<br /><br />
									<hr />
									<div className="row">
										<label for="inputtext" className="col-sm-2 control-label">Switch</label>
										<div className="col-sm-10">
											<div className="onoffswitch">
												<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="switch3" onClick={() => this.setState({switchState : !this.state.switchState})} />
												<label className="onoffswitch-label" htmlFor="switch3">
													<span className="onoffswitch-inner" ></span>
													<span className="onoffswitch-switch"></span>
												</label>
											</div>
										</div>
									</div>
									<hr />
									<Input type="select" label="Select" placeholder="select" labelClassName="col-xs-2" wrapperClassName="col-xs-10">
                    <option value="1">1</option>
                    <option value="1">2</option>
                    <option value="1">3</option>
                    <option value="1">4</option>
                    <option value="1">5</option>
                  </Input>
                  <Input type="select" label="Multiple Selects" multiple labelClassName="col-xs-2" wrapperClassName="col-xs-10">
                    <option value="1">1</option>
                    <option value="1">2</option>
                    <option value="1">3</option>
                    <option value="1">4</option>
                    <option value="1">5</option>
                  </Input>
                  <hr />
                  <div className="form-group has-success">
										<label className="control-label col-sm-2 sucesss" for="inputSuccess1">Input with success</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputSuccess1" />
										</div>
									</div>
									<hr />
									<div className="form-group has-warning">
										<label className="control-label col-sm-2 warnings" for="inputWarning1">Input with warning</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputWarning1" />
										</div>
									</div>
									<hr />
									<div className="form-group has-error">
										<label className="control-label col-sm-2 errors" for="inputError1">Input with error</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputError1" />
										</div>
									</div>
									<hr />
									<Input type="text" label="Control Sizing" placeholder=".input-lg" labelClassName="col-xs-2" wrapperClassName="col-xs-10" bsSize="large" />
									<Input type="text" placeholder="Default input" wrapperClassName="col-xs-offset-2" bsSize="medium" />
									<Input type="text" placeholder=".input-sm" wrapperClassName="col-xs-offset-2" bsSize="small" />
									<hr />
									<Input>
										<Row>
											<Col sm={4}>
												<Input type="text" label="Column Sizing" placeholder=".col-sm-2" labelClassName="col-sm-6" wrapperClassName="col-sm-6" />
											</Col>
											<Col sm={3}>
												<div>
												<Input type="text" placeholder=".col-sm-3" wrapperClassName="col-sm-12" />
												</div>
											</Col>
											<Col sm={4}>
												<Input type="text" placeholder=".col-sm-4" wrapperClassName="col-sm-12" />
											</Col>
										</Row>
									</Input>
									<hr />
									<Input type="text" label="Input groups" addonBefore="@" placeholder="Username" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
	                <Input type="text" addonAfter=".00" wrapperClassName="col-xs-offset-2 col-xs-10" />
	                <Input type="text" addonBefore="$" addonAfter=".00" wrapperClassName="col-xs-offset-2 col-xs-10" />
	                <hr />
	                <Input type="text" label="Button addons" buttonBefore=<Button>Go!</Button> labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
	                <Input type="text" buttonAfter=<Button>Go!</Button> wrapperClassName="col-xs-offset-2 col-xs-10" />
	                <hr />
	                <Input type="date" label="Date Picker" buttonAfter=<Button><i className="glyphicon glyphicon-calendar"></i></Button> labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
								</form>
							</Panel>

						</div>
					</div>	
				</div>

      </div>
      
    );
  }

});

export default Components;