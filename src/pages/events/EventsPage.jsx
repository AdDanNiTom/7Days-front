import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Card, Collapse } from "react-bootstrap";
import DropdownLink from "../../components/utilities/DropdownLink";
import SevenDays from "../../components/events/SevenDays";
import FilterByCategory from "../../components/events/FilterByCategory";
import EventsList from "../../components/events/EventsList";
import Mapbox from "../../components/events/Mapbox";
import * as api from "../../apiRequests.js";
import Loading from "../../components/status/Loading";

function EventMapMerge(props) {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(null);

  // Filtering
  const [filter, setFilter] = useState({ weekday: null, category: "all" });

  const handleFilterChange = (day, category) => {
    setFilter({ weekday: day, category: category || "all" });
    let filteredData = [...data];

    if (day !== null)
      filteredData = filteredData.filter((event) => event.date.weekday === day);

    if (category !== "all")
      filteredData = filteredData.filter((event) => event.icon === category);

    setFilteredEvents(filteredData);
  };

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
      <Card className="fixed-top">
        <Collapse in={showFilters}>
          <Card.Header>
            <SevenDays parentCb={handleFilterChange} filterState={filter} />
            <FilterByCategory
              parentCb={handleFilterChange}
              filterState={filter}
            />
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
    </>
  );
}

export default EventMapMerge;
