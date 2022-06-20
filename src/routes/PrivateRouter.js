import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (localStorage.getItem("islogin") !== "true") {
        // not logged in so redirect to login page with the return url
        return <Redirect to="/signIn" />;
      }

      // check if route is restricted by role
      if (roles === localStorage.getItem("role")) {
        // role not authorised so redirect to home page
        return <Component {...props} />;
      } else {
        return (
          <div>
            {alert("your not authorized")}
            <Redirect to="/signIn" />;
          </div>
        );
      }

      // authorised so return component
    }}
  />
);
