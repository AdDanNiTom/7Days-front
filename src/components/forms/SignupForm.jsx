import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        console.log(formState)
        console.log("response from DB=>", response);
        setSuccess("Account created successfully");
        props.parentCb("login");
      })
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError(error);
      });
  };

  return (
      <Form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
      {/****** Email field ******/}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-white w-100">Create your account:</Form.Label>
        <Form.Control
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
        <Form.Control
          required
          type="password"
          placeholder="Password"
          name="password"
          value={formState.password}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          required
          type="text"
          placeholder="Choose your username"
          name="username"
          value={formState.username}
          onChange={handleInput}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button> <hr />
    </Form>
  );
}

export default SignupForm;
