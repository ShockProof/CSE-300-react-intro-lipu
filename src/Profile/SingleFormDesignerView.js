import React, { Component } from 'react';
import axios from 'axios';

export default class SingleFormDesignerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllData:false,
            data:[]
        }
    }

    showDetail = () => {
        if( this.state.showAllData == true ) {
            this.setState({showAllData:false});
            return;
        }
        let _this = this;

        let jsonstring = JSON.stringify({
            callType : "get data of a form",
            columns : this.props.columns,
            tableName : "form_"+this.props.id
        });

        console.log(jsonstring);
        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            _this.state.data = response.data;
            _this.setState({data:response.data,showAllData:true});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    showColumns = () => {
        return this.props.columns.map((item, index)=> {
            return (
                <th> {item.name} </th>
            );
        })
    }

    datalist = (arr) => {
        return arr.map((item,index)=>{
            return (
                <td> {item} </td>
            );
        }) 
    }

    datarow = () => {
        let _this = this;
        return this.state.data.map((item,index)=>{
            return (
                <tr>{_this.datalist(item)}</tr>
            );
        });
    }

    render() {
        return (
            <div className="alert alert-info" onClick={this.showDetail}>
                <strong> <u> {this.props.name} </u> </strong>
                {
                    this.state.showAllData ?
                    <div>
                        <br></br>
                        <br></br>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                {this.showColumns()}
                            </tr>
                            </thead>
                            
                            <tbody>
                                {this.datarow()}
                            </tbody>
                        </table>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}