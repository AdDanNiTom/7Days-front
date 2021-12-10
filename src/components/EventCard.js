import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard({ _id, title, description, owner, location, attendees, icon, eventDate, maxAtendees}) {
  console.log("owner!!!: ", owner)
  return (
    <div className='row justify-content-center m-3' >
      <div className="card p-0" >
        <div class="card-header">
          <h5 class='card-title'>{title}</h5>
        </div>
        <div className='card-body' >
          <Link to={`/events/${_id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
         
            {/* <img src={icon} alt="Event Icon" width="25px" /> */}
            
        
        </Link>
      {owner && <p>Created by: {owner.username}</p>}
      <p>{eventDate}</p>
      <p>{location}</p>
      <p>{attendees}</p>
    </div>
    </div>
    </div>
  );
}

export default EventCard;
