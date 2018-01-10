import React, { Component } from 'react';
import axios from 'axios';

export default class SingleFormEmployeeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllData:false,
            data:[],
            newData:[]
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

    handleNewDataChange = (event) => {
        let _this = this;
        let newData = this.state.newData;
        newData[event.target.name] = event.target.value;
        this.setState({newData:newData});
    }

    inputReady = () => {
        let _this = this;
        console.log( this.props.columns );
        return this.props.columns.map((item, index)=> {
            console.log( _this.state.newData[index] );
            return (
                <td> 
                    {
                        item.type=='int'?
                        <input type="number" className="form-control" name={index} value={_this.state.newData[index] || " "} onChange={_this.handleNewDataChange} />
                        :
                        <input type="text" className="form-control" name={index} value={_this.state.newData[index] || " "} onChange={_this.handleNewDataChange} />
                    } 
                </td>
            );
        })
    }

    dataEntry = () => {
        let _this = this;
        
        let jsonstring = JSON.stringify({
            callType : "data entry",
            tableName : "form_"+this.props.id,
            row : this.state.newData
        });

        console.log(jsonstring);
        axios.get('http://localhost/react-intro-lipu/public/server.php?phpCall='+jsonstring)
        .then(function (response) {
            console.log(response.data);
            let x = _this.state.data;
            x.push(_this.state.newData);
            _this.setState({newData:[],data:x});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="alert alert-info" >
                <strong onClick={this.showDetail}> <u> {this.props.name} </u> </strong>
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
                                {this.inputReady()}
                            </tbody>

                        </table>
                        <button className="btn btn-success" onClick={this.dataEntry}> Entry This </button>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}