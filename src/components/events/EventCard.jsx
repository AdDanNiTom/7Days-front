import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { Row, Button, Collapse, Card } from "react-bootstrap";
import { GeoAlt, CaretUp, CaretDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

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
  date,
  maxAtendees,
  changeEffect,
  address
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
        //setIsAttending(!isAttending);
        console.log("i'm in the 'then'")
        if (isAttending === true) setIsAttending(false);
        if (isAttending === false) setIsAttending(true);
      })
      .catch((error) => {
        console.log("i'm in the 'catch'")
        console.log(error)
      });

      changeEffect()

  };
  
  function dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }

  return (
    <Row className="m-3">
      <Card className="p-0">
        <Card.Header className="d-flex justify-content-between">
          <GeoAlt size={30} />
          <Card.Title>{title}</Card.Title>
          {(isAttending && owner._id !== user._id) && <Button onClick={handleJoinClick} variant="danger">Leave</Button>}
          {(!isAttending && owner._id !== user._id) && <Button onClick={handleJoinClick}>Join</Button>}
          {owner._id === user._id && <Link className="btn btn-warning" to={`/events/edit/${_id}`}>Edit</Link>}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {/*date ? dayOfWeekAsString(date.weekday) : "unknown date"*/}
            <h3>{icon}</h3>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {owner ? "@" + owner.username : "Anonymous"}
          </Card.Subtitle>

          <Collapse in={open}>
            <div id="example-collapse-text">
              <Card.Text>{address}</Card.Text>
              <Card.Text>
                {description ? "Event Description: " + description : "No description available"}
              </Card.Text>
              <div>
              {attendees.length > 0 && <p>Attendees:</p>}
                {attendees.map((attendee) => {
                  return <p>{attendee.username}</p>;
                })}
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
