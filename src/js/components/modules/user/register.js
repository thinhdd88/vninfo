import React, {Component} from 'react';
import classNames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from 'material-ui/Dialog';
import CheckboxValidatorElement from '../forms/checkboxValidatorElement';

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
	gender: {
		display: 'inline-block',
		width: 'auto',
		marginRight: "50px",
	},
	switches: {
		fill: orange400,
		marginRight: "5px",
	},
	input: {
		display: 'block'
	},
	titleStyle: {
		paddingBottom: "10px"
	},
	checkbox: {
		marginTop: "30px",
	}

};

class Register extends Component {
	constructor(props) {
		super(props);
		this.onSubmit    = this.onSubmit.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.handleOpen  = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			open: false,
			loginMessage: '',
			success: false,
			termAndCondition: false
		}
	}

	handleOpen() {
		this.setState({open: true, success: false, loginMessage: ''});
	}

	handleClose(){
		this.setState({open: false});
	}

	resetForm(){
		this.setState({
			username: '',
			email: '',
			gender: '',
			password: '',
			repeatPassword: ''
		})
	}

  	changeValue(event) {
	  	const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	onSubmit(event) {
		event.preventDefault();
		$('.ts-spinner').fadeIn(300);

	    let url = `http://localhost/tut/reactjs/travel/wp-site/wp-json/wp/v2/users`;
	    let userInfo = {
	    	username: this.state.username,
	    	email: this.state.email,
	    	password: this.state.password
	    }

	    fetch(url, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  'Authorization': 'Basic ' +  btoa( 'admin: admin123') // base64 admin account
			},
			body: JSON.stringify(userInfo)
			})
			.then((res) => {
		  		$('.ts-spinner').fadeOut(300);
			  	if(res.ok) {
			  		//this.handleClose();
			  		this.resetForm();
			  		this.setState({
			  			success: true,
			  			loginMessage: 'Register success!',
			  		})
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

	componentWillMount() {
        // custom rule will have name 'isPasswordMatch' 
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isTruthy', (value) => {
        	console.log(value)
        	return value;
        });
    }

	render() {
	    const { username, email, gender, password, repeatPassword, termAndCondition, success  } = this.state;
	    
	    const form = (
	    	<ValidatorForm ref="registerForm" onSubmit={this.onSubmit}>
				<TextValidator
					ref="username"
					fullWidth={true}
					floatingLabelText="Author Name"
					name="username"
					value={username}
					style={customContentStyle.input}
					validators={['required']}
					errorMessages={['this field is required']}
					onChange={this.changeValue}
				/>

				<TextValidator
				    ref="email"
				    fullWidth={true}
				    floatingLabelText="Email"
				    name="email"
				    value={email}
				    style={customContentStyle.input}
				    validators={['required', 'isEmail']}
				    errorMessages={['this field is required', 'email is not valid']}
				    onChange={this.changeValue}
				/>

				<RadioButtonGroup onChange={this.changeValue} className="rg-gender" name="gender" defaultSelected="">
					<RadioButton
				        value="male"
				        label="Male"
				        iconStyle={customContentStyle.switches}
				        style={customContentStyle.gender}
			      	/>
			      	<RadioButton
				        value="female"
				        label="Female"
				        iconStyle={customContentStyle.switches}
				        style={customContentStyle.gender}
			      	/>
				</RadioButtonGroup>

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
				    onChange={this.changeValue}
				/>

	            <TextValidator
	            	fullWidth={true}
                    floatingLabelText="Repeat password"
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={repeatPassword}
                    style={customContentStyle.input}
                    onChange={this.changeValue}
                />
                
			    <CheckboxValidatorElement
			     	name="termAndCondition"
					label="Agree with the Terms and Conditions"
			        validators={['isTruthy']}
			        errorMessages={['this field is required']}
			        checked={termAndCondition}
			        value={termAndCondition}
			        style={customContentStyle.checkbox}
					iconStyle={customContentStyle.switches}
					onCheck={this.changeValue}
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

	    const message = <div className={classNames({'text-success': success, 'text-danger': !success })} dangerouslySetInnerHTML={{__html: this.state.loginMessage}} />;

		return(
            <li className="nav-item">
	            <a onClick={this.handleOpen}>
					Register
				</a>

				<MuiThemeProvider muiTheme={muiTheme}>
					<div>
						<Dialog
						  className="register-frm"
				          title="Create Account"
				          modal={false}
				          open={this.state.open}
				          onRequestClose={this.handleClose}
				          autoScrollBodyContent={true}
				          contentStyle={customContentStyle.dialog}
				          titleStyle={customContentStyle.titleStyle}
				        >
				        {message}
				        { !success && form }  

		           		</Dialog>
	           		</div>
	    		</MuiThemeProvider>

            </li>
		); 
	}
}

export default Register;