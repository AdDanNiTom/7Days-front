import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Button, Collapse, Card } from "react-bootstrap";
import { GeoAlt, CaretUp, CaretDown, Clipboard } from "react-bootstrap-icons";


const API_URI = process.env.REACT_APP_API_URI;

export default function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const {id} = useParams()
  console.log("id: ", id)

  const getEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (

    <div>
      {event && (
    <Row className="m-3">
      <Card className="p-0">
        <Card.Header>
          <Card.Title>{event.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title><h3>{event.icon}</h3></Card.Title>
          <Card.Subtitle><Link to={"/profile/"+event.owner._id}>@{event.owner.username}</Link></Card.Subtitle>
          <Card.Text>{event.address}</Card.Text>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text>
          {event.attendees.length > 0 && <p>Attendees:</p>}
          {event.attendees.map((attendee)=>{
           return <p>{attendee.username}</p>
           })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
      )}
    </div>
  );
}
