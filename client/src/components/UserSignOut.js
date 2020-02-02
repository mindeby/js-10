import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  context.actions.signOut();

  return (
    <Redirect to="/" /> //Go back to main page. Will also forget about the user information stored in the cookies
  );
}
