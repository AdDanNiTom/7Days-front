import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

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
          <Card className="profile-card">
          <Card.Body>
              <img src={loggedUser.profilePhoto} alt="Profile" className="profile-pic" />
              <br/>
              <br/>
          <Card.Title>
            <p>@{loggedUser.username}</p>
          </Card.Title>
          <Card.Subtitle>
            <p>
              {loggedUser.firstName} {loggedUser.lastName}
            </p>
          </Card.Subtitle>
          <Card.Text>
          <p>{loggedUser.biography}</p>
          </Card.Text>
            <Link to="/profile/edit">
              <Button variant="warning">Edit profile</Button>
            </Link>
            <br/>
            <br/>
            <Button variant="danger" onClick={logOutUser} className="margin-bottom-profile">Logout</Button>
          </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}
