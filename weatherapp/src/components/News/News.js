import { Grid, Typography } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Helmet } from "react-helmet";
import NewsCard from "./NewsCard/NewsCard";
import { v4 as uiud } from "uuid";
import { AppStateContext } from "../AppState";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
/**
 * 
 * @returns news document with search results and information 
 */
const News = () => {
  const { appState, setAppState } = useContext(AppStateContext);
  const [searchItem, setSearchItem] = useState();
  const [currentQuery, setCurrentQuery] = useState("");
  const [news, setNews] = useState([]);
  useEffect(() => {
    document.title = "News";//set title

    if (appState.currentQuery && appState.searchItem) {
      setSearchItem(appState.searchItem);
      setCurrentQuery(appState.currentQuery);
    }
  }, []);

  useEffect(() => { //if submission state var changes make api call 
    const getArticles = async () => {
      if (news === [] && appState.news !== [] && appState.news) {
        setNews(appState.news);
      } else if (searchItem) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=${searchItem}&apiKey=${process.env.REACT_APP_News_API_KEY}&pageSize=20&sortBy=relevancy`
          );
          console.log(
            `https://newsapi.org/v2/everything?q=${searchItem}&apiKey=${process.env.REACT_APP_News_API_KEY}&pageSize=20&sortBy=relevancy`
          );
          const jsonData = await response.json();
          console.log("data");
          console.log(jsonData);

          //https://newsapi.org/v2/top-headlines?q=Trump&apiKey=3560d834d19e46d7958cf337841f0e5c
          setNews(jsonData);
          setAppState((prevState) => ({
            ...prevState,
            news: jsonData,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    getArticles();
  }, [searchItem]);

  const handleInputChange = (event) => {
    setCurrentQuery(event.target.value);
    setAppState((prevState) => ({
      ...prevState,
      currentQuery: event.target.value,
    }));
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const SearchQuery = document.forms["search"]["searchResult"].value;
    setAppState((prevState) => ({
      ...prevState,
      searchItem: SearchQuery,
    }));
    setSearchItem(SearchQuery);
  };
  return (
    <>
      {searchItem ? (
        <Grid container justifyContent="center" sx={{ ml: "11rem" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              justifyContent: "center",
              mt: "2rem",
              mr: "20rem",
            }}
          >
            <form id="search" onSubmit={handleSearch}>
              <input
                style={{
                  width: "20rem",
                  height: "2rem",
                  borderTopLeftRadius: "3rem",
                  borderBottomLeftRadius: "3rem",
                  borderTopRightRadius: "0rem",
                  borderBottomRightRadius: "0rem",
                  display: "inline-block",
                }}
                type="search"
                className="form-control "
                placeholder="Search a news Article"
                aria-label="Search"
                aria-describedby="search-addon"
                name="searchResult"
                value={currentQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                style={{
                  borderTopRightRadius: "3rem",
                  borderBottomRightRadius: "3rem",
                  borderTopLeftRadius: "0rem",
                  borderBottomLeftRadius: "0rem",
                  width: "5rem",
                  height: "2rem",
                  marginBottom: "0.235rem",
                  display: "inline-block",
                }}
                className="btn btn-outline-primary"
              >
                <PlagiarismIcon
                  style={{ marginTop: "-0.4rem" }}
                ></PlagiarismIcon>
              </button>
            </form>

            <Typography sx={{ ml: "8rem", mt: "2rem" }}>
              Showing results for{" "}
              <span style={{ color: "green" }}>{searchItem}</span>
            </Typography>
          </CardContent>
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Oxygen:wght@700&display=swap"
              rel="stylesheet"
            />
          </Helmet>

          {news.articles ? (
            news.articles.map((element) => { //return data from api if applicable 
              return (
                <NewsCard
                  key={uiud()}
                  data={{
                    ...element,
                    description:
                      element.description === null || element.description === ""
                        ? "No Description Found"
                        : element.description,
                    urlToImage:
                      element.urlToImage === null
                        ? "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        : element.urlToImage,
                  }}
                ></NewsCard>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              justifyContent: "space-between",
              justifyContent: "center",
              mt: "20rem",
            }}
          >
            <div className="input-group">
              <form id="search" onSubmit={handleSearch}>
                <input
                  style={{
                    width: "40rem",
                    height: "4rem",
                    borderTopLeftRadius: "3rem",
                    borderBottomLeftRadius: "3rem",
                    borderTopRightRadius: "0rem",
                    borderBottomRightRadius: "0rem",
                    display: "inline-block",
                  }}
                  type="search"
                  className="form-control "
                  placeholder="Search a news Article"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  name="searchResult"
                  value={currentQuery}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  style={{
                    borderTopRightRadius: "3rem",
                    borderBottomRightRadius: "3rem",
                    borderTopLeftRadius: "0rem",
                    borderBottomLeftRadius: "0rem",
                    width: "5rem",
                    height: "4rem",
                    marginBottom: "0.235rem",
                    display: "inline-block",
                  }}
                  className="btn btn-outline-primary"
                >
                  <PlagiarismIcon fontSize="large"></PlagiarismIcon>
                </button>
              </form>
            </div>
          </CardContent>
        </Grid>
      )}
    </>
  );
};

export default News;
