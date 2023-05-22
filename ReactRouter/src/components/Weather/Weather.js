import { useState, useEffect, useContext } from "react";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import Select from "react-select";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationNotFound from "./LocationNotFound";
import { Helmet } from "react-helmet";
import { AppStateContext } from "../AppState";
/**
 *
 * @returns weather component that has daily, hourly, and current weather
 */
const Weather = () => {
  const [locationInfo, changeLocation] = useState();
  const [weatherCordinates, ChnageCordinates] = useState();
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { appState, setAppState } = useContext(AppStateContext);
  /**
   *
   * @param {*} selectedOption
   * @description used for keeping track of which state if any is picked
   */
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  /**
   * @description used for setting up title if first going to page or seeing if user had previously entered locationInfo to be reloaded
   */
  useEffect(() => {
    document.title = "Weather";

    if (appState.locationInfo) {
      changeLocation(appState.locationInfo);
    }
  }, []);
  /**
   * if locationInfo changes it calls an api for the latitude and longitude depending on input; determines which api to call
   */
  useEffect(() => {
    const getData = async () => {
      try {
        if (locationInfo !== undefined) {
          setIsLoading(true);

          /* have loading until api call returns or fails*/

          if (locationInfo.length === 2) {
            /* if there is a state and city*/

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
            setError(false);
          } else if (locationInfo.length === 1) {

              /* if there is only a zipcode */
            const zipcode = String(locationInfo[0]);
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`
            );
            const jsonData = await response.json();
            if (jsonData.cod === 404) {
              setError(true);
            } else {
              ChnageCordinates({
                lat: jsonData.lat,
                long: jsonData.lon,
              });
              setError(false);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };
    getData();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [locationInfo]);
  /**
   *
   * @param {*} event submission
   * @returns submission which is used to change the location and global context
   */
  const validateForm = (event) => {
    event.preventDefault();
    let cityInput = document.forms["myForm"]["city"].value;
    let zipcode = document.forms["myForm"]["zipcode"].value;
    if (cityInput === "" && zipcode !== "") {
      changeLocation([zipcode]); // Allow submission if only zipcode is filled
      setAppState((prevState) => ({
        ...prevState,
        locationInfo: [zipcode],
      }));
      return;
    } else if (selectedState !== null && cityInput !== "") {
      changeLocation([selectedState.value, cityInput]);
      setAppState((prevState) => ({
        ...prevState,
        locationInfo: [selectedState.value, cityInput],
      }));
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
      {isLoading ? (
        <>
          <Helmet>
            {/* selectively add css for loading icon if loading condition met */}
            <style>
              {`
        :root {
          --border-width: 7px;
        }

        .sec-loading {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sec-loading .one {
          height: 80px;
          width: 80px;
          border: var(--border-width) solid black;
          transform: rotate(45deg);
          border-radius: 0 50% 50% 50%;
          position: relative;
          animation: move 0.5s linear infinite alternate-reverse;
        }

        .sec-loading .one::before {
          content: "";
          position: absolute;
          height: 55%;
          width: 55%;
          border-radius: 50%;
          border: var(--border-width) solid transparent;
          border-top-color: black;
          border-bottom-color: black;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate 1s linear infinite;
        }

        @keyframes rotate {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes move {
          to {
            transform: translateY(15px) rotate(45deg);
          }
        }
      `}
            </style>
          </Helmet>
          <section class="sec-loading">
            <div class="one"></div>
          </section>
        </>
      ) : (
        <form id="myForm" onSubmit={validateForm}>
          <Grid container justifyContent="center">
            <Card
              sx={{
                backgroundColor: "#82c09a",
                width: 0.75,
                mt: "2rem",
                mb: "2rem",
                borderRadius: "1.5rem",
              }}
            >
              <Grid container justifyContent="center">
                <CardContent
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Calbiri",
                      fontWeight: "bold",
                    }}
                    variant="h5"
                    component="h2"
                  >
                    Select State And City
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Select
                      alignItem="center"
                      id="state"
                      name="states"
                      options={stateList}
                      value={selectedState}
                      onChange={handleStateChange}
                    />
                    <input
                      style={{
                        marginLeft: "1rem",
                        width: "10rem",
                        borderRadius: "0.3rem",
                        borderWidth: "0.1rem",
                        height: "2.4rem",
                        borderColor: "#d5dade",
                        alignItem: "center",
                        display: "inline",
                      }}
                      type="text"
                      placeholder="enter City"
                      name="city"
                    ></input>
                  </div>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Calbiri",
                      fontWeight: "bold",
                    }}
                    variant="h5"
                    component="h2"
                  >
                    OR: Enter A Zipcode
                  </Typography>
                  <div className="text-center">
                    <input
                      type="text"
                      placeholder="Enter Zipcode"
                      name="zipcode"
                      pattern="[0-9]{5}"
                      title="Five digit zip code"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      style={{ marginTop: "1rem", width: "10rem" }}
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
      )}
      {error ? (
        //if location not found
        <LocationNotFound></LocationNotFound>
      ) : (
        <WeatherInfo
          place={locationInfo}
          location={weatherCordinates}
        ></WeatherInfo>
      )}
    </>
  );
};
/**
 * state info
 */
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
