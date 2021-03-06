import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    checkPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      checkPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={this.change}
                    placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="emailAddress" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                <input
                  id="confirmPassword"
                  name="checkPassword"
                  type="password"
                  value={checkPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      checkPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    //on submit check if the password and check password fields match, if they do create a new user with the given information, else send an alert to the page
    if (password === checkPassword){
      context.data.createUser(user).then( errors => {
         if (errors.length) {
          this.setState({ errors });
         } else {
           context.actions.signIn(emailAddress, password)
             .then(() => {
                this.props.history.push('/');
              });
            }
       })
       .catch( err => {
         this.props.history.push('/error'); //if there is an error creating the user render /error and display error stack
       });
    } else {
      alert("Please check again your password confirmation")
    }
  }

  cancel = () => {
    this.props.history.push('/'); //Go back to main page
  }
}
