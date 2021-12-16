import React from "react";
import { Card } from "react-bootstrap";
import { CaretUp, CaretDown } from "react-bootstrap-icons";

function DropdownLink(props) {
  const { open, parentCb, textOpen, textClosed, textColor } = props;
  return (
    <Card.Link
    className={`text-${textColor} text-decoration-none`}
      onClick={() => parentCb(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    >
      {open && (
        <Card.Text  className="nowrap margin-zero">
          <CaretUp />
          {textOpen}
        </Card.Text>
      )}
      {!open && (
        <Card.Text  className="nowrap">
          <CaretDown/>
          {textClosed}
        </Card.Text>
      )}
    </Card.Link>
  );
}

export default DropdownLink;
