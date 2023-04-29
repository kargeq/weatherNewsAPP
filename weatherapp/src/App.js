import React from "react";
import "./App.css";
import Weather from "./components/Weather/Weather.js";
import { BrowserRouter as  Router,Route, Routes, Link } from "react-router-dom";
import News from "./components/News/News";
import PageNotFound from "./components/PageNotFound";
import NewsArticle from "./components/News/NewsCard/MoreInfoNewsCard/NewsArticle";
import { AppStateProvider } from "./components/AppState";
/**
 *
 * @returns App for weather and news
 */
function App() {
  return (
    <>
      <AppStateProvider>
        {/* wrap code inside context */}
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
          {/* Create routes to be used to allow navbar to redirect to components */}
          <Route exact path="/" element={<Weather />} />
          <Route path="/News" element={<News />} />
          <Route path="/News/Articles/:userId" element={<NewsArticle />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppStateProvider>
    </>
  );
}

export default App;
