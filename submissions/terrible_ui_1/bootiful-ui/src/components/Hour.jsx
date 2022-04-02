import React, { useState } from "react";
import Poppers from "./Poppers";
import "../styles/PopUp.css";

function Hour() {
  const [isOpen, setIsOpen] = useState(false);
  const [hourCount, setHourCount] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addHour = () => {
    if (hourCount < 12) setHourCount(hourCount + 1);
    else setHourCount(null);
    setIsOpen(!isOpen);
  };

  const removeHour = () => {
    if (hourCount > 1) setHourCount(hourCount - 1);
    else setHourCount(null);
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <input className="select-btn" type="button" value={hourCount ? hourCount : "Select a hour"} onClick={togglePopup} />
        {isOpen && (
          <Poppers
            content={
              <>
                <div className="popup-header">
                  <img className="clippy" src="https://i.gifer.com/origin/c6/c6afab251a20e6d0eb80b983450bc66e_w200.gif" alt="clippy" />
                  {hourCount
                    ? "Your current hour is " +
                      hourCount +
                      ". Would you like to add another?"
                    : "Congratulations, you decided to add a hour! Select:"}{" "}
                </div>
                <button className="counter" onClick={addHour}>
                  Add hour
                </button>
                <button className="counter" onClick={removeHour}>
                  Remove 1
                </button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
    </div>
  );
}

export default Hour;
