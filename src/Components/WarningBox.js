import React, {Component} from 'react';

export default class WarningBox extends Component{
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="alert alert-success">
                <strong> {this.props.head} </strong> {this.props.body}
            </div>
        );
    }
}