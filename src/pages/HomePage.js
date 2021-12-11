import { useState, useContext, useEffect } from 'react';
import {AuthContext} from "../context/auth.context"
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URI = process.env.REACT_APP_API_URI;

function HomePage(props) {
  const [loggedUser, setLoggedUser] = useState(null)
  const {user} = useContext(AuthContext)

  // console.log("homepage user: ", user._id)

  // retrieve user info from DB
  useEffect(() => {
    if (user){
      axios.get(`${API_URI}/api/users/${user._id}`)
      .then(response=>{
        setLoggedUser(response.data.data)
        console.log(response.data.data)
      })
    }
  }, [user])

  return (
    <div>
      <h1>7Days</h1>
      <p>{loggedUser ?  loggedUser.username : "noone logged in"}</p>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>
  );
}

export default HomePage;