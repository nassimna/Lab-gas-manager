import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, roles }) {
  return (
    <Route
      render={(props) => {
        if (localStorage.getItem('islogin') !== 'true') {
          // not logged in so redirect to login page with the return url
          return <Redirect to="/signIn" />;
        }

        // check if route is restricted by role
        if (roles === localStorage.getItem('role')) {
          // role not authorised so redirect to home page
          return <Component props={props} />;
        }
        return (
          <div>
            {alert('your not authorized')}
            <Redirect to="/signIn" />
            ;
          </div>
        );

        // authorised so return component
      }}
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  roles: PropTypes.string.isRequired,
};
