import React, { Component } from 'react';
import axios from 'axios';
import UserBox from './UserBox';
import SingleFormEmployeeView from './SingleFormEmployeeView';

export default class Emplyoee extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm:false,
            forms: [
                //{
                    ///id:1
                    ///name:"",
                    ///columns:[]
                //}
            ]
        }
    }

    componentDidMount = () => {
        let jsonstring = JSON.stringify({
            callType : "get forms of employee"
        });
        let _this = this;
        console.log(jsonstring);
        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            _this.setState({forms:response.data});
            
            console.log( _this.state.forms);   
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    showForms = () => {
        let _this = this;
        return this.state.forms.map((item, index)=> {
            return (
                <SingleFormEmployeeView id={item.id} name={item.name} columns={item.columns} />
            );
        })
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <h3> The list of forms where I can push data:</h3>
                    <br></br>

                    {this.showForms()}

                </div>
                <div className="col-sm-4">
                    <UserBox userInfo={this.props.userInfo}/>
                </div>
            </div>
        </div>
        );
    }
}