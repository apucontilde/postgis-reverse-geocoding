import "./index.css";
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Projection  from "ol/proj";

import { useGeographic, fromLonLat } from 'ol/proj';
useGeographic()
const view = new View({
  center: [0, 0],
  zoom: 1,
});
const map = new Map({
  target: "mapdiv",
  view: view,
  layers: [new TileLayer({
    source: new OSM(),
  })]
});


function showGeolocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

const padNumeric = (numeric) => String(numeric).padStart(2, "0");

const formatResult = (res) => {
  if (typeof res === "object" && !Array.isArray(res) && res !== null) {
    return (
      `${res.nom_prov}, ${res.nom_cant}, ${res.nom_dist}. \n` +
      `Cód. Postal: ` +
      `${res.cod_prov}${padNumeric(res.cod_cant)}${padNumeric(res.cod_dist)}`
    );
  } else {
    console.error(`Unexpected server response ${res}`);
    return "";
  }
};

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (navigator.geolocation) {


    return navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/rpc/encontrar_distrito?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          result.innerHTML = formatResult(data);
          
          const size = map.getSize();
          view.animate({
            center: fromLonLat([position.coords.longitude, position.coords.latitude], new Projection({code: "EPSG:4326"}) ),
            duration: 1000,
            zoom: 5
          });
        });




    }, showGeolocationError);

    


  } else {
    result.innerHTML = "Geolocation is not supported by this browser.";
  }
});




