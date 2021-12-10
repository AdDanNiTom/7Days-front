import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard({ _id, title, description, owner, location, attendees, icon, eventDate, maxAtendees}) {
  console.log("owner!!!: ", owner)
  return (
    <div className="EventCard card" style={{ maxWidth: "400px" }}>
      <Link to={`/events/${_id}`}>
        <h3>
          <img src={icon} alt="Event Icon" width="25px" />
          {title}
        </h3>
      </Link>
      {owner && <p>Created by: {owner.username}</p>}
      <p>{eventDate}</p>
      <p>{location}</p>
      <p>{attendees}</p>
    </div>
  );
}

export default EventCard;
