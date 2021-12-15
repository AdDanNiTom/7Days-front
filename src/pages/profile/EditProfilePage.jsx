import { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../context/auth.context"
import axios from "axios";
import * as api from "../../apiRequests";
//import apiRequest from "../../apiRequests"

const API_URI = process.env.REACT_APP_API_URI;

export default function EditProfilePage(props) {
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    biography: '', 
    profilePhoto: ''
  });
  // const userId = props.match.params.id;

   // ******** this method handles just the file upload ********
   const handleFileUpload = async(e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 try {
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("profilePhoto", e.target.files[0]);
  
    const response = await axios.post(`${API_URI}/api/users/upload`, uploadData)
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        console.log("response.data.secure_url", response.data.secure_url)
        setFormState((prevState)=> ({...prevState, profilePhoto: response.data.secure_url}));
    } 
    catch (err) {
      console.log("Error while uploading the file: ", err)
    }
  };
  
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    if (user){
      axios.get(`${API_URI}/api/users/${user._id}`)
      .then(response=>{
        console.log("response.data ==> ", response.data.data)
        const { firstName, lastName, biography, profilePhoto } = response.data.data
        setFormState({
          firstName,
          lastName,
          biography, 
          profilePhoto
        })
      })
    }
  }, [user])

  const handleInput = (e) => {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Get info from the form 
    const { firstName, lastName, biography, profilePhoto } = formState
    console.log("this is photo being sent to back", profilePhoto)
    const requestBody = { firstName, lastName, biography, profilePhoto };
    
    axios
      .put(`${API_URI}/api/users/${user._id}`, requestBody)
      .then((response) => {
        props.history.push(`/`);
      }); 
  };

  const deleteUser = () => {
      axios
      .delete(`${API_URI}/api/users/${user._id}`)
      .then((response) => {
        props.history.push(`/`);
      });
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit Profile - {user.username}</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Profile picture: </label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

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

        <label>Biography:</label>
        <textarea
          name="biography"
          value={formState.biography}
          onChange={handleInput}
        />

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteUser}>Delete Account</button>
    </div>
  );
}
