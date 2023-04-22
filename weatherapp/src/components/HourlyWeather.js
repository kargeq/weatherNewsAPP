import moment from "moment";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Card from "@mui/material/Card";
import { v4 as uiud } from "uuid";
import AirIcon from '@mui/icons-material/Air';
import { BorderBottomOutlined } from "@mui/icons-material";

const HourlyWeather = (props) => {
  if (props.data) {
    const arrayOfItems = Object.values(props.data);

    const Hourlyforecast = arrayOfItems.map((element, index) => {
      const date = new Date(element.dt * 1000); // replace this with your date object
      let formatterDate = new Intl.DateTimeFormat("en-US", {
        hour: 'numeric',
        minute: 'numeric',
      });
      let getDay=new Intl.DateTimeFormat("en-US", {
        month:"long",
        weekday: "long",
        day: "numeric",
      });
      let formatterTime = formatterDate.format(date);
      let FormattedDay=getDay.format(date)
      let newDay = false;
      if  (date.getHours() === 0 && date.getMinutes() === 0) {
        newDay = true;
      }else if (index==0){
        newDay=true
      }
      return {
        precipitation: Math.round(element.pop * 100),
        temperature: Math.round(element.temp),
        time: formatterTime,
        img: `https://openweathermap.org/img/wn/${element.weather["0"].icon}@2x.png`,
        description: element.weather["0"].description,
        day: FormattedDay,
        newDay: newDay,
        windSpeed:element.wind_speed,
        main:element.weather["0"].main
      };
    });

    const spacing=(String)=>{
        if (String.includes("clear")){
            return "29em"
        }else{
            return "28em"
        }
    }
    return (<>
    
    
    <Card sx={{ alignItems: "center", justifyContent: "center", border: "none",
  borderRadius: 0, outline:"none,"}}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", '& .MuiPaper-root.MuiCard-root': {
                border: "none"
              },
           
           
          }}
        >
        
        <Typography sx={{mb:"1rem"}} variant="h5" component="h2">
            Hourly Forecast
          </Typography>
          <Grid container spacing={2} sx={{    maxHeight: '400px',   maxWidth: 0.75, overflowY: 'auto' ,borderRadius: 3, backgroundColor: "#592c4b", }}>
      {Hourlyforecast.map((hour, index) => (
        <>
         {hour.newDay?<Grid key={uiud()} item xs={12}> <Card sx={ {mr:"1.3rem"}}>
            <CardContent  sx={{
            display: "flex",
            flexDirection: "row",backgroundColor:"#cf5117",}}>
                
                <Typography style={{ fontWeight: "Bold"}}variant="h6" component="h3">
                {hour.day}
              </Typography>
                </CardContent>
                </Card>
                </Grid>:<></>}
                <Grid key={uiud()} item xs={12}>
  <Card sx={ {mr:"1.3rem"}}>
    <CardContent  sx={{  
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
     
    }}>
      <Typography sx={{mr: '2rem', minWidth: "6rem", textAlign: "center"}} variant="body1" component="h3">
        {hour.time}
      </Typography>
      <Typography sx={{mr: '1rem', minWidth: "6rem", textAlign: "center"}} variant="h5" color="textSecondary">
        {hour.temperature}°F
      </Typography>
      <img style={{marginRight:'1rem'}} src={hour.img} alt={hour.main} />
      <Typography sx={{mr: '2rem', minWidth: "20rem", textAlign: "center"}}>
        {hour.description}
      </Typography>
      <Typography sx={{mr: '2rem', minWidth: "6rem", textAlign: "center"}} variant="body1" color="textSecondary">
        <WaterDropIcon style={{color:"blue"}} /> {hour.precipitation}%
      </Typography>
      <Typography sx={{minWidth: "6rem", textAlign: "center"}} variant="body1" color="textSecondary">
        <AirIcon/> {hour.windSpeed} MPH
      </Typography>
    </CardContent>
  </Card>
</Grid>

        </>
      ))}
      
    </Grid>
   


    </CardContent>
        
        </Card>
    
    
    
    
    </>);
  } else {
    return <></>;
  }
};

export default HourlyWeather;
