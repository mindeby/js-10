import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


//If the user is not authenticated through context state the user can't access these private paths and is redirected to the Sign In page
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? ( //if it is authenticated
              <Component {...props} /> //render the requested path
            ) : (
              <Redirect to={{
                pathname: '/signin', //otherwise redirect to sign in page
                state: { from: props.location },
              }}/>
            )
          }
        />
      )}
    </Consumer>
  );
};
