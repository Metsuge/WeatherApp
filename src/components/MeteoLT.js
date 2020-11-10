import React, { useState, useEffect, useCallback, Suspense } from "react";
import axios from "axios";

import moment from "moment";
import "moment/locale/lt";

import "./CORS";
import SuspenseMeteo from "./SuspenseMeteo";


const MeteoLT = (props) => {
  const listDOMelement = document.getElementById("myDropdown");

  //STATES
  const [inputValue, setValue] = useState("Vilnius");
  const [placeList, setPlaceList] = useState([]);
  const [searchList, setSearcList] = useState([]);
  const [text, setText] = useState("");
  const [background, setBckg] = useState(props.vilnius);
  const [multiple, setMultiple] = useState({
    cityName: "",
    temp: "Loading",
    windspeed: "Loading",
    time: "",
  });

  let url =
    "https://api.meteo.lt/v1/places/" +
    encodeURIComponent(inputValue) +
    "/forecasts/long-term";
  let urlForPlaces = "https://api.meteo.lt/v1/places";

  const getDropDownPlaces = async () => {
    const NamesData = await axios.get(urlForPlaces);
    const realList = NamesData.data;
    let iteminarray = [];

    for (let i = 0; i < realList.length; i++) {
      if (realList[i].countryCode === "LT") {
        iteminarray.push(realList[i]);
      }
    }

    setPlaceList(iteminarray);
  };

  const getMeteoData = async () => {
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    const h = addZero(new Date().getHours());
    const momentTime = moment().format("l");
    const stringTim = `${momentTime} ${h}:00:00`;

    const dataaxios = await axios.get(url);
    for (let i = 0; i < dataaxios.data.forecastTimestamps.length; i++) {
      if (dataaxios.data.forecastTimestamps[i].forecastTimeUtc === stringTim) {
        const timefromjson =
          dataaxios.data.forecastTimestamps[i].forecastTimeUtc;
        setMultiple({
          ...multiple,
          cityName: dataaxios.data.place.name,
          temp: dataaxios.data.forecastTimestamps[i].airTemperature,
          windspeed: dataaxios.data.forecastTimestamps[i].windSpeed,
          time: timefromjson,
        });
      }
    }
  };

  const css = {
    backgroundImage: `url(${background})`,
  };

  useEffect(() => {
    getMeteoData();
    getDropDownPlaces();
  }, [inputValue]);

  const changeBckg = (cityname) => {
    switch (cityname) {
      case "vilnius":
        setBckg(props.vilnius);
        break;
      case "kaunas":
        setBckg(props.kaunas);
        break;
      case "neringa-nida":
        setBckg(props.nida);
        break;
      default:
        setBckg(props.kaunas);
    }
  };

  const onclicked = (value) => {
    setValue(value);
    changeBckg(value);
    // setText(value);
  };

  const Search = useCallback(
    (userinput) => {
      let correctResult = "";
      let dropdownList = [];

      if (userinput.length > 2) {
        const regex = new RegExp(`^${userinput}`, "i");
        for (let i = 0; i < placeList.length; i++) {
          correctResult = regex.test(placeList[i].name);
          if (correctResult) {
            dropdownList.push(placeList[i]);
            //in dropdown list show only 8 items
            let dropdownItemNr = dropdownList.slice(0, 4);
            setSearcList(dropdownItemNr);
          }
          listDOMelement.classList.add("show");
        }
      } else if (userinput.length === 0) {
        listDOMelement.classList.remove("show");
      }
    },
    [text]
  );

  const onChangeInput = (userinput) => {
    setText(userinput);
    Search(userinput);
  };

  const onSearchResultClick = (clickedResult) => {
    setValue(clickedResult);
    setText(clickedResult);
    listDOMelement.classList.remove("show");
  };

  return (
    <>
      <div>
        <div>
          <h1 className="origin-title-div">Meteo.lt</h1>
        </div>

        <div className="info-box" id="bckgAnother" style={css}>
          <div className="main-content">
            <Suspense fallback={"Loading"}>
              <SuspenseMeteo multiple={multiple}/>
            </Suspense>
            <div className="buttonDiv">
              <div className="dropdown">
                <input
                  value={text}
                  className="dropbtn"
                  type="text"
                  placeholder="Enter city name"
                  onChange={(e) => {
                    onChangeInput(e.target.value);
                  }}
                ></input>
                <div id="myDropdown" className="dropdown-content" style={{left: '10px'}}>
                  {searchList.map((itemInArray) => {
                    return (
                      <ul className="dropdown-list">
                        <li
                          value={itemInArray}
                          onClick={() => onSearchResultClick(itemInArray.code)}
                        >
                          {itemInArray.name}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
              <div className="cityButtonDiv">
                <button
                  className="cityButton"
                  type="button"
                  value="neringa-nida"
                  onClick={(e) => onclicked(e.target.value)}
                >
                  Nida
                </button>
                <button
                  className="cityButton"
                  type="button"
                  value="kaunas"
                  onClick={(e) => onclicked(e.target.value)}
                >
                  Kaunas
                </button>
                <button
                  className="cityButton"
                  type="button"
                  value="vilnius"
                  onClick={(e) => onclicked(e.target.value)}
                >
                  Vilnius
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeteoLT;
