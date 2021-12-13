import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginWithGoogle from "../components/welcome/LoginWithGoogle";
import { Link } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

function Welcome(props) {
  const [loggedUser, setLoggedUser] = useState(null);
  const { user } = useContext(AuthContext);

  // retrieve user info from DB
  useEffect(() => {
    if (user) {
      axios.get(`${API_URI}/api/users/${user._id}`).then((response) => {
        setLoggedUser(response.data.data);
        props.history.push("/events");
      });
    }
  }, [user]);

  return (
    <div>
      <h1>7Days</h1>
      <LoginWithGoogle props={props} />
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Welcome;
