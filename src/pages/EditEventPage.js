import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

export default function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URI}/api/events/edit/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.history.push(`/events/${id}`);
      });
  };

  const deleteEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URI}/api/events/delete/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => history.push("/events"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditEventPage">
      <h3>Edit the Event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

