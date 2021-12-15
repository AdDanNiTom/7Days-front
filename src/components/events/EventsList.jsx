import { useState, useContext } from "react";
import EventCard from "./EventCard";
import AddEvent from "../AddEvent";


function EventsListPage(props) {

  const { events } = props;
  // state for selecting which day's events to show, initial value is current day
  const [attendingChange, setAttendingChange] = useState(false);

  function changeEffect() {
    setAttendingChange(!attendingChange);
  }
  return (
    <div className="container list-top-margin">
      {events &&
        events.map((event) => {
          return (
            <EventCard key={event._id} {...event} changeEffect={changeEffect} refreshCB={props.refreshCB} />
          );
        })}
      {/* Add event Form */}
      <AddEvent refreshCB={props.refreshCB} />
    </div>
  );
}

export default EventsListPage;
