import { useState } from "react";
import AddEvent from "../../components/AddEvent";
import EventCard from "../../components/events/EventCard";
import { Pagination } from "react-bootstrap";
import { useQuery } from "react-query";
import * as api from "../../apiRequests.js";
import Loading from "../../components/status/Loading";
import Error from "../../components/status/Error";
import SevenDays from "../../components/events/SevenDays";
import FilterByCategory from "../../components/events/FilterByCategory";

function EventsListPage() {
  // state for selecting which day's events to show, initial value is current day
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attendingChange, setAttendingChange] = useState(false)
  // react-query finds events from selected day
  const { data, status } = useQuery(
    ["dayEvents", selectedDay, selectedCategory, attendingChange],
  // react-query finds events from selected day
    api.fetchSelectedDayEvents
  );


  // handle day switching
  const handleDaySwitch = (i) => setSelectedDay(i);
  const handleCategorySwitch = (i) => setSelectedCategory(i);

  function changeEffect() {
    setAttendingChange(!attendingChange)
  }

  if (status === "loading") return <Loading />;
  else if (status === "error") return <Error />;
  else
    return (
      <div className="container">
        <SevenDays parentCb={handleDaySwitch} selectedDay={selectedDay} />
        <FilterByCategory parentCb={handleCategorySwitch} selectedCategory={selectedCategory}/>
        {data &&
          data.map((event) => {
            return <EventCard key={event._id} {...event} changeEffect={changeEffect} />;
          })}
        <AddEvent
          refreshEvents={() => api.fetchSelectedDayEvents(selectedDay, selectedCategory)}
        />
      </div>
    );
}

export default EventsListPage;
