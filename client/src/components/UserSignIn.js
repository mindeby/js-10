import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  //everytime the input values change the state of the corresponding value will change as well.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    // (from) redirects users back to their previous screen doesn't matter in which path they are
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    const { emailAddress, password } = this.state;
    //Try to sign in, if the user filled out both fields and the user exists in the database Sign In is successful and the user is redirected to previous page
    if (emailAddress && password){
      context.actions.signIn(emailAddress, password)
        .then( user => {
          if (user === null) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful' ] }; //If there is no user in the data base that matched the login details add an error to the stack
            });
          } else {
            console.log("Successful authentication")
            this.props.history.push(from); //redirects to the user's previous page doesn't matter which one it was
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        })
    } else {
      this.setState(() => {
        return { errors: [ "You can't leave empty fields for Email Address and Password" ] };
      });
    }

  }

  cancel = () => {
    this.props.history.push('/');
  }
}
