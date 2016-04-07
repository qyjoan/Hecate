import React from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Modal = React.createClass({

  render: function() {
    return (

      <div>
      	<pageheader pagename="Modal" subtitle="Bootstrap UI Elements"></pageheader>

				<div className="conter-wrapper">                
				    <div className="panel panel-primary">
				        <div className="panel-heading">
				            <h3 className="panel-title">Modal</h3>
				        </div>
				        <div className="panel-body" ng-controller="ModalDemoCtrl">
				            <table className="table modal-table">
				                <tbody>
				                <tr>
				                    <td className="moleft"> Normal Size</td>    
				                    <td className="moright">
				                       <button className="btn btn-primary btn-rounded" ng-click="open()">View Modal</button>
				                        
				                    </td>
				                </tr>
				                <tr>    
				                    <td className="moleft"> Large Size</td> 
				                    <td className="moright">
				                        <button className="btn btn-primary btn-rounded" ng-click="open('lg')">View Modal</button>
				                    </td>
				                </tr>
				                <tr>
				                    <td className="moleft"> Small Size</td> 
				                    <td className="moright">
				                         <button className="btn btn-primary btn-rounded" ng-click="open('sm')">View Modal</button>
				                    </td>
				                </tr>
				            </tbody>
				        </table>
				        </div>
				    </div>
				    <div ng-controller="ModalDemoCtrl">
				        <script type="text/ng-template" id="myModalContent.html">
				            <div className="modal-header">
				                <h3 className="modal-title">Modal Title</h3>
				            </div>
				            <div className="modal-body">
				                <div className="high-padding text-center">
				                    This is a modal body
				                </div>
				            </div>
				            <div className="modal-footer">
				                <button className="btn btn-default btn-rounded" ng-click="cancel()">Cancel</button>
				                <button className="btn btn-primary btn-rounded" ng-click="ok()">Confirm</button>
				            </div>
				        </script>
				    </div>
				</div>
      </div>
      
    );
  }

});

export default Modal;