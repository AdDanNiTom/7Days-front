import NavbarItem from "./NavbarItem";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../status/Loading.jsx";

function Navbar() {
  const svgSize = 20
  const { isLoading } = useContext(AuthContext);
  if (isLoading) {
  return <Loading />
} else {
  return (
    <nav className="navbar position-fixed zindex-fixed bottom-0 w-100 navbar-dark bg-dark" style={{zIndex: 3}} >
          <ul className="nav justify-content-evenly w-100">
          <NavbarItem text='Map' page='maps'>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width={svgSize}
          height={svgSize}
          fill="currentColor"
          className="bi bi-map"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
          />
        </svg>
          </NavbarItem>
          <NavbarItem text='Events' page='events'>
              <svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
          </NavbarItem>
          <NavbarItem text='Profile' page='profile'>
              <svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
          </NavbarItem>
          </ul>  
    </nav>
  );
}
}

export default Navbar;