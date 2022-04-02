import React from "react";
import Hour from "./components/Hour";
import Minute from "./components/Minute";
import AmPm from "./components/AmPm";
import Sun from "./components/Sun";
import "./styles/App.css";
import Month from "./components/Month";
import Day from "./components/Day";

function App() {

  return (
    <div className="App">
      <header>
        <h3>Select a,, time that work's best !!</h3>
      </header>
      <Sun />
      <section className="time-container">
        Time?
      <Hour />
      :
      <Minute />
      <AmPm />
      </section>

        <div className="time-container">
          <h3>Date</h3>
          <Month />
          /
          <Day />
        </div> 
    </div>
  );
}

export default App;
