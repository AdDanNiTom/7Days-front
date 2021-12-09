import { useState } from "react";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

export default function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [maxAtendees, setMaxAtendees] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, icon, eventDate, maxAtendees };
    console.log("requestBody:",requestBody)

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URI}/api/events/new`, requestBody, {
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


