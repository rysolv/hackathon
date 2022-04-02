import React, { useState } from "react";
import Poppers from "./Poppers";
import "../styles/PopUp.css";

function Day() {
  const [isOpen, setIsOpen] = useState(false);
  const [dayCount, setDayCount] = useState(1);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addDay = () => {
    if (dayCount < 31) setDayCount(dayCount + 1);
    else setDayCount(1);
    setIsOpen(!isOpen);
  };

  const removeDay = () => {
    if (dayCount > 1) setDayCount(dayCount - 1);
    else setDayCount(1);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input className="select-btn" type="button" value={dayCount < 10 ? "0" + dayCount : dayCount} onClick={togglePopup} />
      {isOpen && (
        <Poppers
          content={
            <>
              <div className="popup-header">
              <img className="clippy" src="https://i.gifer.com/origin/c6/c6afab251a20e6d0eb80b983450bc66e_w200.gif" alt="clippy" />
                {dayCount
                  ? "ur day" +
                    dayCount +
                    ". Would you like to change it?"
                    : "it is day choosing time! pick 1:"}{" "}
                    </div>
              <button className="counter" onClick={addDay}>
                add day
              </button>
              <button className="counter" onClick={removeDay}>
                mionus day
              </button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Day;
