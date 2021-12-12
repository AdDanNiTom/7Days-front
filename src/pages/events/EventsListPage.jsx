import { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "../../components/AddEvent";
import EventCard from "../../components/EventCard.jsx";
import { Pagination } from "react-bootstrap";

const API_URI = process.env.REACT_APP_API_URI;

function EventsListPage() {
  const [events, setEvents] = useState(null);
  // state for selecting which day's events to show, initial value is current day
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const getSelectedDayEvents = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events/?day=${selectedDay}`, {
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
    getSelectedDayEvents();
  }, [selectedDay]);

  let sevenDays = ["Su", "M", "T", "W", "Th", "F", "S"];

  return (
    <div className="container">
      <Pagination>
        {sevenDays.map((oneDay, index) => (
          <Pagination.Item
            onClick={() => setSelectedDay(index)}
            key={index}
            active={index === selectedDay}
          >
            {oneDay}
          </Pagination.Item>
        ))}
      </Pagination>
      {events &&
        events.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
      <AddEvent refreshEvents={getSelectedDayEvents} />
    </div>
  );
}

export default EventsListPage;
