import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Weather from './components/Weather.js'
import Hierarchy from 'react-hierarchy';

function App() {

 
  return (
<>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">News and Weather</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Weather <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">News</a>
      </li>
     
    </ul>
    
  </div>
</nav>
  <Weather></Weather>
</>
  );
}

export default App;
