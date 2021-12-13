import React, { useState } from "react";
import { Card, Collapse } from "react-bootstrap";
import DropdownLink from "../../components/utilities/DropdownLink";
import SevenDays from "../../components/events/SevenDays";
import FilterByCategory from "../../components/events/FilterByCategory";

function EventMapMerge(props) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Card>
      <Collapse in={showFilters}>
        <Card.Header>
          <SevenDays />
          <FilterByCategory />
        </Card.Header>
      </Collapse>

      <DropdownLink
        open={showFilters}
        parentCb={setShowFilters}
        textOpen="Hide filters"
        textClosed="Show filters"
      />
    </Card>
  );
}

export default EventMapMerge;
