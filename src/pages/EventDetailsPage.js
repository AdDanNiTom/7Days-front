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
        <div>
        <EventCard key={id} {...event} />
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
