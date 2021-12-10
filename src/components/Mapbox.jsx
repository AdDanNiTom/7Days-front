import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

function Mapbox() {
  const [viewport, setViewport] = useState({
    latitude: 41.38,
    longitude: 2.16,
    zoom: 11,
    height: window.innerHeight,
    width: window.innerWidth,
    pitch: 15,
  });

  //   const markers = React.useMemo(         ¡¡¡¡¡¡THIS WILL BE IN USE ONCE WE HAVE ALL THE MARKERS!!!!!
  //     () =>
  //       data.map((event) => (
  //         <Marker
  //           key={event.name}
  //           longitude={event.longitude}
  //           latitude={event.latitude}
  //         >
  //           <img src="pin.png"  />
  //         </Marker>
  //       )),
  //     [props.data]
  //   );

  const marker = (
    <Marker
      latitude={41.38893706489965}
      longitude={2.183596863159949}
      offsetLeft={(-viewport.zoom * 5) / 2}
      offsetTop={(-viewport.zoom * 5)}
    >
      <img
        src="https://cdn-icons.flaticon.com/png/512/450/premium/450016.png?token=exp=1639129298~hmac=fb00dbdf134306e684187737a4c0b235"
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
    >
      {marker}
    </ReactMapGL>
  );
}

export default Mapbox;
