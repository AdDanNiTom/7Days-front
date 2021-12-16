import { useState, useContext } from "react";
import EventCard from "./EventCard";
import AddEvent from "../AddEvent";

function EventsListPage(props) {
  const { events, filterState } = props;
  // state for selecting which day's events to show, initial value is current day
  const [attendingChange, setAttendingChange] = useState(false);

  function changeEffect() {
    setAttendingChange(!attendingChange);
  }
  return (
    <div className="container card-width">
      {events &&
        events.map((event) => {
          return (
            <EventCard
              filterState={filterState}
              key={event._id}
              {...event}
              changeEffect={changeEffect}
              refreshCB={props.refreshCB}
            />
          );
        })}
      {events && events.length === 0 && (
        <p className="no-events">No events to show!</p>
      )}
      {/* Add event Form */}
      <AddEvent className="bg-warning" refreshCB={props.refreshCB} />
    </div>
  );
}

export default EventsListPage;
