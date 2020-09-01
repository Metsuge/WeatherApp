import React, { useEffect, useState } from "react";
import axios from "axios";
//style
import "../css/styles.css";
import "../css/dropdown.css";
import "../css/buttons.css";

//compements
import Openweathermap from "./openweathermap";
import Anotherweathermap from "./anotherweathermap";

// images
import kaunas from "../img/kaunas.jpg";
import vilnius from "../img/vilnius.png";
import nida from "../img/nida.jpg";

const App = () => {
  const [lat, setLat] = useState('0');
  const [long, setLong] = useState('0');

  const getCoordsFromUser = async ()=> {

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude);
      },
      function(error) {
        console.log("Error code: " + error.code + " - " +  error.message);
      }
    );
  }

  useEffect(() => {
    getCoordsFromUser()
  });

  
  return (
    <>
      <div className="component-div">
        <div className="smaller-comp-div">
          <Openweathermap lat={lat} long={long} kaunas={kaunas} vilnius={vilnius} nida={nida} />
          <Anotherweathermap lat={lat} long={long}  kaunas={kaunas} vilnius={vilnius} nida={nida} />
        </div>
      </div>
    </>
  );
};

export default App;
