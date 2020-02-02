import React from 'react';
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {props.context.authenticatedUser ?
            <React.Fragment>
              <span>Welcome, {props.context.authenticatedUser.firstName} {props.context.authenticatedUser.lastName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  );
}
