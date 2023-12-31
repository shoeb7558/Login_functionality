import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/authContext';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
    return (  {(ctx) => {}}
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    )
    </AuthContext.Consumer>
  
  );
};

export default Navigation;
