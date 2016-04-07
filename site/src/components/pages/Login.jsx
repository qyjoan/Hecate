import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';

var LoginPage = React.createClass({

  getInitialState: function(){
    sessionStorage.removeItem('username');
    return {
      loginID: '',
      password: '',
      isSubmitted: false
    };
  },

  mixins: [History],

  render: function(){
    if (this.state.type && this.state.message) {
        var classString = 'alert alert-' + this.state.type;
        var status = <div id="status" className={classString} ref="status">
            {this.state.message}
        </div>;
    }

  
    return <div>

        <div className="login-page">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                  <img src={require("../../common/images/Hecate.png")} />
              <h1>Hecate</h1>
              <br />
              {status}
              <br />
              <form role="form" onSubmit={this.handleLogin}>
                <Input type="text" className="form-control input-underline input-lg" id="" placeholder='Email' onChange={this.setLoginID} />
                <Input type="password" className="form-control input-underline input-lg" id="" placeholder="Password"  onChange={this.setPassword} />
                <br /><br />
                <Button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded progress-login" >Log in</Button>
                <Link to="signup"><Button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded" >Register Here</Button></Link>
              </form>
            </div>  
          </div>
        </div>
        
      </div>
      

  },

  setLoginID: function(e) {

    this.setState({
      username: e.target.value,
      loginError: ''
    });

  },

  setPassword: function(e) {

    this.setState({
      password: e.target.value,
      loginError: ''
    });

  },

  handleLogin: function(e){
    e.preventDefault();

    this.setState({type: 'info', message: 'Processing Login ... Please Wait.'});

    var http = require("http");
    var url = "http://54.191.104.28:5000/hecate/api/v1.0/login";
    var post_data = {username: this.state.username, password: this.state.password}

    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: post_data,
        success: this.handleFormSuccess,
        error: this.handleFormFailure
    });

    return false;

  },

  handleFormSuccess: function(){
    this.setState({type: 'info', message: 'Login Successful!...'});

    var state = {'username': this.state.username}
    sessionStorage.setItem('username', this.state.username);
    this.props.history.push('/');
  },

  handleFormFailure: function(){
    this.setState({type: 'error', message: 'Incorrect Username or Password.'});
  },


});

export default LoginPage;