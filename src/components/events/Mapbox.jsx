import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Mapbox(props) {
  const { events } = props;

  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    height: window.innerHeight,
    width: window.innerWidth,
    zoom: 11,
    pitch: 15,
  });

  const onClickMap = (e) => {
    e.preventDefault();
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/adrianaranda/ckx69z5kp7uyw15s9j733ujf0"
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={onClickMap}
    >
      {events?.map((event) => {
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
              {/* ATTENDEES IS NOT BEING POPULATED */}
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
