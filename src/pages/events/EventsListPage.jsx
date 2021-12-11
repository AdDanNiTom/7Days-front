import { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "../../components/AddEvent";
import EventCard from "../../components/EventCard.jsx";
import { Pagination } from "react-bootstrap";

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
        setEvents(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, []);

  let selectedDay = 0;
  let sevenDays = ["M", "T", "W", "Th", "F", "S", "Su"];

  return (
    <div className="container">
      <Pagination>
        {sevenDays.map((oneDay, index) => (
          <Pagination.Item key={index} active={index === selectedDay}>
            {oneDay}
          </Pagination.Item>
        ))}
      </Pagination>
      {events &&
        events.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
      <AddEvent refreshEvents={getAllEvents} />
    </div>
  );
}

export default EventsListPage;
