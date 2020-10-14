import React from 'react';

const SuspenseMeteo = ({multiple}) => {
  return (
    <>
      <div className="ul-list-div">
        <ul className="ul-list">
          <li>
            {multiple.cityName} {multiple.temp} °C
          </li>
          <li>Vėjas: {multiple.windspeed} m/s</li>
        </ul>
      </div>
    </>
  );
};

export default SuspenseMeteo;
