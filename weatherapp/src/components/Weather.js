import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import Select from "react-select";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationNotFound from "./LocationNotFound"
const Weather = () => {
  const [locationInfo, changeLocation] = useState();
  const [weatherCordinates, ChnageCordinates] = useState();
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError]=useState(false)
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };
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
              setError(false)
            
            
          } else if (locationInfo.length == 1) {
            const zipcode = String(locationInfo[0]);
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`
            );
            const jsonData = await response.json();
            if (jsonData.cod==404){
              setError(true)
            }else{
            ChnageCordinates({
              lat: jsonData.lat,
              long: jsonData.lon,
            });
            setError(false)
          }
          }
        }
      } catch (error) {
        setError(true)
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
    if (cityInput === "" && zipcode !== "") {
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
       
        <Grid container justifyContent="center">
          <Card sx={{ backgroundColor: "#82c09a", width: 0.75, mt: "2rem",mb:"2rem", borderRadius:"1.5rem" }}>
            <Grid container justifyContent="center">
              <CardContent
                sx={{
                  justifyContent: "space-between",
                  justifyContent: "center",
                }}
              >
               <Typography sx={{textAlign: "center",  fontFamily:'Calbiri',fontWeight:"bold"}} variant="h5" component="h2">
            Select State And City
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' ,}}>

                <Select
                  alignItem="center"
                  id="state"
                  name="states"
                  options={stateList}
                  value={selectedState}
                  onChange={handleStateChange}
                
                />
                <input  style={{marginLeft:"1rem",width:"10rem", borderRadius:"0.3rem", borderWidth:"0.1rem", height:"2.4rem", borderColor:"#d5dade", alignItem:"center", display:"inline"}}
               type="text" placeholder="enter City" name="city"></input>
                
                </div>
                <Typography sx={{textAlign: "center",  fontFamily:'Calbiri',fontWeight:"bold"}} variant="h5" component="h2">
           OR: Enter A Zipcode
          </Typography>
          <div className="text-center">
          <input type="text"  placeholder="Enter Zipcode"
                  name="zipcode" pattern="[0-9]{5}" title="Five digit zip code" />
        
                </div>
                <div className="text-center">
                  <button
                    style={{ marginTop: "1rem", width:"10rem" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </form>
      {error?<LocationNotFound></LocationNotFound>: <WeatherInfo
          place={locationInfo}
          location={weatherCordinates}
        ></WeatherInfo>}
     

    </>
  );
};
const stateList = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default Weather;
