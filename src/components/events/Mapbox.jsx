import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

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
      {events?.map((event) => {
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
              <p
                className="title"
                height={viewport.zoom * 5}
                width={viewport.zoom * 5}
              >
                {event.title}
              </p>
              <p>{event.icon}</p>
            </Marker>
          );
        }
      })}
      {marker}
    </ReactMapGL>
  );
}

export default Mapbox;
