import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


//If the user is not authenticated redirect to the Sign In page
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }}/>
            )
          }
        />
      )}
    </Consumer>
  );
};
