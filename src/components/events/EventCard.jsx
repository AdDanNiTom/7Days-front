import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import {
  Row,
  Button,
  Collapse,
  Card,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import { Chat, Clipboard } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import DropdownLink from "../utilities/DropdownLink";
import ReactMapGL, { Marker } from "react-map-gl";
import pin from "../../images/pin.png";
import EditEventPage from "../../pages/EditEventPage";
import CommentsModal from "../../components/events/CommentsModal";

const API_URI = process.env.REACT_APP_API_URI;

// We are deconstructing props object directly in the parentheses of the function
export default function EventCard({
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
  address,
  refreshCB,
  filterState,
  comments,
}) {
  const [isAttending, setIsAttending] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: location[1],
    longitude: location[0],
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 14,
    pitch: 15,
  });

  const { user } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
        if (isAttending === true) setIsAttending(false);
        if (isAttending === false) setIsAttending(true);
        refreshCB();
      })
      .catch((error) => {
        console.log(error);
      });

    changeEffect();
  };

  function dayOfWeekAsString(dayIndex) {
    return (
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayIndex] || ""
    );
  }
  return (
    <Row className="m-3 singleCard card-width">
      <EditEventPage
        refreshCB={refreshCB}
        showCB={handleClose}
        show={show}
        id={_id}
      />
      <div className="single-card">
        <Card className="p-0 single-card-content w-100">
          <Card.Header className="d-flex justify-content-between align-items-center">
            {/* <GeoAlt size={30} /> */}
            <div className="d-flex justify-content">
              <div className="icon-in-card">{icon} </div>
              <Card.Title className="m-0">{title}</Card.Title>
            </div>
            {isAttending && owner._id !== user._id && (
              <Button
                className="w-25"
                onClick={handleJoinClick}
                variant="danger"
              >
                Leave
              </Button>
            )}
            {!isAttending && owner._id !== user._id && (
              <Button className="w-25" onClick={handleJoinClick}>
                Join
              </Button>
            )}
            {owner._id === user._id && (
              <Button className="btn btn-warning w-25" onClick={handleShow}>
                Edit
              </Button>
            )}
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-baseline w-100">
            <Card.Subtitle className="mb-2 text-muted text-decoration-none">
              <Link
                className="owner-name text-white text-decoration-none"
                to={"/profile/" + owner._id}
              >
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid white",
                  }}
                  src={owner.profilePhoto}
                  alt="profile-pic"
                />
                {"  "}@{owner.username}
              </Link>
            </Card.Subtitle>
            <Card.Text className="card-description">{description}</Card.Text>

            <Collapse in={open}>
              <div id="example-collapse-text" className="w-100">
                {/* <Card.Text>{address}</Card.Text> */}
                <br />
                <p className="mb-1">Location:</p>
                {location.length === 2 ? (
                  <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
                    mapStyle="mapbox://styles/adrianaranda/ckx69z5kp7uyw15s9j733ujf0"
                    width="100%"
                    height="30vh"
                    onViewportChange={(viewport) => setViewport(viewport)}
                    // onClick={onClickMap}
                  >
                    <Marker
                      latitude={location[1]}
                      longitude={location[0]}
                      offsetLeft={(-viewport.zoom * 5) / 2}
                      offsetTop={-viewport.zoom * 5}
                    >
                      <img
                        src={pin}
                        alt="location"
                        height={viewport.zoom * 5}
                        width={viewport.zoom * 5}
                      />
                    </Marker>
                  </ReactMapGL>
                ) : (
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/no-location-1-832962.png"
                    alt="logoidontknow"
                  />
                )}{" "}
                <br />
                <div>
                  {attendees.length > 0 && (
                    <Row>
                      <p>
                        Going:
                        {attendees.map((attendee) => {
                          return (
                            <OverlayTrigger
                              key={attendee._id}
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                  {attendee.username}
                                </Tooltip>
                              }
                            >
                              <img
                                className="mx-1"
                                src={attendee.profilePhoto}
                                alt="profile pic"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  border: "1px solid white",
                                }}
                              />
                            </OverlayTrigger>
                          );
                        })}
                      </p>
                    </Row>
                  )}
                </div>
                <Button
                  className="btn-light btn-sm mb-3"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://app-seven.herokuapp.com/events/${_id}`
                    );
                  }}
                >
                  <Clipboard size={20} />
                  {"  "}Share
                </Button>
              </div>
            </Collapse>
            <Row className="w-100">
              <Col>
                <DropdownLink
                  textColor="white"
                  className="dropdowns-card"
                  open={open}
                  parentCb={setOpen}
                  textOpen="Hide details"
                  textClosed="Show details"
                />
              </Col>
              <Col>
                <CommentsModal comments={comments} eventId={_id} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
}
