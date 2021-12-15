import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ReactMapGL from "react-map-gl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";
import { Row, Col, Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

Geocode.setLanguage("en");

const API_URI = process.env.REACT_APP_API_URI;
Geocode.setApiKey("AIzaSyBfG1BvX0ET5AGbzG9FvUiBqpA_S4AeXhk");

export default function AddEvent(props) {
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //CONTEXT
  const { user } = useContext(AuthContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = eventTime;
    const requestBody = {
      title,
      description,
      owner: user._id,
      icon,
      eventDate,
      maxAtendees,
      location,
      address,
      time,
    };
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URI}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setIcon("");
        setMaxAtendees("");
        setEventDate("");
        props.refreshEvents();
      })
      .catch((error) => console.log(error));
  };

  const onClickMap = (e) => {
    e.preventDefault();
    setLocation(e.lngLat);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <PlusCircle size={50} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Title */}
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
            {/* Description */}
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
                {/* Category */}
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
                    <option value="🙋">🙋 Open to plans</option>
                    <option value="🍺">🍺 Drinks</option>
                    <option value="☕">☕ Coffee</option>
                    <option value="🥘">🥘 Food</option>
                    <option value="🛍️">🛍️ Shopping</option>
                    <option value="🎉">🎉 Clubbing</option>
                    <option value="⚽">⚽ Sports</option>
                    <option value="🧘">🧘 Yoga</option>
                    <option value="🏖️">🏖️ Beach</option>
                    <option value="🏛️">🏛️ Art & Culture</option>
                    <option value="🎥 ">🎥 Movies</option>
                    <option value="🎸">🎸 Music</option>
                    <option value="🎲">🎲 Board games</option>
                    <option value="🎮">🎮 Computer games</option>
                    <option value="🤷">🤷 Other</option>
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
            {/* Date & Time */}
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
                    maxDate={
                      new Date(new Date().setDate(new Date().getDate() + 6))
                    }
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
