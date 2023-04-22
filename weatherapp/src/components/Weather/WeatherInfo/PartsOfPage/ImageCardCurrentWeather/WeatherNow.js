import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import uuid from 'react-uuid';
const WeatherNow = (props) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    backgroundImage:`url("${props.tempData.BackgroundImage}")`,
    color: props.tempData.textColor,
  
  };

  const leftSideStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 'calc(100% / 3)',
    height: '100%',
  };

  const rightSideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(100% / 3)',
    height: '100%',
  };

  const imageStyle = {
    width: '100%',
    height: '50%',
  };

  const temperatureStyle = {
    fontSize: "5em",
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Arial'
   
  
  };

  const infoStyle = {
    fontSize: 20,
    marginBottom: 2,
    fontFamily: 'Calbiri'
  };

  return (

    <Card key={uuid()} sx={cardStyle}>
      <CardContent sx={leftSideStyle}>
        {console.log(props.tempData.textColor)}
        <Typography key={uuid()}  style={{ color:props.textColor}}sx={temperatureStyle}>{Math.round(props.tempData.temperature)}°F</Typography>
        <Typography key={uuid()} sx={infoStyle}>Condition: {props.tempData.condition} <br/> Feels like: {Math.round(props.tempData.feelsLike)}°F</Typography>
        <Typography key={uuid()} sx={infoStyle}> Night: {Math.round(props.tempData.Night)}°F<br></br>  Day: {Math.round(props.tempData.Day)}°F</Typography>
      </CardContent>
      <CardContent key={uuid()} sx={rightSideStyle}>
        <img src={props.tempData.imgIcon} alt={props.tempData.query} sx={imageStyle} />
      </CardContent>
    </Card>
  );
};

export default WeatherNow;
