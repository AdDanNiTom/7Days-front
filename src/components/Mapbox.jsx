import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useQuery } from "react-query";
import * as api from "../apiRequests";

function Mapbox() {
  // const [events, setEvents] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 11,
    pitch: 15,
  });

  const { data, isLoading, isError } = useQuery("events", api.fetchAllEvents);

  const currentCoord = [];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      currentCoord.push(pos.coords.latitude, pos.coords.longitude);
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

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
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Simpleicons_Places_map-marker-point.svg/2048px-Simpleicons_Places_map-marker-point.svg.png"
        alt="location"
        height={viewport.zoom * 5}
        width={viewport.zoom * 5}
      />
    </Marker>
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  if (isLoading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  if (isError) {
    return <h1>ERROR. COULDN'T RETRIEVE DATA</h1>;
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v10"
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={onClickMap}
    >
      
      {data?.map((event) => {
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
              <button
                className="icon-button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedEvent(event);
                }}
              >
                {event.icon}
              </button>
            </Marker>
          );
        }
      })}

      {selectedEvent ? (
        <Popup
          latitude={selectedEvent.location[1]}
          longitude={selectedEvent.location[0]}
          onClose={() => {
            setSelectedEvent(null);
          }}
        >
          <div>
            <br />
            <h4>
              {selectedEvent.icon} {selectedEvent.title}
            </h4>
            <p>{selectedEvent.description}</p>
            <p>
              Host:
              {selectedEvent.owner
                ? "@" + selectedEvent.owner.username
                : "Anonymous"}
            </p>
            <p>
            {/* ATTENDEES IS NOT BEING POPULATED  */}
              Attendees:
              <ul>
                {selectedEvent.attendees.map((attendee) => {
                  return <li>{attendee.username}</li>;
                })}
              </ul>
            </p>
          </div>
        </Popup>
      ) : null}
      
    </ReactMapGL>
  );
}

export default Mapbox;
