import React, { Component } from 'react';

export default class UserBox extends Component {
   render() {
       return (
            <div className="media">
                <img src={require("./"+this.props.userInfo.gender+".png")} className="media-object" style={{width:"360px"}} />
                <h1> <u> {this.props.userInfo.name} </u> </h1>
                <h3><strong>Gender: </strong> {this.props.userInfo.gender}</h3>
                <h3><strong>Email: </strong> {this.props.userInfo.email}</h3>
                <h3><strong>Role: </strong> {this.props.userInfo.userRole}</h3>
            </div>
       );
   }
}