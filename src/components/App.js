import React, { useEffect } from "react";

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
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
      },
      function(error) {
        console.log("Error code: " + error.code + " - " +  error.message);
      }

    );
  });

  return (
    <>
      <div className="component-div">
        <Openweathermap kaunas={kaunas} vilnius={vilnius} nida={nida} />
        <Anotherweathermap kaunas={kaunas} vilnius={vilnius} nida={nida} />
      </div>
    </>
  );
};

export default App;
