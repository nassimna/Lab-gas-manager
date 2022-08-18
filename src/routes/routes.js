import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PublicRoute({ component: Component, restricted }) {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      render={(props) => (localStorage.getItem('islogin') === true && restricted ? (
        <Redirect to="/home" />
      ) : (
        <Component props={props} />
      ))}
    />
  );
}
PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool.isRequired,
};
