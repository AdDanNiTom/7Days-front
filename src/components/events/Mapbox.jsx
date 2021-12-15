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
          className="popup"
          closeButton={false}
          closeOnClick={true}
          latitude={selectedEvent.location[1]}
          longitude={selectedEvent.location[0]}
          onClose={() => {
            setSelectedEvent(null);
          }}
        >
        <div className="popup-border">
          <div className="popup-content">
            <br />
            <h4 className="popup-title">
              {selectedEvent.icon} {selectedEvent.title}
            </h4>
            <p className="popup-description">
            {selectedEvent.description}
            </p>
            <br/>
            <div className="popup-owner-attendees">
            <ul className="popup-owner">
              <div className="popup-list-title">
              Host
              </div>
              <li>
              {selectedEvent.owner.username}
              </li>
            </ul>
            <p className="popup-attendees">
            <div className="popup-list-title">
              Attendees
              </div>
              <ul>
                {selectedEvent.attendees.length === 0
                ? <p>No attendees yet</p>
                : selectedEvent.attendees.map((attendee) => {
                  return <li>{attendee.username}</li>;
                })}
              </ul>
              
            </p>
            </div>
          </div>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
}

export default Mapbox;
