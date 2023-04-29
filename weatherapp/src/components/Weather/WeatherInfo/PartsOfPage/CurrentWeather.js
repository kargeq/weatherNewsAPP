import { useState, useEffect } from "react";
import { v4 as uiud } from "uuid";
import { createClient } from "pexels";
import WeatherNow from "./ImageCardCurrentWeather/WeatherNow";
import colorthief from "colorthief";
import chroma from 'chroma-js';


/**
 * 
 * @param {*} props data for current weather
 * @returns array of WeatherNow items with data for each
 */
const CurrentWeather = (props) => {
 
  const [items, setItems] = useState();
/**
 * gets dominant color given an image using color theif library
 * @param {string} imageUrl 
 * @param {*} onColorExtracted 
 */
  function getImageDominantColor(imageUrl, onColorExtracted) {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // make sure to set the crossOrigin property to "Anonymous" to avoid CORS issues
    image.onload = () => {
      const colorThief = new colorthief();
      const color = colorThief.getColor(image);

      onColorExtracted(color);
    };
    image.src = imageUrl;
  }

  /**
   * 
   * @param {*} color 
   * @returns Inverted color by using 
   */
  function invertColor(color) {
    


      // const baseColor = color; // Red
      //picks colors and find greatest contrast

      const baseColor = color; // Red
      let allColors = ['#ff0000', '#ffa500', '#fff000', '#008000', '#0000ff', '#4b0082', '#ee82ee']; // List of all possible colors in valid format

const contrast=allColors.map((element)=>{
  chroma.contrast(baseColor, element);
})
const finalarray=allColors.sort().reverse()
  return finalarray[0];

  }
  
  useEffect(() => {
    if (props.current) {
      const client = createClient(process.env.REACT_APP_WEATHER_PIXEL_API_KEY);
      const query = props.current.weather["0"].description;
  
      client.photos.search({ query, per_page: 1 }).then((photos) => {
        console.log(photos);
        console.log(photos.photos["0"].src.original);
        console.log("query is " + query);
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
        });
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
