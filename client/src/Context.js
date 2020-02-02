import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
//In React, Context is primarily used when some data needs to be accessible by many components at different nesting levels. Context lets you pass data through the component tree without having to pass props down manually at every level.
//Create a new instance of Context
const Context = React.createContext();
export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data(); // Data.js holds the helper functions to make the api calls
    //context will track if the user is authenticated through the api or not and providing that info to the consumer components
    //we want to remember the user information even if it changes tabs in browsers or reloads page.
    this.state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        password: Cookies.getJSON('password') || null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const { password } = this.state;


    const value = {
    authenticatedUser,
    password,
    data: this.data,
    actions: {
      signIn: this.signIn,
      signOut: this.signOut,
     }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

//When signing in we make an api call to get the corresponding user, if there is a match the user is authenticated and will be tracked through context state
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          password: password,
        };
      });
      // Set cookies for user and password, they will expire in 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('password', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }

  //Connected to component UserSignOut to forget authenticated user
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
        password: null,
      };
    });

    // Forget cookies for user and password
    Cookies.remove('authenticatedUser');
    Cookies.remove('password');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
