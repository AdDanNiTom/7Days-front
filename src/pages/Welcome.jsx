import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";
import LoginWithGoogle from "../components/welcome/LoginWithGoogle";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

function Welcome(props) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [view, setView] = useState("login");
  const { user } = useContext(AuthContext);

  console.log(view);

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
    <Container fluid>
      <h1>7Days</h1>
      <Container fluid="sm" className="container-sm">
        {view === "login" && (
          <Container>
            <LoginWithGoogle props={props} />
            <LoginForm parentCb={setView} />
          </Container>
        )}
        {view === "signup" && (
          <Container>
            <SignupForm parentCb={setView} />
            <Link onClick={() => setView("login")}>Back to login</Link>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default Welcome;
