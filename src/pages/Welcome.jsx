import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";
import LoginWithGoogle from "../components/welcome/LoginWithGoogle";
import { Container } from "react-bootstrap";
import logo from "../images/seven-logo-w.svg"
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
<div d-flex flex-column align-items-center>
      <img src={logo} className="w-50 logo-welcome" alt="logo" />
      <br />
    <Container fluid>
      <Container fluid="sm w-75" className="container-sm"
        {view === "login" && (
          <Container>
            <LoginWithGoogle props={props} /><br /><hr />
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
    </div>
  );
}

export default Welcome;
