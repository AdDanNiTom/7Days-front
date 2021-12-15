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
    <li className="nav-item d-flex align-items-end">
      <Link className="text-decoration-none text-light" to={path}>
        {props.children}
        {active === text ? (
          <p className="orange-text fw-light">{text}</p>
        ) : (
          <p className="fw-light">{text}</p>
        )}
      </Link>
    </li>
  );
}

export default NavbarItem;
