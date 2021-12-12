import React from "react";
import { Link } from "react-router-dom";

function NavbarItem(props) {
  const { text } = props;
  return (
    <li className="nav-item d-flex align-items-end">
      <Link className="text-decoration-none text-light" to={"/" + props.page}>
        {props.children}
        <p className="border-bottom fw-light">{text}</p>
      </Link>
    </li>
  );
}

export default NavbarItem;
