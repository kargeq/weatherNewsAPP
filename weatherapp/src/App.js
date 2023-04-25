import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Weather from "./components/Weather/Weather.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import News from "./components/News/News";
import PageNotFound from "./components/PageNotFound";
import NewsArticle from "./components/News/NewsCard/MoreInfoNewsCard/NewsArticle";
import { AppStateProvider } from "./components/AppState";
function App() {
  const MemoizeWeather = React.memo(Weather);
  const MemoizeNews = React.memo(News);

  return (
    <>
      <AppStateProvider>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a style={{ marginLeft: "2rem" }} className="navbar-brand" href="#">
            News and Weather
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Weather <span className="sr-only"></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/News">
                  News
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<MemoizeWeather />} />
          <Route path="/News" element={<MemoizeNews />} />
          <Route path="/News/Articles/:userId" element={<NewsArticle />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppStateProvider>
    </>
  );
}

export default App;
