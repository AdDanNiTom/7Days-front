import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMapGL from "react-map-gl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import Geocode from "react-geocode";

const API_URI = process.env.REACT_APP_API_URI;

export default function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [maxAtendees, setMaxAtendees] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState(new Date());
  const [address, setAddress] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 11,
    pitch: 15,
  });
  const history = useHistory()

  const {id} = useParams()
  

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events/${props.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data.data;
        console.log("oneEvent:", oneEvent)
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
        setIcon(oneEvent.icon);
        setEventDate(new Date(oneEvent.date.fullDate))
        setMaxAtendees(oneEvent.maxAtendees)
        setLocation(oneEvent.location)
        setEventTime(new Date(oneEvent.time))
        setAddress(oneEvent.address)
        setViewport({
          latitude: oneEvent.location[1],
          longitude: oneEvent.location[0],
          height: window.innerHeight,
          width: window.innerWidth,
          zoom: 11,
          pitch: 15,
        })
      })
      .catch((error) => console.log(error));
    }, [props.id]);

    useEffect(() => {
    Geocode.fromLatLng(location[1], location[0]).then(
      (response) => {
        const geoAddress = response.results[0].formatted_address;
        console.log(geoAddress);
        setAddress(geoAddress);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [location]);
    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const requestBody = { title, description, icon, eventDate, maxAtendees, location, eventTime, address, viewport };
      
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      
      // Send the token through the request "Authorization" Headers
      axios
      .put(`${API_URI}/api/events/${props.id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //props.history.push(`/events`);
        props.showCB()
      });
    };

    const deleteEvent = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      
      // Send the token through the request "Authorization" Headers
      axios
      .delete(`${API_URI}/api/events/${props.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        //history.push("/events")
        props.showCB()
      })
      .catch((err) => console.log(err));
    };
    
    const onClickMap = (e) => {
      e.preventDefault();
      console.log(e.lngLat);
      setLocation(e.lngLat);
    };
    
    return (
      <Modal show={props.show} onHide={props.showCB}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
      <Modal.Body>
        <Row>
        <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingTitleInput"
                  label="Event title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your event"
                  />
                </FloatingLabel>
              </Form.Group>
        </Row>
        <Row>
        <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingTitleInput"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
        </Row>
        <Row>
        <Col>
        <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlSelect1"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    id="emoji-dropdown"
                    name="icon"
                    onChange={(e) => setIcon(e.target.value)}
                  >
                    {icon === "🙋" ? <option selected="selected" value="🙋">🙋 Open to plans</option> : <option value="🙋">🙋 Open to plans</option>} 
          {icon === "🍺" ? <option selected="selected" value="🍺">🍺 Drinks</option> : <option value="🍺">🍺 Drinks</option>} 
          {icon === "☕" ? <option selected="selected" value="☕">☕ Coffee</option> : <option value="☕">☕ Coffee</option>} 
          {icon === "🥘" ? <option selected="selected" value="🥘">🥘 Food</option> : <option value="🥘">🥘 Food</option>} 
          {icon === "🛍️" ? <option selected="selected" value="🛍️">🛍️ Shopping</option> : <option value="🛍️">🛍️ Shopping</option>} 
          {icon === "🎉" ? <option selected="selected" value="🎉">🎉 Clubbing</option> : <option value="🎉">🎉 Clubbing</option>} 
          {icon === "⚽" ? <option selected="selected" value="⚽">⚽ Sports</option> : <option value="⚽">⚽ Sports</option>} 
          {icon === "🧘" ? <option selected="selected" value="🧘">🧘 Yoga</option> : <option value="🧘">🧘 Yoga</option>} 
          {icon === "🏖️" ? <option selected="selected" value="🏖️">🏖️ Beach</option> : <option value="🏖️">🏖️ Beach</option>} 
          {icon === "🏛️" ? <option selected="selected" value="🏛️">🏛️ Art & Culture</option> : <option value="🏛️">🏛️ Art & Culture</option>} 
          {icon === "🎥" ? <option selected="selected" value="🎥">🎥 Movies</option> : <option value="🎥">🎥 Movies</option>}
          {icon === "🎸" ? <option selected="selected" value="🎸">🎸 Music</option> : <option value="🎸">🎸 Music</option>}
          {icon === "🎲" ? <option selected="selected" value="🎲">🎲 Board games</option> : <option value="🎲">🎲 Board games</option>}
          {icon === "🎮" ? <option selected="selected" value="🎮">🎮 Computer games</option> : <option value="🎮">🎮 Computer games</option>}
          {icon === "🤷" ? <option selected="selected" value="🤷">🤷 Other</option> : <option value="🤷">🤷 Other</option>}
        
                  </Form.Select>
          </Form.Group>
              

        </Col>
        <Col>
                <Form.Group className="mb-3" controlId="formMaxAttendees">
                  <Form.Label>Max Atendees</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxAtendees"
                    value={maxAtendees}
                    onChange={(e) => setMaxAtendees(e.target.value)}
                  />
                </Form.Group>
              </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <label>Date</label>
        <DatePicker
          className="datepicker"
          selected={eventDate}
          onChange={(eventDate) => setEventDate(eventDate)}
          name="eventDate"
          value={eventDate}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}
          dateFormat="MMMM d, yyyy"
        />
        </Col>
        <Col>
                  <label>Time</label>
        <DatePicker
          selected={eventTime}
          onChange={(eventTime) => setEventTime(eventTime)}
          showTimeSelect
          name="time"
          value={eventTime}
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        </Col>
        </Row>
        </Form.Group>
        <Row className="d-flex justify-content-center">
        <div className="minimap p-0 w-75">
        <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
                  mapStyle="mapbox://styles/adrianaranda/ckx69z5kp7uyw15s9j733ujf0"
                  width="100%"
                  height="100%"
                  onViewportChange={(viewport) => setViewport(viewport)}
                  onClick={onClickMap}
                ></ReactMapGL>
        </div>
        <Form.Control
                className="w-75 mt-2"
                type="text"
                placeholder={address}
                readOnly
              />
            </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button className="btn-warning" type="submit">Update Event</Button>
      <Button className="btn-danger" onClick={deleteEvent}>Delete Event</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}

