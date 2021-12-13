import { useState } from "react";
import EventCard from "./EventCard";

function EventsListPage(props) {
  const { events } = props;
  // state for selecting which day's events to show, initial value is current day
  const [attendingChange, setAttendingChange] = useState(false);

  function changeEffect() {
    setAttendingChange(!attendingChange);
  }
  return (
    <div className="container">
      {events &&
        events.map((event) => {
          return (
            <EventCard key={event._id} {...event} changeEffect={changeEffect} />
          );
        })}
    </div>
  );
}

export default EventsListPage;
