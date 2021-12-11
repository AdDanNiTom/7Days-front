import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";


const API_URI = process.env.REACT_APP_API_URI;

export default function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const {id} = useParams()
  console.log("id: ", id)

  const getEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="EventDetails">
      {event && (
        <div className="Event Details" style={{ maxWidth: "400px" }}>
      <Link to={`/events/${event._id}`}>
        <h3>
          <img src={event.icon} alt="Event Icon" width="25px" />
          {event.title}
        </h3>
      </Link>
      
     { event.owner ? <p>Created by: {event.owner.username}</p> : <p>Error: No owner for this event.</p>}
      <p>Date: {event.eventDate}</p>
      <p>Description: {event.description}</p>
      <p>Location: {event.location}</p>
      <ul>Attendees: {event.attendees.map((attendee)=>{
        return <li>{attendee.username}</li>
      })}</ul>
      <p>Icon: {event.icon}</p>
      <p>Max Atendees: {event.maxAtendees}</p>
    </div>
      )}

      <Link to="/events">
        <button>Back to Events</button>
      </Link>

      <Link to={`/events/edit/${id}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
}
