import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";

function Mapbox() {
  const [events, setEvents] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 11,
    pitch: 15,
  });

  const API_URI = process.env.REACT_APP_API_URI;

  const getAllEvents = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URI}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response: ", response);
        setEvents(response.data.data);
      })
      .catch((error) => console.log("this isss:", error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  let coordinates = {};
  navigator.geolocation.getCurrentPosition((pos) => {
    coordinates = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
  });

  const onClickMap = (e) => {
    e.preventDefault();
    console.log(e.lngLat);
  };

  const marker = (
    <Marker
      latitude={41.38893706489965}
      longitude={2.183596863159949}
      offsetLeft={(-viewport.zoom * 5) / 2}
      offsetTop={-viewport.zoom * 5}
    >
      <div className="title">You're here!</div>
      <img
        src="https://data.whicdn.com/images/152926369/original.gif"
        alt="location"
        height={viewport.zoom * 5}
        width={viewport.zoom * 5}
      />
    </Marker>
  );
  //   const geo = navigator.geolocation.getCurrentPosition()

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v10"
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={onClickMap}
    >
      {marker}
      {events !== null
        ? events.map((event) => {
            console.log("loaded!", event.location);
            if (event.location.length === 2) {
              return (
                <Marker
                  key={event.title}
                  longitude={event.location[0]}
                  latitude={event.location[1]}
                  offsetLeft={(-viewport.zoom * 5) / 2}
                  offsetTop={-viewport.zoom * 5}
                >
                  <p className="title">{event.title}</p>
                  <img
                    src="https://user-images.githubusercontent.com/274624/98246874-2e18a800-1f73-11eb-8583-f2c1f7d293f0.gif"
                    alt="icon"
                    height={viewport.zoom * 5}
                    width={viewport.zoom * 5}
                  />
                </Marker>
              );
            }
          })
        : console.log("not loaded")}
    </ReactMapGL>
  );
}

export default Mapbox;
