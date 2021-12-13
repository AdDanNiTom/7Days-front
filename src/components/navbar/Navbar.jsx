import NavbarItem from "./NavbarItem";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../status/Loading.jsx";
import { Map, CalendarEvent, Person } from "react-bootstrap-icons";

function Navbar() {
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
          <NavbarItem text="Map" page="events" view="map">
            <Map size={svgSize} />
          </NavbarItem>
          <NavbarItem text="Events" page="events" view="list">
            <CalendarEvent size={svgSize} />
          </NavbarItem>
          <NavbarItem text="Profile" page="profile" state={null}>
            <Person size={svgSize} />
          </NavbarItem>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
