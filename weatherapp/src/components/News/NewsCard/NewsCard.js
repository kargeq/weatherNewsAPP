import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { v4 as uiud } from "uuid";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
/**
 * 
 * @param {*} props 
 * @returns cards which themselves redirect to newsarticle cards 
 */
const NewsCard = (props) => {
  return (
    <Link to={`/News/Articles/${uiud()}`} state={props.data}>
      {" "}
      <Card
        sx={{
          height: "10rem",
          backgroundColor: "#EEE5BF",
          width: 0.75,
          mt: "2rem",
          mb: "2rem",
          borderRadius: "1rem",
        }}
      >
        {" "}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <img
            src={props.data.urlToImage}
            style={{
              marginLeft: "-1rem",
              marginTop: "-1rem",
              width: "30%",
              height: "140%",
              objectFit: "cover",
            }}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontFamily: "Oxygen", fontWeight: "bold", mb: "1rem" }}
              variant="h5"
            >
              {props.data.title}
            </Typography>
            <Typography
              sx={{ fontFamily: "Libre Baskerville" }}
              variant="body1"
            >
              {props.data.description.length > 183 &&
              props.data.description !== "No Description Found"
                ? props.data.description.slice(0, 150) + "..."
                : props.data.description}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Link>
  );
};
export default NewsCard;
