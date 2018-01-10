import React, { Component } from 'react';
import axios from "axios";

export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            gender: 'male',
            userRole: 'designer'
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        console.log( this.state.name );
        console.log( this.state.password );
        console.log( this.state.email );
        console.log( this.state.gender );
        console.log( this.state.userRole );
        event.preventDefault();

        var jsonstring = JSON.stringify({
            callType:"insert user",
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            gender: this.state.gender,
            userRole: this.state.userRole
        });

        let _this = this;

        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            console.log(response);
            _this.props.regiDone();
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
                    <h1> Registration </h1>
                    <p> If you already have an account then try login. </p>
                    
                    <div className="form-group">
                        <label> Name: </label>
                        <input className ="form-control" name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group">
                        <label> Password: </label>
                        <input className ="form-control" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label> Email: </label>
                        <input className ="form-control" name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group">
                        <label> Gender: </label>
                        <select className="form-control" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label> Role: </label>
                        <select className="form-control" name="userRole" value={this.state.userRole} onChange={this.handleInputChange}>
                            <option value="designer">Designer</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
            
                    <button type="submit" className="btn btn-success"> Submit </button>
                </form>
            </div>
        );
    }
}