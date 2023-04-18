import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import Select from 'react-select';

const Weather = () => {
  const [locationInfo, changeLocation] = useState();
  const [weatherCordinates, ChnageCordinates] = useState();
  const [selectedState, setSelectedState] = useState(null);

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  }
  useEffect(() => {
    const getData = async () => {
      try {
        if (locationInfo !== undefined) {
          if (locationInfo.length === 2) {
            const cityName = locationInfo[1];
            const State = locationInfo[0];
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${State},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`
            );
          
            const jsonData = await response.json();

            ChnageCordinates({
              lat: jsonData["0"]["lat"],
              long: jsonData["0"]["lon"],
            });
        
          } else if (locationInfo.length == 1) {
            const zipcode = String(locationInfo[0]);
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`
            );
            const jsonData = await response.json();
            
      
            ChnageCordinates({
              lat: jsonData.lat,
              long: jsonData.lon,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [locationInfo]);

  const validateForm = (event) => {
    event.preventDefault();

    let cityInput = document.forms["myForm"]["city"].value;
    let zipcode = document.forms["myForm"]["zipcode"].value;
    if (selectedState === null && cityInput === "" && zipcode !== "") {
      changeLocation([zipcode]); // Allow submission if only zipcode is filled
      return;
    } else if (selectedState !== null && cityInput !== "") {
      changeLocation([selectedState.value, cityInput]);
      return; // Allow submission if both state and city are filled
    } else {
      alert(
        "Please fill out either just the zipcode or both the state and city."
      );
      return false; // Prevent submission if requirements are not met
    }
  };

  return (
    <>
      <form id="myForm" onSubmit={validateForm}>
        <WeatherInfo place={locationInfo} location={weatherCordinates}></WeatherInfo>
        <input type="number" placeholder="enter zipcode" name="zipcode"></input>
        <input type="text" placeholder="enter City" name="city"></input>
        <Select
        id="state"
        name="states"
        options={stateList}
        value={selectedState}
        onChange={handleStateChange}
      />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
const stateList = [
  {value: "AL", label: "Alabama"},
  {value: "AK", label: "Alaska"},
  {value: "AZ", label: "Arizona"},
  {value: "AR", label: "Arkansas"},
  {value: "CA", label: "California"},
  {value: "CO", label: "Colorado"},
  {value: "CT", label: "Connecticut"},
  {value: "DE", label: "Delaware"},
  {value: "FL", label: "Florida"},
  {value: "GA", label: "Georgia"},
  {value: "HI", label: "Hawaii"},
  {value: "ID", label: "Idaho"},
  {value: "IL", label: "Illinois"},
  {value: "IN", label: "Indiana"},
  {value: "IA", label: "Iowa"},
  {value: "KS", label: "Kansas"},
  {value: "KY", label: "Kentucky"},
  {value: "LA", label: "Louisiana"},
  {value: "ME", label: "Maine"},
  {value: "MD", label: "Maryland"},
  {value: "MA", label: "Massachusetts"},
  {value: "MI", label: "Michigan"},
  {value: "MN", label: "Minnesota"},
  {value: "MS", label: "Mississippi"},
  {value: "MO", label: "Missouri"},
  {value: "MT", label: "Montana"},
  {value: "NE", label: "Nebraska"},
  {value: "NV", label: "Nevada"},
  {value: "NH", label: "New Hampshire"},
  {value: "NJ", label: "New Jersey"},
  {value: "NM", label: "New Mexico"},
  {value: "NY", label: "New York"},
  {value: "NC", label: "North Carolina"},
  {value: "ND", label: "North Dakota"},
  {value: "OH", label: "Ohio"},
  {value: "OK", label: "Oklahoma"},
  {value: "OR", label: "Oregon"},
  {value: "PA", label: "Pennsylvania"},
  {value: "RI", label: "Rhode Island"},
  {value: "SC", label: "South Carolina"},
  {value: "SD", label: "South Dakota"},
  {value: "TN", label: "Tennessee"},
  {value: "TX", label: "Texas"},
  {value: "UT", label: "Utah"},
  {value: "VT", label: "Vermont"},
  {value: "VA", label: "Virginia"},
  {value: "WA", label: "Washington"},
  {value: "WV", label: "West Virginia"},
  {value: "WI", label: "Wisconsin"},
  {value: "WY", label: "Wyoming"}
];



export default Weather;
