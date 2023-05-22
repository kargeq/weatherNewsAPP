import { v4 as uiud } from "uuid";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
/**
 *
 * @param {*} props time: the time
 * @returns green header that says "Zipcdoe:{zipcode} as of time or  "city,state, as of time "
 */
const WeatherHeader = (props) => {
  const InterpretData = () => {
    const items = [];

    if (props.timeInfo && props.event) {
      /**
       * format date by hour minute and time zozne (EDT)
       */
      const time = new Date(props.timeInfo.current.dt * 1000);
      const options = {
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      const formattedString = time.toLocaleString("en-US", options);

        /*Check the length of the location and sees to the return time with zipcode or with city and state  */
  
      if (props.event.length === 1) {
        items.push(
          <>
            <Typography
              variant="h4"
              gutterBottom
              key={uiud()}
              style={{
                color: "white",
                marginLeft: "5rem",
                marginTop: "1.2rem",
                verticalAlign: "bottom",
                display: "inline-block",
              }}
            >
              <strong key={uiud}>Zipcode: {props.event[0]} </strong>
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              key={uiud()}
              style={{
                color: "white",
                marginLeft: "1.2rem",
                display: "inline-block",
                marginBottom: "0.65em",
                verticalAlign: "bottom",
              }}
            >
              As of {formattedString}
            </Typography>
          </>
        );
      } else {
        items.push(
          <>
            <Typography
              variant="h4"
              gutterBottom
              key={uiud()}
              style={{
                color: "white",
                marginLeft: "1.8rem",
                marginTop: "1.2rem",
                verticalAlign: "bottom",
                display: "inline-block",
              }}
            >
              <strong key={uiud}>
                {props.event[1]}, {props.event[0]}
              </strong>
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              key={uiud()}
              style={{
                color: "white",
                marginLeft: "1.2rem",
                display: "inline-block",
                marginBottom: "0.65em",
                verticalAlign: "bottom",
              }}
            >
              As of {formattedString}
            </Typography>
          </>
        );
      }
    }

    return items;
  };
  return (
    <>
      <Card style={{ backgroundColor: "#2e543c", width: "40%" }}>
        {InterpretData()}
      </Card>
    </>
  );
};

export default WeatherHeader;
