import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import {AuthContext} from "../context/auth.context"
import { computeHeadingLevel } from "@testing-library/react";
const API_URI = process.env.REACT_APP_API_URI;

// We are deconstructing props object directly in the parentheses of the function
function EventCard({ _id, title, description, owner, location, attendees, icon, eventDate, maxAtendees}) {
  const [isAttending, setIsAttending] = useState(false)
  const {user} = useContext(AuthContext)

  useEffect(()=> {
    attendees.forEach(attendee=> {
    if (attendee._id === user._id) setIsAttending(true)
    })
  },[isAttending])
  const handleJoinClick = (e) => {
    e.preventDefault();
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URI}/api/events/${_id}/attendees`,{userId: user._id}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIsAttending(!isAttending)
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="EventCard card" style={{ maxWidth: "400px" }}>
      <Link to={`/events/${_id}`}>
        <h3>
          <img src={icon} alt="Event Icon" width="25px" />
          {title}
        </h3>
      </Link>
      {owner && <p>Created by: {owner.username}</p>}
      <p>{eventDate}</p>
      <p>{location}</p>
      <ul>{attendees.map((attendee)=>{
        return <li>{attendee.username}</li>
      })}</ul>
      <form onSubmit={handleJoinClick}>
     
      <button type="submit">{isAttending ? "Leave" : "Join"}</button>
      </form>
    </div>
  );
}

export default EventCard;
