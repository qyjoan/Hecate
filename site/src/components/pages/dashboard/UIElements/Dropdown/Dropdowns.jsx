import React from 'react';
import { Link } from "react-router";
import {Panel, Nav, Navbar, NavItem, NavDropdown, MenuItem, CollapsibleNav, 
				Input, InputButton, DropdownButton, ButtonToolbar, ButtonGroup, 
				Button, SplitButton, Dropdown} from 'react-bootstrap';

var Dropdowns = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Navbar & Dropdowns" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper"> 

				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Navbar</span>}
				        			bsStyle="primary"
				        		>
				        			<h4>Default Style</h4>
	                    <Navbar fluid>
										    <CollapsibleNav eventKey={0}>
										      <Nav navbar  style={ {marginLeft: 0} }>
										        <NavItem className="active" eventKey={1} href="javascript:void(0);">Link</NavItem>
										        <NavItem eventKey={2} href="javascript:void(0);">Link</NavItem>
										        <NavDropdown eventKey={3} title="Dropdown" id="collapsible-nav-dropdown">
										          <MenuItem eventKey="1">Action</MenuItem>
										          <MenuItem eventKey="2">Another action</MenuItem>
										          <MenuItem eventKey="3">Something else here</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">Separated link</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">One more separated link</MenuItem>
										        </NavDropdown>
										      </Nav>
										      <form className="navbar-form navbar-left" role="search">
	                            <Input type="text" className="form-control" placeholder="Search" />
	                            &nbsp;
	                            <button type="submit" className="btn btn-default">Submit</button>
	                        </form>
										      <Nav navbar right>
										        <NavItem eventKey={1} href="javascript:void(0)">Link</NavItem>
										        <NavDropdown eventKey={2} title="Dropdown" id="collapsible-nav-dropdown">
										          <MenuItem eventKey="1">Action</MenuItem>
										          <MenuItem eventKey="2">Another action</MenuItem>
										          <MenuItem eventKey="3">Something else here</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">Separated link</MenuItem>
										        </NavDropdown>
										      </Nav>
										    </CollapsibleNav>
									  	</Navbar>

										  <h4>Inverted Style</h4>
					        		<Navbar className="navbar navbar-inverse" fluid>
										    <CollapsibleNav eventKey={0}>
										      <Nav navbar  style={ {marginLeft: 0} }>
										        <NavItem className="active" eventKey={1} href="javascript:void(0);">Link</NavItem>
										        <NavItem eventKey={2} href="javascript:void(0);">Link</NavItem>
										        <NavDropdown eventKey={3} title="Dropdown" id="collapsible-nav-dropdown">
										          <MenuItem eventKey="1">Action</MenuItem>
										          <MenuItem eventKey="2">Another action</MenuItem>
										          <MenuItem eventKey="3">Something else here</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">Separated link</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">One more separated link</MenuItem>
										        </NavDropdown>
										      </Nav>
										      <form className="navbar-form navbar-left" role="search">
	                            <Input type="text" className="form-control" placeholder="Search" />
	                            &nbsp;
	                            <button type="submit" className="btn btn-default">Submit</button>
	                        </form>
										      <Nav navbar right>
										        <NavItem eventKey={1} href="javascript:void(0)">Link</NavItem>
										        <NavDropdown eventKey={2} title="Dropdown" id="collapsible-nav-dropdown">
										          <MenuItem eventKey="1">Action</MenuItem>
										          <MenuItem eventKey="2">Another action</MenuItem>
										          <MenuItem eventKey="3">Something else here</MenuItem>
										          <MenuItem divider />
										          <MenuItem eventKey="4">Separated link</MenuItem>
										        </NavDropdown>
										      </Nav>
										    </CollapsibleNav>
										  </Navbar>
									  </Panel>
				        </div>
				    </div> 

				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Regular Dropdown</span>}
				        			bsStyle="warning"
				        		>
				        			<ButtonToolbar>
					        			<DropdownButton title="Button dropdown">
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="primary" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="success" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="warning" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="danger" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        		</ButtonToolbar>
					        		<hr />
					        		<ButtonToolbar>
					        			<DropdownButton title="Button dropdown" className="btn-rounded">
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="primary" className="btn-rounded" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="success" className="btn-rounded" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="warning" className="btn-rounded" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="danger" className="btn-rounded" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        		</ButtonToolbar>
					        		<hr />
					        		<ButtonToolbar>
					        			<DropdownButton title="Button dropdown" className="btn-rounded btn-bordered">
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="primary" className="btn-rounded btn-bordered" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="success" className="btn-rounded btn-bordered" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="warning" className="btn-rounded btn-bordered" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        			<DropdownButton title="Button dropdown" bsStyle="danger" className="btn-rounded btn-bordered" >
					        				<MenuItem eventKey="1">Action</MenuItem>
								          <MenuItem eventKey="2">Another action</MenuItem>
								          <MenuItem eventKey="3">Something else here</MenuItem>
								          <MenuItem divider />
								          <MenuItem eventKey="4">Separated link</MenuItem>
					        			</DropdownButton>
					        		</ButtonToolbar>
				        		</Panel>
				        </div> 
				    </div>     

				    <div className="row">
				        <div className="col-sm-12">
				        		<Panel header={<span>Split-Button Dropdown</span>}
				        			bsStyle="success"
				        		>
				        			<ButtonToolbar>
					        			<SplitButton bsStyle="default" title="Action">
										      <MenuItem eventKey="1">Action</MenuItem>
										      <MenuItem eventKey="2">Another action</MenuItem>
										      <MenuItem eventKey="3">Something else here</MenuItem>
										      <MenuItem divider />
										      <MenuItem eventKey="4">Separated link</MenuItem>
										    </SplitButton>
										    <SplitButton bsStyle="success" title="Action">
										      <MenuItem eventKey="1">Action</MenuItem>
										      <MenuItem eventKey="2">Another action</MenuItem>
										      <MenuItem eventKey="3">Something else here</MenuItem>
										      <MenuItem divider />
										      <MenuItem eventKey="4">Separated link</MenuItem>
										    </SplitButton>
										    <SplitButton bsStyle="primary" title="Action">
										      <MenuItem eventKey="1">Action</MenuItem>
										      <MenuItem eventKey="2">Another action</MenuItem>
										      <MenuItem eventKey="3">Something else here</MenuItem>
										      <MenuItem divider />
										      <MenuItem eventKey="4">Separated link</MenuItem>
										    </SplitButton>
										    <SplitButton bsStyle="warning" title="Action">
										      <MenuItem eventKey="1">Action</MenuItem>
										      <MenuItem eventKey="2">Another action</MenuItem>
										      <MenuItem eventKey="3">Something else here</MenuItem>
										      <MenuItem divider />
										      <MenuItem eventKey="4">Separated link</MenuItem>
										    </SplitButton>
										    <SplitButton bsStyle="danger" title="Action">
										      <MenuItem eventKey="1">Action</MenuItem>
										      <MenuItem eventKey="2">Another action</MenuItem>
										      <MenuItem eventKey="3">Something else here</MenuItem>
										      <MenuItem divider />
										      <MenuItem eventKey="4">Separated link</MenuItem>
										    </SplitButton>
										   </ButtonToolbar>
										   <hr />
										   <ButtonToolbar>
										   	<Dropdown>
										      <Button bsStyle="default" className="btn-rounded">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="default" className="btn-rounded" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
					        			<Dropdown>
										      <Button bsStyle="success" className="btn-rounded">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="success" className="btn-rounded" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="primary" className="btn-rounded">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="primary" className="btn-rounded" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="warning" className="btn-rounded">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="warning" className="btn-rounded" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="danger" className="btn-rounded">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="danger" className="btn-rounded" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										   </ButtonToolbar>
										   <hr />
										   <ButtonToolbar>
										   	<Dropdown>
										      <Button bsStyle="default" className="btn-rounded btn-bordered">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="default" className="btn-rounded btn-bordered" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
					        			<Dropdown>
										      <Button bsStyle="success" className="btn-rounded btn-bordered">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="success" className="btn-rounded btn-bordered" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="primary" className="btn-rounded btn-bordered">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="primary" className="btn-rounded btn-bordered" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="warning" className="btn-rounded btn-bordered">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="warning" className="btn-rounded btn-bordered" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										    <Dropdown>
										      <Button bsStyle="danger" className="btn-rounded btn-bordered">
										        Action
										      </Button>
										      <Dropdown.Toggle bsStyle="danger" className="btn-rounded btn-bordered" />
										      <Dropdown.Menu>
										        <MenuItem eventKey="1">Action</MenuItem>
										        <MenuItem eventKey="2">Another action</MenuItem>
										        <MenuItem eventKey="3" active>Active Item</MenuItem>
										        <MenuItem divider />
										        <MenuItem eventKey="4">Separated link</MenuItem>
										      </Dropdown.Menu>
										    </Dropdown>
										   </ButtonToolbar>
				        		</Panel>
				        </div>
				    </div>  

				</div>
      </div>
      
    );
  }

});

export default Dropdowns;