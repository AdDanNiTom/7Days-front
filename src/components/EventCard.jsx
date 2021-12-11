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
          <Card.Title>{owner ? "@" + owner.username : "Anonymous"}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {eventDate ? typeof eventDate : "unknown date"}
          </Card.Subtitle>
          <p>Location: {location}</p>
          <p>{description ? description : "No description available"}</p>
          <p>{attendees}</p>

          <Collapse in={open}>
            <div id="example-collapse-text">
              <div className="card card-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
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
