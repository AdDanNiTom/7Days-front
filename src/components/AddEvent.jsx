import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ReactMapGL, { Marker } from "react-map-gl";

const API_URI = process.env.REACT_APP_API_URI;

export default function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [maxAtendees, setMaxAtendees] = useState("");
  const [location, setLocation] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 11,
    pitch: 15,
  });

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      description,
      owner: user._id,
      icon,
      eventDate,
      maxAtendees,
      location,
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
    console.log(e.lngLat);
    setLocation(e.lngLat);
  };

  return (
    <div className="AddEvent">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Icon:</label>
        <textarea
          type="text"
          name="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <label>Event Date:</label>
        <input
          type="date"
          name="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label>Max Atendees:</label>
        <input
          type="number"
          name="maxAtendees"
          value={maxAtendees}
          onChange={(e) => setMaxAtendees(e.target.value)}
        />
        <label>Location:</label> <br />
        <div>Latitude: {location[0]}</div>
        <div>Longitude:{location[1]}</div>
        <br />
        <div className="minimap">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
            mapStyle="mapbox://styles/mapbox/streets-v10"
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
            onClick={onClickMap}
          ></ReactMapGL>
        </div>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
