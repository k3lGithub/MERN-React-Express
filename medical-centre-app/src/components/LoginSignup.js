import React from 'react';
import Link from '@material-ui/core/Link';


export const fakeAuth = {
    isAuthenticated: window.localStorage.getItem("token") ? true : false,
    authenticate(cb) {
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      window.localStorage.removeItem("token");
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    },
  };



export default function LoginSignup(props) {


  return (
    <React.Fragment>
        <p>This is Login/Signup</p>
    </React.Fragment>
  );
}