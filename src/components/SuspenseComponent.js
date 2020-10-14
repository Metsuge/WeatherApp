import React from "react";

const SuspenseComponent = ({ multiple }) => {
  return (
    <ul className="ul-list">
      <li>
        {multiple.name} {multiple.temp} °C
      </li>
      <li>Vėjas: {multiple.windspeed} m/s</li>
    </ul>
  );
};

export default SuspenseComponent;
