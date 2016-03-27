import React from 'react';
import { Link } from "react-router";
import {Panel} from 'react-bootstrap';

import C3Chart from "../../../../common/ChartElement/C3Chart";

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
	  },
	  {
	    key: "data-2",
	    values: [
	      {label: "0", value: 100},
	      {label: "1", value: 400},
	     	{label: "2", value: 150},
	      {label: "3", value: 250},
	      {label: "4", value: 30},
	      {label: "5", value: 100}
	    ]
	  }
	];

	let type = "bar" // {"line","bar","pie", "multiBar","lineBar"}

	let options = {
	  padding: {
	    top: 20,
	    bottom: 20,
	    left: 40,
	    right: 10
	  },
	  size: {	    
	    height: 320
	  },
	  subchart: false,
	  zoom: true,
	  grid: {
	    x: false,
	    y: false
	  },
	  labels: true,
	  axisLabel: {
	    x: "product",
	    y: "quantity"
	  },
	  showLegend: false,
	  onClick: function(d) {
	    let categories = this.categories(); //c3 function, get categorical labels
	    console.log(d);
	    console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
	  }
	};

// <C3Chart data={data} type={type} options={options} />
var ChartC3 = React.createClass({

  render: function() {
    return (

      <div className="conter-wrapper">				
				<div className="row">
					<div className="col-md-6">
						<Panel bsStyle="primary"
							header={<h3 className="panel-title">Line Chart</h3>}
						>
							<C3Chart data={data} type={"lineBar"} options={options} value={1} />
						</Panel>
					</div>	
					<div className="col-md-6">
						<Panel bsStyle="warning"
							header={<h3 className="panel-title">Pie Chart</h3>}
						>
							<C3Chart data={data} type={"pie"} options={options} value={2} />
						</Panel>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Panel bsStyle="success"
							header={<h3 className="panel-title">Doughnut Chart</h3>}
						>
							<C3Chart data={data} type={"doughnut"} options={options} value={3} />
						</Panel>
					</div>	
					<div className="col-md-6">
						<Panel bsStyle="danger"
							header={<h3 className="panel-title">Multi Bar Chart</h3>}
						>
							<C3Chart data={data} type={"multiBar"} options={options} value={4} />
						</Panel>
					</div>
				</div>
      </div>
      
    );
  }

});

export default ChartC3;