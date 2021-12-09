import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

export default function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const eventId = props.match.params.id;

  const getEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data;
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
        <div>
          <h1>{event.title}</h1>
        </div>
      )}

      <Link to="/events">
        <button>Back to Events</button>
      </Link>

      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
}
