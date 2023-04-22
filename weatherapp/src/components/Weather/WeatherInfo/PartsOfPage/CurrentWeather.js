import { useState, useEffect } from "react";
import { v4 as uiud } from "uuid";
import { createClient } from "pexels";
import WeatherNow from "./ImageCardCurrentWeather/WeatherNow";
import colorthief from "colorthief";
import contrast from 'color-contrast';

const CurrentWeather = (props) => {
  const [items, setItems] = useState();

  function getImageDominantColor(imageUrl, onColorExtracted) {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // make sure to set the crossOrigin property to "Anonymous" to avoid CORS issues
    image.onload = () => {
      const colorThief = new colorthief();
      const color = colorThief.getColor(image);
      
      console.log("color:", color); // check the value of color

      const dominantColor = `rgb(${color.join(",")})`; // convert to RGB string for compatibility with CSS
      console.log("dominantColor:", dominantColor); // check the value of dominantColor

      onColorExtracted(color);
    };
    image.src = imageUrl;
  }
  
  function invertColor(color) {
    // Invert a color by subtracting each RGB component from 255


    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      };
      return "#" + componentToHex(color[0]) + componentToHex(color[1]) + componentToHex(color[2]);
   
  }
  useEffect(() => {
    if (props.current) {
      const client = createClient(process.env.REACT_APP_WEATHER_PIXEL_API_KEY);
      const query = props.current.weather["0"].description;
  
      client.photos.search({ query, per_page: 1 }).then((photos) => {
        console.log(photos);
        console.log(photos.photos["0"].src.original);
        console.log("query is " + query);
if (!query.includes("cloud")&& !query.includes("Cloud")){


        getImageDominantColor(photos.photos[0].src.original, (color) => {
          const reversedColor = invertColor(color);
          setItems({
            temperature: props.current.temp,
            imgIcon: `https://openweathermap.org/img/wn/${props.current.weather["0"].icon}@2x.png`,
            condition: query,
            feelsLike: props.current.feels_like,
            Day: props.tempRanges.day,
            Night: props.tempRanges.night,
            BackgroundImage: photos.photos["0"].src.original,
            textColor: reversedColor
          });
        });}else{
            setItems({
                temperature: props.current.temp,
                imgIcon: `https://openweathermap.org/img/wn/${props.current.weather["0"].icon}@2x.png`,
                condition: query,
                feelsLike: props.current.feels_like,
                Day: props.tempRanges.day,
                Night: props.tempRanges.night,
                BackgroundImage: photos.photos["0"].src.original,
                textColor: "black"
              });

        }
      });
    }
  }, [props.current]);
  return (
    <>
      {items !== undefined ? <WeatherNow tempData={items}></WeatherNow> : <></>}
    </>
  );
};

export default CurrentWeather;
