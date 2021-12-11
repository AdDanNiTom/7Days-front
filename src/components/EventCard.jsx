import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Collapse, Card } from "react-bootstrap";
import { GeoAlt, CaretUp, CaretDown } from "react-bootstrap-icons";
// We are deconstructing props object directly in the parentheses of the function
function EventCard({
  _id,
  title,
  description,
  owner,
  location,
  attendees,
  icon,
  eventDate,
  maxAtendees,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Row className="m-3">
      <Card className="p-0">
        <Card.Header className="d-flex justify-content-between">
          <GeoAlt size={30} />
          <Card.Title>{title}</Card.Title>
          <Button>Join</Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {eventDate ? new Date(eventDate).toDateString() : "unknown date"}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {owner ? "@" + owner.username : "Anonymous"}
          </Card.Subtitle>

          <Collapse in={open}>
            <div id="example-collapse-text">
              <Card.Text>Location: {location}</Card.Text>
              <Card.Text>
                {description ? description : "No description available"}
              </Card.Text>
              <Card.Text>{attendees}</Card.Text>
            </div>
          </Collapse>
          <Card.Link
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {open && (
              <Card.Text>
                <CaretUp />
                Hide details
              </Card.Text>
            )}
            {!open && (
              <Card.Text>
                <CaretDown />
                Show details
              </Card.Text>
            )}
          </Card.Link>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default EventCard;
