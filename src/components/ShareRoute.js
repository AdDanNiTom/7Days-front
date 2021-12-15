import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Redirect, Route } from "react-router-dom";


function ShareRoute(props) {
  const { to, exact, component: Component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  // If the user is already logged in, redirect him to home page
  return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default ShareRoute;