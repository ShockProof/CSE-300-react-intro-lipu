import React, { Component } from 'react';

import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

export default class UserIntroBox extends React.Component {
    
    constructor() {
        super();
        this.state ={
            hideRegiterBox : false,
            hideLoginBox : false
        }
    }

    regiDone = () => {
        this.setState({hideRegiterBox:true});
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        {this.state.hideLoginBox ? null: <LoginBox loginDone={this.props.loginDone} />}
                    </div>
                    <div className="col-sm-6">
                        {this.state.hideRegiterBox ? null: <RegisterBox regiDone={this.regiDone} />} 
                    </div>
                </div>
            </div>
        );
    }
}