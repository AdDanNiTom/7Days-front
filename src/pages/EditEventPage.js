import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMapGL from "react-map-gl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      .get(`${API_URI}/api/events/${id}`, {
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
    }, [id]);
    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const requestBody = { title, description, icon, eventDate, maxAtendees, location, eventTime, address, viewport };
      
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      
      // Send the token through the request "Authorization" Headers
      axios
      .put(`${API_URI}/api/events/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.history.push(`/events`);
      });
    };

    const deleteEvent = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      
      // Send the token through the request "Authorization" Headers
      axios
      .delete(`${API_URI}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => history.push("/events"))
      .catch((err) => console.log(err));
    };
    
    const onClickMap = (e) => {
      e.preventDefault();
      console.log(e.lngLat);
      setLocation(e.lngLat);
    };
    
    return (
    <div className="EditEventPage">
      <h3>Edit the Event</h3>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Update Event</button>
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
        </div>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
      <Link className="btn btn-primary" to="/events">Back to Events</Link>
    </div>
  );
}

