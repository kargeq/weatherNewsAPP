import { useState,useEffect } from "react"
const Weather=()=>{
 const [locationInfo, changeLocation]=useState()
 const [weatherCordinates, ChnageCordinates]=useState()
useEffect(()=>{

    const getData=async()=>{
        try{
    if(locationInfo!==undefined){

   
     if (  locationInfo.length===2){
       
        console.log(locationInfo+"sfdsfdsfs")
        const cityName=locationInfo[1]
        const State=locationInfo[0]
          const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${State},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`)
          const jsonData = await response.json();
         
        ChnageCordinates({
            lat:jsonData.lat,
            long:jsonData.lon
        })
         
     }else if(locationInfo.length==1){
        const zipcode=String(locationInfo[0])
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&limit=5&appid=${process.env.REACT_APP_WEATHER_LOCATION_API_KEY}`)
        const jsonData = await response.json();
        ChnageCordinates({
            lat:jsonData.lat,
            long:jsonData.lon
        })
        console.log(weatherCordinates)
     }
    }
    }catch(error){
        console.error(error)
    }
      }
      getData()
      return () => {
        // this now gets called when the component unmounts
      };
    }, [locationInfo]);
   
      const validateForm = (event) => {
        event.preventDefault();
        
        const stateInput = document.forms["myForm"]["state"].value;
        const cityInput = document.forms["myForm"]["city"].value;
        const zipcode=document.forms["myForm"]["zipcode"].value;
        if (stateInput === "" && cityInput === "" && zipcode!=="") {
            changeLocation([zipcode]); // Allow submission if only zipcode is filled
            return;
        }
        else if (stateInput !== "" && cityInput !== "") {
            changeLocation([stateInput,cityInput]);
          return; // Allow submission if both state and city are filled
        }
        else {
          alert("Please fill out either just the zipcode or both the state and city.");
          return false; // Prevent submission if requirements are not met
        }
      }

    return( <>
    <form id="myForm" onSubmit={validateForm}>
  <input type="number" placeholder="enter zipcode" name="zipcode"></input>
  <input type="text" placeholder="enter State" name="state"></input>
  <input type="text" placeholder="enter City" name="city"></input>
  <button type="submit">Submit</button>
</form>
  </> )
}

export default Weather;