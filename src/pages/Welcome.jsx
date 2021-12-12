import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const API_URI = process.env.REACT_APP_API_URI;
const GOOGLE_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "534283558805-iaiv8vuujp7gaqcvqfrof8h2d460aqbs.apps.googleusercontent.com";

function Welcome(props) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const { logInUser } = useContext(AuthContext);

  // retrieve user info from DB
  useEffect(() => {
    if (user) {
      axios.get(`${API_URI}/api/users/${user._id}`).then((response) => {
        setLoggedUser(response.data.data);
      });
    }
  }, [user]);

  const onLoginSuccess = (response) => {
    axios
      .post(`${API_URI}/auth/googleLogin`, response.profileObj)
      .then((response) => {
        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        props.history.push("/events");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  const onLoginFailiure = (response) => {
    console.log("login failed", response);
  };

  return (
    <div>
      <h1>7Days</h1>
      <GoogleLogin
        clientId={GOOGLE_ID}
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailiure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
  );
}

export default Welcome;
