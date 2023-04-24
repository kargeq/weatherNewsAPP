import { Card,Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useLocation } from 'react-router-dom';
import PageNotFound from "../../../PageNotFound";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import {split} from "sentence-splitter";
import { v4 as uiud } from "uuid";
import { useState } from "react";
const NewsArticle=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [AISummary,setAIsummary]=useState();
    const location = useLocation();



    const getData=async()=> {

        try{
            setIsLoading(true)
          const response = await fetch(`https://api.meaningcloud.com/summarization-1.0?key=${process.env.REACT_APP_SUMMARY_API_KEY}&url=${props.url}&sentences=5`);
        const jsonData = await response.json();
        const sentences = split(jsonData.summary).map((sentence) => sentence.raw);
        setAIsummary( sentences.filter(sentence => sentence !== " "));
  
      
        }catch{

         
        }
        
        setIsLoading(false)
      }
    if(location.state===null){
        return (<PageNotFound></PageNotFound>)
    }
      const props=location.state
      let FormattedDay="N/A"
      const date=new Date(props.publishedAt)
      const getDay=new Intl.DateTimeFormat("en-US", {
        month:"long",
        weekday: "long",
        day: "numeric",
        year:"numeric"
      });
       
      if (props.publishedAt){
        FormattedDay=getDay.format(date)
      }
 

    return (<>
   <Grid container justifyContent="center"> 
    <Card sx={{ backgroundColor: "#EEE5BF", width: 0.75, mt: "2rem", mb: "2rem", borderRadius: "1rem", height: "auto" }}>
      <img src={props.urlToImage} style={{ width:"100%", height: "60%" }} />
      <Typography sx={{ fontFamily:'Oxygen', fontWeight:"bold", mb:"1rem"}} variant="h2" >
        {props.title}
      </Typography>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "0",
          border: 1 ,
          borderColor: '#055204',
          borderWidth:"0.05rem",
          borderRadius:1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        
        <Typography><span style={{  fontWeight:"bold"}}>News Source:</span> {props.source.name}</Typography>
        <Typography><span style={{  fontWeight:"bold"}}>Author:</span> {props.author}</Typography>
        <Typography><span style={{  fontWeight:"bold"}}>Date:</span> {FormattedDay}</Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "0",
         
        }}
      >
        <p>{props.description}</p>
        
      </CardContent>
      <Grid container justifyContent="center"> 
      <CardContent sx={{display: "flex",alignItems: "center",
          justifyContent: "space-between",flexDirection: "row",}}>
      <a className="btn btn-primary"href={props.url} target="_blank" role="button">See original Article</a>

      <Typography sx={{  fontWeight:"bold" ,ml:"1rem", mr:"1rem"}}>OR</Typography>
      {isLoading?<CircularProgress/> : <button onClick={getData} type="button" className="btn btn-info">Generate AI Summary</button>}
     
     
      </CardContent>
      </Grid>
    </Card>
  </Grid>
  
  {AISummary!==undefined?
  <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Card sx={{backgroundColor:"#e8c3bc", mb:"2rem"}}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Key Details
            </Typography>
            <List>
            {AISummary.map((Element)=>{
                return <ListItem key={uiud()}>
                <StarIcon/>
                <ListItemText primary={Element} />
              </ListItem>
            })}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>:<></>}</>
)
}
export default NewsArticle