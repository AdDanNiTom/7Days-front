import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function NavbarItem(props) {
  const { text } = props;
  const { user } = useContext(AuthContext);
  
  console.log("user",user)
  if (props.page === "profile") {
  return (
    <li className="nav-item d-flex align-items-end">
      <Link className="text-decoration-none text-light" to={"/profile/" + user._id}>
        {props.children}
        <p className="border-bottom fw-light">{text}</p>
      </Link>
    </li>
  );
  } else {
    return (
      <li className="nav-item d-flex align-items-end">
        <Link className="text-decoration-none text-light" to={"/" + props.page}>
          {props.children}
          <p className="border-bottom fw-light">{text}</p>
        </Link>
      </li>
    );
  }
}

export default NavbarItem;
