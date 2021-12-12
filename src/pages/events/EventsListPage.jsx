import { useState } from "react";
import AddEvent from "../../components/AddEvent";
import EventCard from "../../components/events/EventCard";
import { Pagination } from "react-bootstrap";
import { useQuery } from "react-query";
import * as api from "../../apiRequests.js";
import Loading from "../../components/status/Loading";
import Error from "../../components/status/Error";
import SevenDays from "../../components/events/SevenDays";

function EventsListPage() {
  // state for selecting which day's events to show, initial value is current day
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  // react-query finds events from selected day
  const { data, status } = useQuery(
    ["dayEvents", selectedDay],
    api.fetchSelectedDayEvents
  );

  // handle day switching
  const handleDaySwitch = (i) => setSelectedDay(i);

  if (status === "loading") return <Loading />;
  else if (status === "error") return <Error />;
  else
    return (
      <div className="container">
        <SevenDays parentCb={handleDaySwitch} selectedDay={selectedDay} />
        {data &&
          data.map((event) => {
            return <EventCard key={event._id} {...event} />;
          })}
        <AddEvent
          refreshEvents={() => api.fetchSelectedDayEvents(selectedDay)}
        />
      </div>
    );
}

export default EventsListPage;
