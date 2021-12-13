import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ReactMapGL from "react-map-gl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";

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
    const time = eventTime.toTimeString();
    const requestBody = {
      title,
      description,
      owner: user._id,
      icon,
      eventDate,
      maxAtendees,
      location,
      address,
      time
    };
    console.log("reqBody is: ", requestBody)
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
        <button type="submit">Submit</button>
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
        <label>Category:</label>
        <select
          id="emoji-dropdown"
          name="icon"
          onChange={(e) => setIcon(e.target.value)}
        >
          <option>Choose a category</option>
          <option value="🍺">🍺 Drinks</option>
          <option value="🥘">🥘 Food</option>
          <option value="⚽">⚽ Sports</option>
          <option value="🏛️">🏛️ Art & Culture</option>
          <option value="🎥 ">🎥 Cinema</option>
        </select>
        <label>Date:</label>
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
        <label>Time:</label>
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
        <label>Max Atendees:</label>
        <input
          type="number"
          name="maxAtendees"
          value={maxAtendees}
          onChange={(e) => setMaxAtendees(e.target.value)}
        />
        <div>Address: {address}</div>
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
      </form>
    </div>
  );
}
