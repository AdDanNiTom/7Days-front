import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard({ _id, icon, title, eventDate, description, attendees, location}) {
  return (
    <div className="EventCard card" style={{ maxWidth: "400px" }}>
      <Link to={`/event/${_id}`}>
        <h3>
          {icon}
          {title}
        </h3>
      </Link>
      <p>{eventDate}</p>
      <p>{description}</p>
      <p>{attendees}</p>
      <p>{location}</p>
    </div>
  );
}

export default EventCard;
