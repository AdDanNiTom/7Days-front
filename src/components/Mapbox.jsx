import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

function Mapbox() {
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    zoom: 11,
    height: window.innerHeight,
    width: window.innerWidth,
    pitch: 15,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWFuYXJhbmRhIiwiYSI6ImNrd3hmdzZzbDBjemQydnBsaTllN215dmoifQ.lSWVa5b6Z14zxBXLkER_xQ"
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v10"

      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}

export default Mapbox;
