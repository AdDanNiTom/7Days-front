import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;
// We are deconstructing props object directly in the parentheses of the function
export default function ProfilePage() {
  const [loggedUser, setLoggedUser] = useState(null);
  const { user, logOutUser } = useContext(AuthContext);
  const {id} = useParams()

  // console.log("homepage user: ", user._id)

  // retrieve user info from DB
  useEffect(() => {
    if (user) {
      axios.get(`${API_URI}/api/users/${id}`).then((response) => {
        setLoggedUser(response.data.data);
      });
    }
  }, [user]);

  return (
    <div>
      <div>{!loggedUser && <p>Loading</p>}</div>
      <div>
        {loggedUser && (
          <div className="Profile card" style={{ maxWidth: "400px" }}>
            <div>
              <img src={loggedUser.profilePhoto} alt="Profile" />
            </div>
            <p>@{loggedUser.username}</p>
            <p>
              {loggedUser.firstName} {loggedUser.lastName}
            </p>
            <p>{loggedUser.biography}</p>
            <Link to="/profile/edit">
              <button>Edit profile</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
