webpackJsonp([14],{629:function(e,t,a){try{(function(){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(1),r=l(s),i=(a(8),a(10)),n=r["default"].createClass({displayName:"Alerts",getInitialState:function(){return{alertVisible1:!0,alertVisible2:!0,alertVisible3:!0,alertVisible4:!1,alertValue:"",showGrowlDefault:!1,showGrowlPrimary:!1,showGrowlInfo:!1,showGrowlWarning:!1,showGrowlError:!1}},render:function(){return r["default"].createElement("div",null,r["default"].createElement("pageheader",{pagename:"Alerts",subtitle:"Bootstrap UI Elements"}),r["default"].createElement("div",{className:"conter-wrapper"},r["default"].createElement(i.Panel,{header:r["default"].createElement("span",null,"Dismissable Alerts"),bsStyle:"primary"},this.state.alertVisible1?r["default"].createElement(i.Alert,{bsStyle:"danger",onDismiss:this.handleAlertDismiss1},r["default"].createElement("p",null,"Oh snap! Change a few things up and try submitting again.")):null,this.state.alertVisible2?r["default"].createElement(i.Alert,{bsStyle:"info",onDismiss:this.handleAlertDismiss2,name:"2",style:{display:this.state.alertVisible2?"":"none"}},r["default"].createElement("p",null,"Ok! Not bad, but you can do better.")):null,this.state.alertVisible3?r["default"].createElement(i.Alert,{bsStyle:"success",onDismiss:this.handleAlertDismiss3,name:"3",style:{display:this.state.alertVisible3?"":"none"}},r["default"].createElement("p",null,"Well done! You successfully read this important alert message.")):null,this.state.alertVisible4?r["default"].createElement(i.Alert,{bsStyle:"warning",onDismiss:this.handleAlertDismiss4,name:"4",style:{display:this.state.alertVisible4?"":"none"}},r["default"].createElement("p",null,this.state.alertValue)):null,r["default"].createElement("form",{className:"form-inline",onSubmit:this.addAlert},r["default"].createElement(i.Input,{type:"text",placeholder:"Enter Alert Message"})," ",r["default"].createElement(i.Button,{type:"submit"},"Add Alert"))),r["default"].createElement(i.Panel,{header:r["default"].createElement("span",null,"Growl Alerts"),bsStyle:"info"},r["default"].createElement(i.ButtonToolbar,null,r["default"].createElement(i.Button,{bsStyle:"default",onClick:this.toggleGrowl,name:"Default"},"Show Growl"),r["default"].createElement(i.Button,{bsStyle:"primary",onClick:this.toggleGrowl,name:"Primary"},"Primary Growl"),r["default"].createElement(i.Button,{bsStyle:"info",onClick:this.toggleGrowl,name:"Info"},"Info Growl"),r["default"].createElement(i.Button,{bsStyle:"warning",onClick:this.toggleGrowl,name:"Warning"},"Warning Growl"),r["default"].createElement(i.Button,{bsStyle:"danger",onClick:this.toggleGrowl,name:"Error"},"Danger Growl")),r["default"].createElement("growl-notifications",null,r["default"].createElement("growl-notification",{"class":"fading",style:{display:this.state.showGrowlDefault?"":"none"}},r["default"].createElement("a",{href:"javascript:;",onClick:this.closeGrowl,className:"close"},r["default"].createElement("i",{className:"fa fa-times",name:"Default"})),"Default Notification"),r["default"].createElement("growl-notification",{"class":"growl-primary fading",style:{display:this.state.showGrowlPrimary?"":"none"}},r["default"].createElement("a",{href:"javascript:;",onClick:this.closeGrowl,className:"close"},r["default"].createElement("i",{className:"fa fa-times",name:"Primary"})),"Primary Notification"),r["default"].createElement("growl-notification",{"class":"growl-info fading",style:{display:this.state.showGrowlInfo?"":"none"}},r["default"].createElement("a",{href:"javascript:;",onClick:this.closeGrowl,className:"close"},r["default"].createElement("i",{className:"fa fa-times",name:"Info"})),"Info Notification"),r["default"].createElement("growl-notification",{"class":"growl-warning",style:{display:this.state.showGrowlWarning?"":"none"}},r["default"].createElement("a",{href:"javascript:;",onClick:this.closeGrowl,className:"close"},r["default"].createElement("i",{className:"fa fa-times",name:"Warning"})),"Warning Notification"),r["default"].createElement("growl-notification",{"class":"growl-error fading",style:{display:this.state.showGrowlError?"":"none"}},r["default"].createElement("a",{href:"javascript:;",onClick:this.closeGrowl,className:"close"},r["default"].createElement("i",{className:"fa fa-times",name:"Error"})),"Error Notification")))))},handleAlertDismiss1:function(){this.setState({alertVisible1:!1})},handleAlertDismiss2:function(){this.setState({alertVisible2:!1})},handleAlertDismiss3:function(){this.setState({alertVisible3:!1})},handleAlertDismiss4:function(){this.setState({alertVisible4:!1})},toggleGrowl:function(e){var t=this;switch(e.target.name){case"Default":this.setState({showGrowlDefault:!this.state.showGrowlDefault}),setTimeout(function(){t.setState({showGrowlDefault:!1})},5e3);break;case"Primary":this.setState({showGrowlPrimary:!this.state.showGrowlPrimary}),setTimeout(function(){t.setState({showGrowlPrimary:!1})},5e3);break;case"Info":this.setState({showGrowlInfo:!this.state.showGrowlInfo}),setTimeout(function(){t.setState({showGrowlInfo:!1})},5e3);break;case"Warning":this.setState({showGrowlWarning:!this.state.showGrowlWarning}),setTimeout(function(){t.setState({showGrowlWarning:!1})},5e3);break;case"Error":this.setState({showGrowlError:!this.state.showGrowlError}),setTimeout(function(){t.setState({showGrowlError:!1})},5e3)}},closeGrowl:function(e){switch(e.target.getAttribute("name")){case"Default":this.setState({showGrowlDefault:!1});break;case"Primary":this.setState({showGrowlPrimary:!1});break;case"Info":this.setState({showGrowlInfo:!1});break;case"Warning":this.setState({showGrowlWarning:!1});break;case"Error":this.setState({showGrowlError:!1})}},addAlert:function(e){return e.preventDefault(),this.state.alertVisible4||(this.setState({alertValue:e.target[0].value}),this.setState({alertVisible4:!0})),e.target[0].value="",!1}});t["default"]=n,e.exports=t["default"]}).call(this)}finally{}}});