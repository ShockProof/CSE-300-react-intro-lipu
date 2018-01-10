import React, { Component } from 'react';
import axios from 'axios';
import WarningBox from './WarningBox';

export default class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'shamim@tourist.com',
            password: 'tourist',
            failedLogin: false
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        console.log( this.state.email );
        console.log( this.state.password );
        event.preventDefault();

        var jsonstring = JSON.stringify({
            callType:"login user",
            email: this.state.email,
            password: this.state.password
        });

        let _this = this;

        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            console.log( response.data );
            let x = response.data;
            console.log( x.loginStatus );
            if( x.loginStatus == 'success')
                _this.props.loginDone(x);
            else _this.setState({failedLogin:true});
        })
        .catch(function (error) {
            console.log(error);
        }); 
        console.log(jsonstring);
    }
    

    render() {
        return (
            <div className="jumbotron" >
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <h1> Login </h1>
                    <p> </p>
                    
                    <div className="form-group">
                        <label> Email: </label>
                        <input className ="form-control" name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group">
                        <label> Password: </label>
                        <input className ="form-control" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-success"> Submit </button>
                </form>
                {this.state.failedLogin ? <WarningBox head={'Login Failed'} body={'Try again'} /> : null}
            </div>
        );
    }
}