import React from "react";
import { Card } from "react-bootstrap";
import { CaretUp, CaretDown } from "react-bootstrap-icons";

function DropdownLink(props) {
  const { open, parentCb, textOpen, textClosed } = props;
  return (
    <Card.Link
      onClick={() => parentCb(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    >
      {open && (
        <Card.Text>
          <CaretUp />
          {textOpen}
        </Card.Text>
      )}
      {!open && (
        <Card.Text>
          <CaretDown />
          {textClosed}
        </Card.Text>
      )}
    </Card.Link>
  );
}

export default DropdownLink;
