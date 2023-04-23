import { Card,Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useLocation } from 'react-router-dom';
import PageNotFound from "../../../PageNotFound";

const NewsArticle=()=>{

    const location = useLocation();
    if(location.state===null){
        return (<PageNotFound></PageNotFound>)
    }
      const props=location.state
    return (<Grid container justifyContent="center"> <Card sx={{ height:"10rem", backgroundColor: "#EEE5BF", width: 0.75, mt: "2rem",mb:"2rem", borderRadius:"1rem" , }}> <CardContent
    sx={{
      display: "flex",
      flexDirection: "row",
      height:"100%"
     
    }}
  > <p>{props.title}{props.description}</p></CardContent> </Card></Grid>)
}
export default NewsArticle