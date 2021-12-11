import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Row, Button, Collapse, Card } from "react-bootstrap";
import { GeoAlt, CaretUp, CaretDown } from "react-bootstrap-icons";

const API_URI = process.env.REACT_APP_API_URI;

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
  const [isAttending, setIsAttending] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    attendees.forEach((attendee) => {
      if (attendee._id === user._id) setIsAttending(true);
    });
  }, [isAttending]);
  const handleJoinClick = (e) => {
    e.preventDefault();
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(
        `${API_URI}/api/events/${_id}/attendees`,
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setIsAttending(!isAttending);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Row className="m-3">
      <Card className="p-0">
        <Card.Header className="d-flex justify-content-between">
          <GeoAlt size={30} />
          <Card.Title>{title}</Card.Title>
          {isAttending && <Button onClick={handleJoinClick}>Attending</Button>}
          {!isAttending && <Button onClick={handleJoinClick}>Join</Button>}
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
              <ul>
                {attendees.map((attendee) => {
                  return <li>{attendee.username}</li>;
                })}
              </ul>
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
