import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Redirect, Route } from "react-router-dom";
import Loading from "./status/Loading";

function PrivateRoute(props) {
  // Destructure the props
  const { to, exact, component: Component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <Loading/>;

  // If the user is not logged in ❌
  if (!isLoggedIn) return <Redirect to="/" />;

  // If the user is logged in ✅
	return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default PrivateRoute;