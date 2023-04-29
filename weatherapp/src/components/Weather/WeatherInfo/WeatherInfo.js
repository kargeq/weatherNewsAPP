import { useState, useEffect } from "react";
import WeatherHeader from "./PartsOfPage/WeatherHeader";
import CurrentWeather from "./PartsOfPage/CurrentWeather";
import { Grid } from "@mui/material";
import DailyWeather from "./PartsOfPage/DailyWeather";
import ConditionalWrapper from "../../ConditionalWrapper";
import HourlyWeather from "./PartsOfPage/HourlyWeather";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
/**
 *
 * @param {*} props the location which is from weather.js the has is a json of latitude and longitude and the name of the place (a zip code or state and city)
 * @returns Current weather along with toggle between hourly and daily weather
 */
const WeatherInfo = (props) => {
  const [weatherData, changeWeatherData] = useState();
  const [selectedButton, setSelectedButton] = useState("Hourly");

  /*Show Hourly weather  */

  /**
   *
   * @param {*} event button event
   * @param {*} newSelectedButton
   * changes toggle from hourly to daily or vice verse
   */
  const handleButtonChange = (event, newSelectedButton) => {
    setSelectedButton((oldSelectedState) => {
      if (oldSelectedState !== newSelectedButton) {
        return newSelectedButton;
      }
    });
  };
  /**
   * given latitude and longitude as input call an api that would return weather at that location
   */
  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        if (props.location !== undefined) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${props.location.lat}&lon=${props.location.long}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}&units=imperial`
          );
          const jsonData = await response.json();
          changeWeatherData(jsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getWeatherInfo();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [props.location]);
  /**
   *
   * @returns returnr max and minium temperature for day
   */
  const TempRanges = () => {
    if (weatherData) {
      return {
        night: weatherData.daily["0"].temp.min,
        day: weatherData.daily["0"].temp.max,
      };
    } else {
      return undefined;
    }
  };

  /**
   *
   * @returns toggle of hourly and daily info with styling if data available
   */

  const RenderWeatherHourlyAndDailyInfo = () => {
    if (weatherData) {
      return (
        <>
          <Grid container spacing={0} justifyContent="center">
            <ToggleButtonGroup
              sx={{ m: "3rem" }}
              value={selectedButton}
              exclusive
              onChange={handleButtonChange}
            >
              <ToggleButton value="Hourly" aria-label="Hourly">
                Hourly
              </ToggleButton>
              <ToggleButton value="Daily" aria-label="Daily">
                Daily
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/*componets displayed depending on toggle */}
          {selectedButton === "Hourly" && (
            <HourlyWeather
              data={weatherData ? weatherData.hourly : weatherData}
            />
          )}
          {selectedButton === "Daily" && (
            <DailyWeather
              data={weatherData ? weatherData.daily : weatherData}
            />
          )}
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {/* conditionally return if styling true */}
      <ConditionalWrapper
        condition={props.location !== undefined}
        wrapper={(children) => (
          <Grid
            container
            xs={12}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {children}
          </Grid>
        )}
      >
        <WeatherHeader timeInfo={weatherData} event={props.place} />
        <CurrentWeather
          current={weatherData ? weatherData.current : weatherData}
          tempRanges={TempRanges()}
        />
      </ConditionalWrapper>

      {RenderWeatherHourlyAndDailyInfo()}
    </>
  );
};

export default WeatherInfo;
