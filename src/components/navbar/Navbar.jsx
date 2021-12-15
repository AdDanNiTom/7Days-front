import NavbarItem from "./NavbarItem";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../status/Loading.jsx";
import { useLocation } from "react-router-dom";
import { Map, MapFill, CalendarEvent, Person } from "react-bootstrap-icons";

function Navbar() {
  const location = useLocation();
  let activeItem = null;
  if (location.pathname.includes("events")) {
    if (location.search.includes("map")) {
      activeItem = "Map";
    } else {
      activeItem = "Events";
    }
  } else {
    activeItem = "Profile";
  }

  const svgSize = 20;
  const { isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <nav
        className="navbar position-fixed zindex-fixed bottom-0 w-100 navbar-dark bg-dark"
        style={{ zIndex: 3 }}
      >
        <ul className="nav justify-content-evenly w-100">
          <NavbarItem active={activeItem} text="Map" page="events" view="map">
            <Map
              color={activeItem === "Map" ? "orange" : "white"}
              size={svgSize}
            />
          </NavbarItem>
          <NavbarItem
            active={activeItem}
            text="Events"
            page="events"
            view="list"
          >
            <CalendarEvent
              color={activeItem === "Events" ? "orange" : "white"}
              size={svgSize}
            />
          </NavbarItem>
          <NavbarItem
            active={activeItem}
            text="Profile"
            page="profile"
            state={null}
          >
            <Person
              color={activeItem === "Profile" ? "orange" : "white"}
              size={svgSize}
            />
          </NavbarItem>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
