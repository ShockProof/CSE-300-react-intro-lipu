import React, { Component } from 'react';
import axios from 'axios';

export default class DesignNewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            columns:[
            ],
            newColumnName: "",
            newColumnType: "varchar(255)"
        }
    }

    handleInputChange = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    columns = () => {
        let _this = this;
        return this.state.columns.map((item, index)=> {
            return (
                <tr>
                    <td> {item.name} </td>
                    <td> {item.type} </td>
                </tr>
            );
        })
    }

    addColumn = () => {
        let cols = this.state.columns;
        let colName = this.state.newColumnName;
        colName = colName.replace(" ","_");
        cols.push( { name:colName , type:this.state.newColumnType}  );
        this.setState({
            columns:cols,
            newColumnName: "",
            newColumnType: "varchar(255)"
        })
    }

    passParent = () => {
        let form = {
            name : this.state.name,
            columns : this.state.columns
        }
        this.props.addNewForm( form );
    }

    render() {
        return (
            <div className="jumbotron">
                <strong> Form Name: </strong>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                <br></br>
                <strong> Form Columns: </strong> 
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Type </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.columns()}
                        <tr>
                            <td> 
                                <input type="text" className="form-control" name="newColumnName" value={this.state.newColumnName} onChange={this.handleInputChange} />
                            </td>
                            <td> 
                                <select className="form-control" name="newColumnType" value={this.state.newColumnType} onChange={this.handleInputChange}>
                                    <option value="varchar(255)"> Text </option>
                                    <option value="int"> Number</option>
                                </select> 
                            </td>
                            <td> <button type="button" className="btn btn-success" onClick={this.addColumn}> Add Column </button> </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <button type="button" className="btn btn-success" onClick={this.passParent}> Add this form </button>
            </div>
        );
    }
}