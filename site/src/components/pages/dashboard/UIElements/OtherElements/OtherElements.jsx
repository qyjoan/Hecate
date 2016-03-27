import React from 'react';
import { Link } from "react-router";
import {Panel, ListGroup, ListGroupItem, Badge, Label, Carousel, CarouselItem,
				OverlayTrigger, Tooltip, Popover, Button, ButtonToolbar} from 'react-bootstrap';

var OtherElements = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Other Elements" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">				
					<div className="row">
						<div className="col-lg-8 col-md-6">
							<Panel header={<span>List Group</span>}
								bsStyle="primary"
							>
								<ListGroup>
							    <ListGroupItem>Cras justo odio</ListGroupItem>
							    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							    <ListGroupItem>Morbi leo risus</ListGroupItem>
							    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
							    <ListGroupItem>Vestibulum at eros</ListGroupItem>
							  </ListGroup>
							  <ListGroup>
							    <ListGroupItem>
							    	Cras justo odio
							    	<Badge>14</Badge>
							    </ListGroupItem>
							  </ListGroup>
							  <ListGroup>
							    <ListGroupItem active>Cras justo odio</ListGroupItem>
							    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							    <ListGroupItem>Morbi leo risus</ListGroupItem>
							    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
							    <ListGroupItem>Vestibulum at eros</ListGroupItem>
							  </ListGroup>
							  <ListGroup>
							    <ListGroupItem bsStyle="success">Dapibus ac facilisis in</ListGroupItem>
							    <ListGroupItem bsStyle="info">Morbi leo risus</ListGroupItem>
							    <ListGroupItem bsStyle="warning">Porta ac consectetur ac</ListGroupItem>
							    <ListGroupItem bsStyle="danger">Vestibulum at eros</ListGroupItem>
							  </ListGroup>
							  <ListGroup>
							    <ListGroupItem header="List group item heading" active>
							    	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione officiis totam eos optio!
							    </ListGroupItem>
							    <ListGroupItem header="List group item heading">
							    	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione officiis totam eos optio!
							    </ListGroupItem>
							    <ListGroupItem header="List group item heading">
							    	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione officiis totam eos optio!
							    </ListGroupItem>
							  </ListGroup>
							</Panel>
						</div>
						<div className="col-lg-4 col-md-6">
							<Panel header={<span>Labels &amp; Badges</span>}
								bsStyle="warning"
							>
								<Label bsStyle="default">labels</Label>&nbsp;
						    <Label bsStyle="primary">labels</Label>&nbsp;
						    <Label bsStyle="success">labels</Label>&nbsp;
						    <Label bsStyle="info">labels</Label>&nbsp;
						    <Label bsStyle="warning">labels</Label>&nbsp;
						    <Label bsStyle="danger">labels</Label>
						    <br /><br />
						    <Badge>35</Badge>&nbsp;
								<Badge>67</Badge>&nbsp;
								<Badge>12</Badge>&nbsp;
								<Badge>39</Badge>&nbsp;
								<Badge>07</Badge>&nbsp;
								<Badge>94</Badge>&nbsp;
								<Badge><i className="fa fa-star"></i></Badge>&nbsp;
								<Badge><i className="fa fa-certificate"></i></Badge>
							</Panel>
							
							<Panel header={<span>Carousel</span>}
								bsStyle="danger"
							>
								<Carousel>
							    <CarouselItem>
							      Success is not final, failure is not fatal: it is the courage to continue that counts.
							    </CarouselItem>
							    <CarouselItem>
							      To succeed in life, you need two things: ignorance and confidence.
							    </CarouselItem>
							    <CarouselItem>
							      Success is how high you bounce when you hit bottom.
							    </CarouselItem>
							  </Carousel>
							</Panel>
							
							<Panel header={<span>Carousel</span>}
								bsStyle="info"
							>
								<Carousel>
							    <CarouselItem>
							      <img width={450} height={200} alt="image" src={require("../../../../../common/images/img1.jpg")} />
							    </CarouselItem>
							    <CarouselItem>
							      <img width={450} height={200} alt="image" src={require("../../../../../common/images/img2.jpg")} />
							    </CarouselItem>
							    <CarouselItem>
							      <img width={450} height={200} alt="image" src={require("../../../../../common/images/img3.jpg")} />
							    </CarouselItem>
							  </Carousel>
							</Panel>
							
							<Panel header={<span>Tooltip &amp; Popover</span>}
								bsStyle="success"
							>
								<div>
									<ButtonToolbar>
	                  <OverlayTrigger placement="left" overlay=<Tooltip>On the Left!</Tooltip> >
	                    <Button>Left Tooltip</Button>
	                  </OverlayTrigger>&nbsp;
	                  <OverlayTrigger placement="top" overlay=<Tooltip>On the Top!</Tooltip> >
	                    <Button>Top Tooltip</Button>
	                  </OverlayTrigger>&nbsp;
	                  <OverlayTrigger placement="bottom" overlay=<Tooltip>On the Bottom!</Tooltip> >
	                    <Button>Bottom Tooltip</Button>
	                  </OverlayTrigger>
	                  <br /><br />
	                  <OverlayTrigger placement="right" overlay=<Tooltip>On the Right!</Tooltip> >
	                    <Button>Right Tooltip</Button>
	                  </OverlayTrigger>
                 	</ButtonToolbar>
                </div>
                <br />
                <div>
                	<ButtonToolbar>
	                  <OverlayTrigger trigger="click" placement="left" overlay={<Popover><strong>On the Left!</strong></Popover>}>
	                    <Button>Left Popover</Button>
	                  </OverlayTrigger>
	                  <OverlayTrigger trigger="click" placement="top" overlay={<Popover><strong>On the Top!</strong></Popover>}>
	                    <Button>Top Popover</Button>
	                  </OverlayTrigger>
	                  <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover><strong>On the Bottom!</strong></Popover>}>
	                    <Button>Bottom Popover</Button>
	                  </OverlayTrigger>
	                  <br /><br />
	                  <OverlayTrigger trigger="click" placement="right" overlay={<Popover><strong>On the Right!</strong></Popover>}>
	                    <Button>Right Popover</Button>
	                  </OverlayTrigger>
                  </ButtonToolbar>
                </div>
							</Panel>
						</div>
					</div>
				</div>
      </div>
      
    );
  }

});

export default OtherElements;