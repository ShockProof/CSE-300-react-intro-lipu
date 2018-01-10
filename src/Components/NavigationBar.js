import React, { Component } from 'react';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[ 
                {name:"Home"} ,
                {name:"Designer"} ,
                {name:"Employee"}  
            ]
        }
    }

    item = () => {
        let _this = this;
        return this.state.list.map((item, index)=> {
            return (
                <li className={ _this.props.active == item.name.toLowerCase() ? "active" : "" }><a>{item.name}</a></li>
            );
        })
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" > Survey Control </a>
                    </div>
                    <ul className="nav navbar-nav">
                        {this.item()}
                    </ul>
                </div>
            </nav>
        );
    }
}