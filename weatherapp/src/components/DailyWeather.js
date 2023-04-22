import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
const DailyWeather = (props) => {
  if (props.data) {
    const Today = new Date();
    const arrayOfItems = Object.values(props.data);
    const forecast = arrayOfItems.map((element) => {
      let date = new Date(element.dt * 1000); // replace this with your date object
      let formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
      });
      let formattedDate = formatter.format(date);
      
      let isToday = Today.toDateString() == date.toDateString();

      if (isToday) {
        formattedDate = "Today";
      }
      return {
        precipitation: Math.round(element.pop * 100),
        tempDay: Math.round(element.temp.max),
        tempNight: Math.round(element.temp.min),
        img: `https://openweathermap.org/img/wn/${element.weather["0"].icon}@2x.png`,
        date: formattedDate,
        description: element.weather["0"].description,
        isToday: isToday,
      };
    });
    const Bold = (boolean) => {
      //used for bolding
      if (boolean) {
        return "bold";
      } else {
        return "";
      }
    };
    return (
      <Card sx={{ alignItems: "center", justifyContent: "center" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Daily Forecast
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: "#592c4b",
              borderRadius: 3,
              marginTop: 0.1,
              maxWidth: 0.75,
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: (theme) => theme.palette.grey[600],
                borderRadius: 8,
              },
            }}
          >
            {forecast.map((day, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0.23,
                  marginRight: 2,
                }}
              >
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{ fontWeight: Bold(day.isToday) }}
                      variant="h6"
                      component="h3"
                    >
                      {day.date}
                    </Typography>
                    <Typography
                      style={{ fontWeight: Bold(day.isToday) }}
                      variant="h3"
                      color="textSecondary"
                    >
                      {day.tempDay}°F
                    </Typography>
                    <Typography
                      style={{ fontWeight: Bold(day.isToday) }}
                      variant="body1"
                      color="textSecondary"
                    >
                      {day.tempNight}°F
                    </Typography>
                    <img src={day.img} alt={day.description} />
                    <Typography
                      style={{ fontWeight: Bold(day.isToday) }}
                      variant="body1"
                      color="textSecondary"
                    >
                      <WaterDropIcon style={{ color: "blue" }} />{" "}
                      {day.precipitation}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return <></>;
  }
};

export default DailyWeather;
