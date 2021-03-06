import { useState, useContext } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

function LoginForm(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const { logInUser, error, setError } = useContext(AuthContext);

  const handleInput = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URI}/auth/login`, formState)
      .then((response) => {
        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        props.history.push("/events?view=list");
      })
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError(error);
      });
  };
  return (
    <Form
      className="d-flex flex-column justify-content-center align-items-center"
      onSubmit={handleSubmit}
    >
      {/****** Email field ******/}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-white">or use credentials</Form.Label>
        <Form.Control className="m-0"
          required
          type="email"
          placeholder="Enter email"
          name="email"
          value={formState.email}
          onChange={handleInput}
        />
      </Form.Group>
      {/****** Password field ******/}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control className="m-0"
          required
          type="password"
          placeholder="Password"
          name="password"
          value={formState.password}
          onChange={handleInput}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>{" "}
      <hr />
      <Row>
        <Form.Text className="text-white">
          <p className="mb-0 text-white">Still don't have an account?</p>
          <Link
            className="text-warning"
            to="#"
            onClick={() => props.parentCb("signup")}
          >
            Signup
          </Link>
        </Form.Text>
      </Row>
    </Form>
  );
}

export default LoginForm;
