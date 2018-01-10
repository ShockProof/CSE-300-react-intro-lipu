import React, { Component } from 'react';
import axios from 'axios';
import UserBox from './UserBox';
import DesignNewForm from './DesignNewForm';
import SingleFormDesignerView from './SingleFormDesignerView';

export default class Designer extends Component {
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
            callType : "get forms of designer",
            designerID : this.props.userInfo.id
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

    toggleShowAdddForm = () => {
        if( this.state.showAddForm == true ) {
            this.setState({showAddForm:false});
        }
        else this.setState({showAddForm:true});
    }

    addNewForm = (props) => {
        let forms = this.state.forms;
        let _this = this;

        let jsonstring = JSON.stringify({
            callType : "add new form",
            designerID : this.props.userInfo.id,
            formName : props.name,
            formColumns : props.columns,
            formColumnsString : JSON.stringify(props.columns)
        });

        console.log(jsonstring);
        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            console.log(response.data);

            forms.push({
                id : response.data,
                name : props.name,
                columns : props.columns
            });
            _this.setState({forms:forms,showAddForm:false}); 
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    showForms = () => {
        let _this = this;
        return this.state.forms.map((item, index)=> {
            return (
                <SingleFormDesignerView id={item.id} name={item.name} columns={item.columns} />
            );
        })
    }

    render() {
       return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <h3> The list of forms designed by me:</h3>
                        <br></br>
                        {this.showForms()}

                        <button type="button" className="btn btn-default" onClick={this.toggleShowAdddForm}> Design a new form </button>
                        { this.state.showAddForm ? <DesignNewForm addNewForm={this.addNewForm} userInfo={this.props.userInfo}  /> : null }
                    </div>
                    <div className="col-sm-4">
                        <UserBox userInfo={this.props.userInfo}/>
                    </div>
                </div>
            </div>
       );
   }
}