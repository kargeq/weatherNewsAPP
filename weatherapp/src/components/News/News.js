import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Helmet } from "react-helmet";
import NewsCard from "./NewsCard/NewsCard";
import { v4 as uiud } from "uuid";

const News = () => {
  useEffect(() => {
    document.title = "News";
  }, []);

  const news = {
    status: "ok",
    totalResults: 20,
    articles: [
      {
        source: {
          id: null,
          name: "CNN",
        },
        author: "Analysis by Stephen Collinson, CNN",
        title:
          "Biden's big speech: A defense of democracy and a call to action",
        description:
          "President Joe Biden on Wednesday night outlined a vision for how to repair a US battered by the coronavirus pandemic, his $2 trillion infrastructure plan and years of disunity, offering an expansive defense of his efforts to reassert America's traditional values on…",
        url: "https://www.cnn.com/2021/04/28/politics/joe-biden-speech/index.html",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_news/15CCE/production/_129449298_emergenciasmadrid.jpg",
        publishedAt: "2021-04-29T02:17:36Z",
        content:
          "Washington (CNN)President Joe Biden on Wednesday night outlined a vision for how to repair a US battered by the coronavirus pandemic, his $2 trillion infrastructure plan and years of disunity, offering … [+10204 chars]",
      },
      {
        source: {
          id: null,
          name: "Fox News",
        },
        author: "Chris Ciaccia",
        title: "NASA's Ingenuity helicopter takes first flight on Mars",
        description:
          "NASA's Mars helicopter, Ingenuity, has made its historic first flight on the Red Planet, marking the first powered, controlled flight on another planet, according to the space agency.",
        url: "https://www.foxnews.com/science/nasas-ingenuity-helicopter-takes-first-flight-on-mars",
        urlToImage:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--vZhwGL1Q--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ci1qxacirlt8d91iuv0j.png",
        publishedAt: "2021-04-19T11:55:31Z",
        content:
          "NASA's Mars helicopter, Ingenuity, has made its historic first flight on the Red Planet, marking the first powered, controlled flight on another planet, according to the space agency.\r\nThe small helico… [+2627 chars]",
      },
    ],
  };

  return (
    <Grid container justifyContent="center" sx={{ ml: "11rem" }}>
      {" "}
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Oxygen:wght@700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {news.articles.map((element) => {
        return <NewsCard key={uiud()} data={element}></NewsCard>;
      })}
    </Grid>
  );
};

export default News;
