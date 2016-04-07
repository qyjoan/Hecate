import React from 'react';
import { Link } from "react-router";
import {Panel, Input, ButtonInput, Row, Col} from 'react-bootstrap';

var Elements = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Form" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper" ng-animate=" 'animate' ">				
					<div className="row">
						<div className="col-md-6">
							<Panel header={<span>Default Form</span>}
								bsStyle="info"
							>
								<form>
									<Input type="email" label="Email address" placeholder="Enter email" />
									<Input type="password" label="Password" placeholder="Password" />
									<Input type="checkbox" label="Remember me" />
									<ButtonInput value="Submit" />
								</form>
							</Panel>
							
							<Panel header={<span>Horizontal Form</span>}
								bsStyle="success"
							>
								<form className="form-horizontal">
							    <Input type="email" label="Email" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Email" />
							    <Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Password" />
							    <Input type="checkbox" label="Remember me" wrapperClassName="col-xs-offset-2 col-xs-10" />
							    <ButtonInput value="Sign in" wrapperClassName="col-xs-offset-2" />
							  </form>
							</Panel>
							
							<Panel header={<span>Inline Form</span>}
								bsStyle="primary"
							>
								<form className="form-inline">
									<Row>
										<Col>
												<Input type="text" label="Name&nbsp;" placeholder="Jane Doe" />
												&nbsp;&nbsp;
												<Input type="email" label="Email&nbsp;" placeholder="jane.doe@example.com" />
												&nbsp;&nbsp;
												<ButtonInput value="Send invitation" />
										</Col>
									</Row>
								</form>
							</Panel>
						</div>

						<div className="col-md-6">
							<Panel header={<span>Inline Underline Form</span>}
								bsStyle="danger"
							>
								<form className="form-inline">
									<Row>
										<Col>
											<Input type="text" label="Name&nbsp;" placeholder="Jane Doe" className="underline" />
											<Input type="email" label="Email&nbsp;" placeholder="jane.doe@example.com" className="underline" />
											&nbsp;&nbsp;
											<ButtonInput value="Send invitation" />
										</Col>
									</Row>
								</form>
							</Panel>
						</div>

						<div className="col-md-6">
							<Panel header={<span>Underline Default Form</span>}
								bsStyle="warning"
							>
								<form>
									<Input type="email" label="Email address" placeholder="Enter email" className="underline" />
									<Input type="password" label="Password" placeholder="Password" className="underline" />
									<Input type="checkbox" label="Remember me" />
									<ButtonInput value="Submit" />
								</form>
							</Panel>
							
							<Panel header={<span>Horizontal Underline Form</span>}
								bsStyle="info"
							>
								<form className="form-horizontal">
									<Input type="email" label="Email" placeholder="Email" className="underline" labelClassName="col-xs-1" wrapperClassName="col-xs-offset-1 col-xs-10" />
									<Input type="password" label="Password" placeholder="Password" className="underline" labelClassName="col-xs-1" wrapperClassName="col-xs-offset-1 col-xs-10" />
									<Input type="checkbox" label="Remember me" wrapperClassName="col-xs-offset-2" />
									<ButtonInput value="Submit" wrapperClassName="col-xs-offset-2" />
								</form>
							</Panel>
						</div>
					</div>

				</div>
      </div>
      
    );
  }

});

export default Elements;