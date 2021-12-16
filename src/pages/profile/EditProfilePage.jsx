import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import * as api from "../../apiRequests";
//import apiRequest from "../../apiRequests"

const API_URI = process.env.REACT_APP_API_URI;

export default function EditProfilePage(props) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    biography: "",
    profilePhoto: "",
  });
  // const userId = props.match.params.id;

  // ******** this method handles just the file upload ********
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    try {
      const uploadData = new FormData();

      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("profilePhoto", e.target.files[0]);

      const response = await axios.post(
        `${API_URI}/api/users/upload`,
        uploadData
      );
      // console.log("response is: ", response);
      // response carries "secure_url" which we can use to update the state
      console.log("response.data.secure_url", response.data.secure_url);
      setFormState((prevState) => ({
        ...prevState,
        profilePhoto: response.data.secure_url,
      }));
    } catch (err) {
      console.log("Error while uploading the file: ", err);
    }
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios.get(`${API_URI}/api/users/${user._id}`).then((response) => {
        console.log("response.data ==> ", response.data.data);
        const { firstName, lastName, biography, profilePhoto } =
          response.data.data;
        setFormState({
          firstName,
          lastName,
          biography,
          profilePhoto,
        });
      });
    }
  }, [user]);

  const handleInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Get info from the form
    const { firstName, lastName, biography, profilePhoto } = formState;
    console.log("this is photo being sent to back", profilePhoto);
    const requestBody = { firstName, lastName, biography, profilePhoto };

    axios
      .put(`${API_URI}/api/users/${user._id}`, requestBody)
      .then((response) => {
        props.history.push(`/`);
      });
  };

  const deleteUser = () => {
    axios.delete(`${API_URI}/api/users/${user._id}`).then((response) => {
      props.history.push(`/`);
    });
  };

  return (
    <div className="EditProjectPage">
      <Form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleFormSubmit}
      >
        <Form.Group className="text-white" controlId="formBasicEmail">
          <h4 className="d-flex justify-content-start">Edit Profile - {formState.firstName}</h4>
          <Form.Label className="mb-3 text-white d-flex justify-content-start">
            Profile picture:
          </Form.Label>
          <Form.Control
            className="m-0"
            type="file"
            name="profilePhoto"
            onChange={(e) => handleFileUpload(e)}
          />
          <Form.Label className="mb-3 text-white d-flex justify-content-start">
            First Name:
          </Form.Label>
          <Form.Control
            className="m-0"
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleInput}
          />
          <Form.Label className="mb-3 text-white d-flex justify-content-start">
            Last Name:
          </Form.Label>
          <Form.Control
            className="m-0"
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleInput}
          />
          <Form.Label className="mb-3 text-white d-flex justify-content-start">
            Biography:
          </Form.Label>
          <Form.Control
            className="m-0"
            as="textarea"
            style={{ height: "100px" }}
            name="biography"
            value={formState.biography}
            onChange={handleInput}
          />
          <br />
          <div className="form-buttons">
            <Button variant="warning" type="submit">
              Update Profile
            </Button>
            <Button variant="danger" onClick={deleteUser}>
              Delete Account
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
