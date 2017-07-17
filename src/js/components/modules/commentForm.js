import React, {Component, findDOMNode} from 'react';
import PropTypes from 'prop-types'; // ES6 
import config from '../../config';

// Validate form
// import Joi from 'joi';
// import validation from 'react-validation-mixin';
// import strategy from 'joi-validation-strategy';
// import classnames from 'classnames';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500, orange500} from 'material-ui/styles/colors';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from 'material-ui/Dialog';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const styles = {
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: orange500,
  },
};


class CommentForm extends Component {
	constructor(props) {
		super(props);
    this.onSubmit    = this.onSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    
    this.state = {
      post: this.props.postId,
      errorMessage: '',
      open: false
    }
	}

  onSubmit(event) {
    event.preventDefault();
    this.addComment();
  }

  changeValue(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
  }

  addComment(){
    console.log(this.props);
    let url = `${config.apiURL}/comments`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then((res) => {
          console.log(res);
          console.log(this.refs);
          if(res.ok == true)
            this.refs.commentForm.reset();

          return res.json();
      })
      .then((data) => {
          if(data.message){
            this.setState({
              errorMessage: data.message,
              open: true
            })
          }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

	render() {
    const { author_name, author_email, content  } = this.state;

    const standardActions = (
      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

		return(
       <MuiThemeProvider muiTheme={muiTheme}>
          <ValidatorForm ref="commentForm" onSubmit={this.onSubmit}>

            <div className="">
              <TextValidator
                    ref="author_name"
                    floatingLabelText="Author Name"
                    name="author_name"
                    value={author_name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    onChange={e => this.changeValue(e, 'author_name')}
              />
            </div>

            <div className=""> 
              <TextValidator
                    ref="author_email"
                    floatingLabelText="Email"
                    name="author_email"
                    value={author_email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    onChange={e => this.changeValue(e, 'author_email')}
              />
            </div>

            <div className=""> 
              <TextValidator
                    ref="content"
                    floatingLabelText="Message"
                    name="content"
                    value={content}
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    onChange={e => this.changeValue(e, 'content')}
              />
            </div>

            <div className="buttons">
              <RaisedButton
                  label="Submit"
                  secondary={true}
                  type = "submit"
              />
            </div>

            <Dialog
              open={this.state.open}
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
              <div className="error" dangerouslySetInnerHTML={ {__html: this.state.errorMessage} } />
            </Dialog>

          </ValidatorForm>
        </MuiThemeProvider>
		)
	}
};

// CommentForm.propTypes = {
//   username: PropTypes.string,
//   password: PropTypes.string,
//   updateField: PropTypes.func,
//   submitForm: PropTypes.func,
//   errors: PropTypes.object,
//   validate: PropTypes.func,
//   isValid: PropTypes.func,
//   getValidationMessages: PropTypes.func,
//   clearValidations: PropTypes.func,
// };

export default CommentForm;