import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Button, Collapse, Card } from "react-bootstrap";
import { GeoAlt, CaretUp, CaretDown, Clipboard } from "react-bootstrap-icons";
import { useQuery } from "react-query";
import EventCard from "../components/events/EventCard";
import * as api from "../apiRequests.js";
import {AuthContext} from "../context/auth.context"

const API_URI = process.env.REACT_APP_API_URI;

export default function EventDetailsPage(props) {
console.log("event details loaded")
  const [event, setEvent] = useState(null);
  const {id} = useParams()
  const { data, status } = useQuery(["oneEvent", id ], api.fetchOneEvent);
  const {user, isLoggedIn} = useContext(AuthContext)
  return (
    <>
   {!isLoggedIn && <><h1 className="text-light">Please login to view this event</h1><br /><Link to={"/"}>Login</Link></>}
   {(data&&isLoggedIn) && <EventCard {...data} />}
   </>
  );
}