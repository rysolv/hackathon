import React, { useState } from "react";
import Poppers from "./Poppers";
import "../styles/PopUp.css";

function Minute() {
  const [isOpen, setIsOpen] = useState(false);
  const [minuteCount, setMinuteCount] = useState(0);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addMinute = () => {
    if (minuteCount < 60) setMinuteCount(minuteCount + 1);
    else setMinuteCount(0);
    setIsOpen(!isOpen);
  };

  const removeMinute = () => {
    if (minuteCount > 1) setMinuteCount(minuteCount - 1);
    else setMinuteCount(0);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input className="select-btn" type="button" value={minuteCount < 10 ? "0" + minuteCount : minuteCount} onClick={togglePopup} />
      {isOpen && (
        <Poppers
          content={
            <>
              <div className="popup-header">
              <img className="clippy" src="https://i.gifer.com/origin/c6/c6afab251a20e6d0eb80b983450bc66e_w200.gif" alt="clippy" />
                {minuteCount
                  ? "You selected " +
                    minuteCount +
                    ". Would you like to change it?"
                    : "time 2 add  you're minute :) Choose a option:"}{" "}
                    </div>
              <button className="counter" onClick={addMinute}>
                more
              </button>
              <button className="counter" onClick={removeMinute}>
                Less
              </button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Minute;
