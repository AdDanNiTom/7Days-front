import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginForm from "../components/forms/LoginForm";
import LoginWithGoogle from "../components/welcome/LoginWithGoogle";
import { Container } from "react-bootstrap";
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
      <Container fluid="sm" className="container-sm">
        <LoginWithGoogle props={props} />
        <LoginForm />
      </Container>
    </div>
  );
}

export default Welcome;
