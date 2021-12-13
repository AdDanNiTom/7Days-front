import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Card, Collapse } from "react-bootstrap";
import DropdownLink from "../../components/utilities/DropdownLink";
import SevenDays from "../../components/events/SevenDays";
import FilterByCategory from "../../components/events/FilterByCategory";
import EventsList from "../../components/events/EventsList";
import Mapbox from "../../components/events/Mapbox";
import AddEvent from "../../components/AddEvent";
import * as api from "../../apiRequests.js";
import Loading from "../../components/status/Loading";

function EventMapMerge(props) {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(null);

  // Filtering
  const [filter, setFilter] = useState({ weekday: null, category: null });

  const handleDayFilter = (day) => {
    if (day === null) {
      setFilter({ ...filter, weekday: null });
      setFilteredEvents(data);
    } else {
      setFilter({ ...filter, weekday: day });
      setFilteredEvents(data.filter((event) => event.date.weekday === day));
    }
  };
  const handleCategoryFilter = () => console.log("switchicon");
  // gets query params
  const search = useLocation().search;
  const view = new URLSearchParams(search).get("view");

  // react-query finds events from selected day
  const { data, status } = useQuery("dayEvents", api.fetchAllEvents);

  useEffect(() => {
    setFilteredEvents(data);
  }, [data]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      {/* FILTERS DROPDOWN */}
      <Card>
        <Collapse in={showFilters}>
          <Card.Header>
            <SevenDays parentCb={handleDayFilter} activeDay={filter.weekday} />
            <FilterByCategory parentCb={handleCategoryFilter} />
          </Card.Header>
        </Collapse>

        <DropdownLink
          open={showFilters}
          parentCb={setShowFilters}
          textOpen="Hide filters"
          textClosed="Show filters"
        />
      </Card>
      {/* MAIN PAGE SWITCHER*/}
      {view === "map" ? (
        <Mapbox events={filteredEvents} />
      ) : (
        <EventsList events={filteredEvents} />
      )}
      {/* Add event Form */}
      <AddEvent />
    </>
  );
}

export default EventMapMerge;
