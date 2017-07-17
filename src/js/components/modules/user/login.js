import React, {Component} from 'react';
import classNames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from 'material-ui/Dialog';

import {orange400} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: orange400,
  },
});

const customContentStyle = {
	dialog: {
		width: '400px',
		maxWidth: '100%',
	},
	input: {
		display: 'block'
	},
	titleStyle: {
		paddingBottom: "10px"
	},
	checkbox: {
		marginTop: "30px",
	},
	switches: {
		fill: orange400,
		marginRight: "5px",
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.onSubmit    = this.onSubmit.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.handleUserLog  = this.handleUserLog.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			LoginOpen: false,
			loginMessage: '',
			logged: false,
			user: []
		}
	}

	handleUserLog() {
		if(localStorage.user_logged){
			localStorage.removeItem("user_logged");
			this.forceUpdate();
		} else {
			this.setState({LoginOpen: true, loginMessage: ''});
		}
	}

	handleClose() {
		this.setState({LoginOpen: false});
	}

  	changeValue(e, type) {
		const value = e.target.value;
		const nextState = {};
		nextState[type] = value;
		this.setState(nextState);
	}

	resetForm(){
		this.setState({
			email: '',
			password: '',
			rememberEmail: ''
		})
	}

	onSubmit(event) {
		//event.preventDefault();
		$('.ts-spinner').fadeIn(300);
  		const email = this.state.email;
		const password = this.state.password;

	    let url = `http://localhost/tut/reactjs/travel/wp-site/wp-json/`;

	    fetch(url, {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
  			  'Authorization': 'Basic ' +  btoa( `${email}: ${password}`) // base64 admin account
			  //'Authorization': 'Basic ' +  btoa( 'thinh@gmail.com: q123456') // base64 admin account
			}})
			.then((res) => {
		  		$('.ts-spinner').fadeOut(300);
			  	if(res.ok) {
			  		console.log(res);
			  		this.handleClose();
			  		this.resetForm();
			  		localStorage.setItem('user_logged', email);
			  		this.forceUpdate();
			  	}
			  	return res.json();
			})
			.then((responseJson) => {
				responseJson.message && this.setState({
					loginMessage: responseJson.message
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
	    const { email,  password, rememberEmail} = this.state;
	    const form = (
	    	<ValidatorForm ref="registerForm" onSubmit={this.onSubmit}>
				<TextValidator
				    ref="email"
				    fullWidth={true}
				    floatingLabelText="Email"
				    name="email"
				    value={email}
				    style={customContentStyle.input}
				    validators={['required', 'isEmail']}
				    errorMessages={['this field is required', 'email is not valid']}
				    onChange={e => this.changeValue(e, 'email')}
				/>

				<TextValidator
				    ref="password"
				    fullWidth={true}
				    floatingLabelText="Password"
				    name="password"
				    type="password"
				    value={password}
				    style={customContentStyle.input}
				    validators={['required']}
				    errorMessages={['this field is required']}
				    onChange={e => this.changeValue(e, 'password')}
				/>

				<Checkbox
			      	name="rememberEmail"
					label="Remember Email"
			        style={customContentStyle.checkbox}
					iconStyle={customContentStyle.switches}
					onClick={e => this.changeValue(e, 'rememberEmail')}
			    />

            	<div className="buttons">
		            <RaisedButton
		                label="Submit"
		                secondary={true}
		                type = "submit"
		                fullWidth={true}
		            />
	            </div>

	          </ValidatorForm>
	    );

	    const message = (<div className="text-danger" dangerouslySetInnerHTML={{__html: this.state.loginMessage}} /> );

		return(
			<li className="nav-item">
	            <a onClick={this.handleUserLog}>
					{localStorage.user_logged ? "Logout" : 'Login'}
				</a>

				<MuiThemeProvider muiTheme={muiTheme}>
					<div>
						<Dialog
						  className="register-frm"
				          title="Login"
				          modal={false}
				          open={this.state.LoginOpen}
				          onRequestClose={this.handleClose}
				          autoScrollBodyContent={true}
				          contentStyle={customContentStyle.dialog}
				          titleStyle={customContentStyle.titleStyle}
				        >
					        {form} 
					        {message}
		           		</Dialog>
	           		</div>
	    		</MuiThemeProvider>
            </li>
		); 
	}
}

export default Login;