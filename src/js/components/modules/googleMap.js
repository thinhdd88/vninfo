import React, {Component} from 'react';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const LocationGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    center={props.center}
    zoom={props.zoom}
  >
    {
      props.markers.map( (e, key) => {
        return(
          <Marker
            key={key}
            defaultPosition={{lat: e.lat, lng: e.lng}}
            title="Click to zoom"
          >
            {
              // e.showInfo && (
              // <InfoWindow>
              //   <div>asdasd sadasdasd</div>
              // </InfoWindow>
              //)
            }
          </Marker>
        );
      })
    }
  </GoogleMap>
));


export default LocationGoogleMap;
