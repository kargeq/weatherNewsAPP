import { useState, useEffect } from "react";
import { v4 as uiud } from "uuid";

const WeatherInfo = (props) => {
  const [weatherData, changeWeatherData] = useState();
//   const InterpretData=()=>{
//     const items=[]
//     if(weatherData && props.place){
        
//        if (props.location.length==1){
//         items.append(<p>Zipcode: {props.place[0]} as of </p>)
//        }else{
//         items.append(<p> {props.place[0]}, {props.place[1]} as of </p>)

//        }
//     }
//   }
  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        if (props.location !== undefined) {
       
            console.log( `https://api.openweathermap.org/data/2.5/onecall?lat=${props.location.lat}&lon=${props.location.long}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}&units=imperial`)
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

  return <>{console.log(weatherData)}</>;
};

export default WeatherInfo;
