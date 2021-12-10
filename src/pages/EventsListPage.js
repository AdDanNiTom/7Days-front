import { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "../components/AddEvent";
import EventCard from "../components/EventCard";

const API_URI = process.env.REACT_APP_API_URI;

function EventsListPage() {
  const [events, setEvents] = useState(null);

  const getAllEvents = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response: ", response)
        setEvents(response.data)
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="EventsListPage">
    {events && events.map((event) =>  {
      console.log("event hiiii: ", event)
      return <EventCard key={event._id} {...event} />
    }
    )}
      <AddEvent refreshEvents={getAllEvents} />
    </div>
  );
}

export default EventsListPage;
