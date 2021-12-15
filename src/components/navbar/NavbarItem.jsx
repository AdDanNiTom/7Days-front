import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function NavbarItem(props) {
  const { text, page, view, active } = props;
  const { user } = useContext(AuthContext);

  console.log("make me orange", active === text);

  let path = null;

  if (page === "profile") {
    path = user ? "/profile/" + user._id : "/";
  } else {
    path = "/" + page + "?view=" + view;
  }
  return (
    <li className="nav-item">
      <Link
        className="text-decoration-none text-light d-flex flex-column justify-content-center align-items-center m-auto py-2"
        to={path}
      >
        {props.children}
        {active === text ? (
          <p className="orange-text fw-light m-0">{text}</p>
        ) : (
          <p className="fw-light m-0">{text}</p>
        )}
      </Link>
    </li>
  );
}

export default NavbarItem;
