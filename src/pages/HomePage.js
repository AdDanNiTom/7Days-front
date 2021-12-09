import { useContext } from 'react';
import {AuthContext} from "../context/auth.context"

function HomePage(props) {
const {user } = useContext(AuthContext)
  console.log("user: ", user)
  return (
    <div>
      <h1>7Days</h1>
      <p>{user ?  user.username : "noone logged in"}</p>
    </div>
  );
}

export default HomePage;