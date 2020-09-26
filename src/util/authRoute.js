import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Redirect exact to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
