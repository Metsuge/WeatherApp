import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LTCityNames from "../lt-city-names.json";

const Openweathermap = (props) => {
  const [CityId, setId] = useState("598316");
  const [searchList, setSearcList] = useState([]); //drop down list according to seach word
  const [text, setText] = useState(""); //text in the input field
  const [background, setBckg] = useState(props.kaunas);
  const [multiple, setMultiple] = useState({
    temp: "Loading",
    windspeed: "Loading",
  });

  const listDOM = document.getElementById("myDropdownWeather");

  let url =
    "https://api.openweathermap.org/data/2.5/weather?id=" +
    CityId +
    "&units=metric&lang=lt&appid=60bec95847abadde2f970c50b4e71710";

  const getOpenData = async () => {
    const dataOpen = await axios.get(url);

    setMultiple({
      ...multiple,
      temp: dataOpen.data.main.temp,
      windspeed: dataOpen.data.wind.speed,
      name: dataOpen.data.name,
    });
  };

  const Search = useCallback(
    (userinput) => {
      let correctResult = "";
      let dropdownList = [];

      const regex = new RegExp(`^${userinput}`, "i");
      if (userinput.length > 2) {
        for (let i = 0; i < LTCityNames.length; i++) {
          correctResult = regex.test(LTCityNames[i].name);

          if (correctResult) {
            dropdownList.push(LTCityNames[i]);
            setSearcList(dropdownList);
            listDOM.classList.add("show");
          }
        }
      } else if (userinput.length === 0) {
        listDOM.classList.remove("show");
      }
    },
    [text]
  );

  const onChangeInput = useCallback(
    (e) => {
      const userinput = e.target.value;
      setText(userinput);
      Search(userinput);
    },
    [text]
  );

  const onResultClick = (clickedResult) => {
    setId(clickedResult.id);
    setText(clickedResult.name);
    listDOM.classList.remove("show");
  };

  useEffect(() => {
    getOpenData();
  }, [CityId]);

  const onBTNclicked = (value) => {
    setId(value);
    changeBckg(value);
  };

  const css = {
    backgroundImage: `url(${background})`,
  };

  const changeBckg = (cityname) => {
    switch (cityname) {
      case "vilnius":
        setBckg(props.vilnius);
        break;
      case "kaunas":
        setBckg(props.kaunas);
        break;
      case "nida":
        setBckg(props.nida);
        break;
      default:
        setBckg(props.kaunas);
    }
  };

  return (
    <>
      <div className="info-box" id="bckg" style={css}>
        <h1 className="origin-title">Open Weather App</h1>
        <div className="blurr"></div>
        <div className="ul-list-div">
          <ul className="ul-list">
            <li>
              {multiple.name} {multiple.temp} °C
            </li>
            <li>Vėjas: {multiple.windspeed} m/s</li>
          </ul>
        </div>
        <div className="buttonDiv">
          <input
            value={text}
            onChange={onChangeInput}
            className="dropbtn"
            type="text"
            placeholder="Enter address"
          ></input>
          <div id="myDropdownWeather" className="dropdown-content">
            {searchList.map((itemInArray) => (
              <ul className='dropdown-list'>
                <li onClick={() => onResultClick(itemInArray)}>
                  {itemInArray.name}
                </li>
              </ul>
            ))}
          </div>
          <button
            className="cityButton"
            type="button"
            value="596612"
            onClick={(e) => onBTNclicked(e.target.value)}
          >
            Nida
          </button>
          <button
            className="cityButton"
            type="button"
            value="598316"
            onClick={(e) => onBTNclicked(e.target.value)}
          >
            Kaunas
          </button>
          <button
            className="cityButton"
            type="button"
            value="593116"
            onClick={(e) => onBTNclicked(e.target.value)}
          >
            Vilnius
          </button>
        </div>
      </div>
    </>
  );
};

export default Openweathermap;