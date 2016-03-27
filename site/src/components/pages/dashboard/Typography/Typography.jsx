import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Panel, Well} from 'react-bootstrap';

var Buttons = React.createClass({

  render: function() {
    return (

      <div>
        <div className="conter-wrapper">        
          <div className="row">
            <div className="col-lg-8 col-md-6"> 
              <Panel header={<span>
                        Typography
                      </span>
                    }
                    bsStyle="primary"
              >
                <h1>Heading 1 <small>Sub-heading</small> </h1> 
                <h2>Heading 2 <small>Sub-heading</small> </h2> 
                <h3>Heading 3 <small>Sub-heading</small> </h3> 
                <h4>Heading 4 <small>Sub-heading</small> </h4>
                <h5>Heading 5 <small>Sub-heading</small> </h5> 
                <h6>Heading 6 <small>Sub-heading</small> </h6>
                <p className="lead">This is an example of lead body copy.</p>
                <p>This is an example of standard paragraph text. This is an example of <a href="javascript:void(0)">link anchor text</a> within body copy.</p> 
                <p> <small>This is an example of small, fine print text.</small> </p> 
                <p> <strong>This is an example of strong, bold text.</strong> </p> 
                <p> <em>This is an example of emphasized, italic text.</em> </p> <br /> 
              </Panel>
              
              <Panel header={<span>
                        Blockquotes
                      </span>
                    }
                    bsStyle="danger"
              >
                <h4>Default Blockquote</h4> 
                <blockquote> 
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p> 
                </blockquote> 
                <h4>Blockquote with Citation</h4> 
                <blockquote> 
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p> 
                  <small>Someone famous in <cite title="Source Title">Source Title</cite> </small> 
                </blockquote> 
                <h4>Right Aligned Blockquote</h4>
                <blockquote className="pull-right"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p> 
                </blockquote>
              </Panel>
              
              <Panel header={<span>Wells</span>}
              >
                <Well bsSize="medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam perferendis molestias, quibusdam veritatis laborum eius ex. Quaerat harum voluptatibus recusandae consequatur? Id, repudiandae! Dolor blanditiis voluptate porro, perferendis voluptas, ad!
                </Well>
              </Panel>
              
              <Panel header={<span>Code</span>}
                bsStyle="warning"
              >
                <p>This is an example of an inline code element within body copy. Wrap inline code within a <code>&lt;code&gt;...&lt;/code&gt;</code>tag.</p>
                <pre>This is an example of preformatted text.</pre>
              </Panel>
              
            </div>

            <div className="col-lg-4 col-md-6"> 
              <Panel header={<span>Unordered Lists</span>}
                bsStyle="info"
              >
                <ul> 
                  <li>Lorem ipsum dolor sit amet, consectetur </li> 
                  <li>elit. Necessitatibus quidem similique</li> 
                  <li>lorem ipsum dolor sit amet
                    <ul> 
                      <li>on debitis</li> 
                      <li>error odio</li> 
                      <li> n dolore magni</li> 
                    </ul>
                  </li> 
                  <li>List Item</li> 
                </ul>
              </Panel>
              
              <Panel header={<span>Ordered Lists</span>}
                bsStyle="warning"
              >
                <ol> 
                  <li>List Item lorem ipsum dolor</li> 
                  <li>List Item lorem ipsum dolor</li> 
                  <li>List Item lorem ipsum dolor</li> 
                  <li>List Item lorem ipsum dolor</li> 
                </ol>
              </Panel>
              
              <Panel header={<span>Unstyled List</span>}
                bsStyle="primary"
              >
                <ul className="list-unstyled"> 
                  <li>List Item lorem ipsum</li> 
                  <li>List Item lorem ipsum</li> 
                  <li>List Item lorem ipsum</li> 
                </ul>
              </Panel>
              
              <Panel header={<span>Inline List</span>}
                bsStyle="danger"
              >
                <ul className="list-inline"> 
                  <li>List Item</li> 
                  <li>List Item</li> 
                  <li>List Item</li> 
                </ul>
              </Panel>
              
              <Panel header={<span>Emphasis Classes</span>}
                bsStyle="info"
              >
                <p className="text-muted">This is an example of muted text.</p> 
                <p className="text-primary">This is an example of primary text.</p> 
                <p className="text-success">This is an example of success text.</p> 
                <p className="text-info">This is an example of info text.</p> 
                <p className="text-warning">This is an example of warning text.</p> 
                <p className="text-danger">This is an example of danger text.</p> 
              </Panel>
              
              <Panel header={<span>Alignment Helpers</span>}
                bsStyle="primary"
              >
                <p className="text-left">Left aligned text.</p> 
                <p className="text-center">Center aligned text.</p> 
                <p className="text-right">Right aligned text.</p>
              </Panel>
              
            </div>
          </div>
        </div>
      </div>
      
    );
  }

});

export default Buttons;