import { useState, useEffect, useContext } from "react";
import {AuthContext} from "../context/auth.context"
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

function EditProfilePage(props) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    description: ''
  });
  // const userId = props.match.params.id;
  
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    const { firstName, lastName, description } = user
    setFormState({
      firstName: firstName,
      lastName: lastName,
      description: description
    })
  }, [user]);

  const handleInput = (e) => {
    setFormState({...formState, [e.target.name]: e.target.value})
    console.log(formState)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Get info from the form 
    const { firstName, lastName, description } = formState
    const requestBody = { firstName, lastName, description };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken)

    // Send the token through the request "Authorization" Headers
    /* axios
      .put(`${API_URI}/api/users/${user._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.history.push(`/projects/${userId}`);
      });  */
      console.log('form submitted')
  };

  const deleteUser = () => {
    /* // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URI}/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => props.history.push("/"))
      .catch((err) => console.log(err)); */
      console.log('delete user')
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit Profile - {user.username}</h3>

      <form onSubmit={handleFormSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleInput}
        />

        <label>Last Name:</label>
        <textarea
          name="lastName"
          value={formState.lastName}
          onChange={handleInput}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInput}
        />

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteUser}>Delete Account</button>
    </div>
  );
}

export default EditProfilePage;
