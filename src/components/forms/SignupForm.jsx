import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
const API_URI = process.env.REACT_APP_API_URI;

function SignupForm(props) {
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { error, setError, setSuccess } = useContext(AuthContext);

  const handleInput = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URI}/auth/signup`, formState)
      .then((response) => {
        console.log("response from DB=>", response);
        setSuccess("Account created successfully");
        props.parentCb("login");
      })
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError(error);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={handleInput}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInput}
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleInput}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
