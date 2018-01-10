import React, { Component } from 'react';
import NavigationBar from "./Components/NavigationBar";
import UserIntroBox from "./Components/UserIntroBox";
import Designer from "./Profile/Designer";
import Employee from "./Profile/Employee";

export default class MyReactApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeWindow:"home",
			loginDone:false,
			userInfo:{
			}
		}
	}

	loginDone = (props) => {
		this.setState({
			loginDone:true,
			userInfo : props,
			activeWindow : props.userRole
		});
		console.log(this.state.userInfo);
	}

	render() {
		return (
			<div>
				<NavigationBar active={this.state.activeWindow}/>
				{ 
					this.state.loginDone ?
						( 
							this.state.userInfo.userRole =='designer' ? 
								<Designer userInfo={this.state.userInfo}/> 
								: 
								<Employee userInfo={this.state.userInfo}/>
						) 
						: 
						<UserIntroBox loginDone={this.loginDone} /> 
				}
			</div>
		);
	}
}
