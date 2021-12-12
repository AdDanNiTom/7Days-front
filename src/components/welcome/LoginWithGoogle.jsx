import { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;
const GOOGLE_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "534283558805-iaiv8vuujp7gaqcvqfrof8h2d460aqbs.apps.googleusercontent.com";

function LoginWithGoogle(props) {
  const { logInUser } = useContext(AuthContext);

  const onLoginSuccess = (response) => {
    axios
      .post(`${API_URI}/auth/googleLogin`, response.profileObj)
      .then((response) => {
        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        props.props.history.push("/events");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onLoginFailiure = (response) => {
    console.log("login failed", response);
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_ID}
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailiure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    />
  );
}

export default LoginWithGoogle;
