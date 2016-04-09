import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
import {Panel, Button} from 'react-bootstrap';
import {History} from 'history';
import { Form, ValidatedInput } from 'react-bootstrap-validation';


var LoginPage = React.createClass({

    getInitialState: function () {
        sessionStorage.removeItem('username');
        return {
            loginID: '',
            password: '',
            isSubmitted: false
        };
    },

    mixins: [History],

    render: function () {
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
                        <img src={require("../../common/images/Hecate.png")}/>

                        <h1>Hecate</h1>
                        <br />
                        {status}
                        <br />
                        <Form onValidSubmit={this.handleLogin}>
                            <ValidatedInput name="username" ref="username" type="text"
                                            className="form-control input-underline input-lg" id=""
                                            placeholder='Username' onChange={this.setLoginID}
                                            errorHelp={{required: 'Please enter your username.'}} validate='required'/>
                            <ValidatedInput name="password" ref="password" type="password" className="form-control input-underline input-lg" id=""
                                   placeholder="Password" onChange={this.setPassword} errorHelp={{required: 'Please enter your password.'}} validate='required'
                                />
                            <br /><br />
                            <Button type="submit"
                                    className="btn btn-white btn-outline btn-lg btn-rounded progress-login">Login</Button>
                        </Form>
                    </div>
                </div>
            </div>

        </div>


    },

    setLoginID: function (e) {

        this.setState({
            username: e.target.value,
            loginError: ''
        });

    },

    setPassword: function (e) {

        this.setState({
            password: e.target.value,
            loginError: ''
        });

    },

    handleLogin: function (e) {

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

    handleFormSuccess: function () {
        this.setState({type: 'info', message: 'Login Successful!...'});

        var state = {'username': this.state.username}
        sessionStorage.setItem('username', this.state.username);
        this.props.history.push('/');
    },

    handleFormFailure: function () {
        this.setState({type: 'error', message: 'Incorrect Username or Password.'});
    },


});

export default LoginPage;