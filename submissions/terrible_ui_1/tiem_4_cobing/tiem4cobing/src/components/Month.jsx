import React, { useState } from "react";
import Poppers from "./Poppers";
import "../styles/PopUp.css";


function Month() {
    const months = ["", "Janruary", "Febuary", "march", "Arpil", "May", "June", "july", "augest", "septmber", "OCtober", "Novemner", "December"];
  const [isOpen, setIsOpen] = useState(false);
  let [monthCount, setMonthCount] = useState(0);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addMonth = () => {

    setMonthCount(monthCount + 1)
    setIsOpen(!isOpen);
  };

  const removeMonth = () => {
    setMonthCount(monthCount - 1);
    setIsOpen(!isOpen);
  };



  return (
    <div>
        <input className="select-btn" type="button" value={monthCount ? months[monthCount] : "Choose month"} onClick={togglePopup} />
        {isOpen && (
          <Poppers
            content={
              <>
                <div className="popup-header">
                  <img className="clippy" src="https://i.gifer.com/origin/c6/c6afab251a20e6d0eb80b983450bc66e_w200.gif" alt="clippy" />
                  {months[monthCount]
                    ? "montyh chosen: " +
                      months[monthCount] +
                      ". Change?"
                    : "what number month?"}{" "}
                </div>
                <button className="counter" onClick={addMonth}>
                  Add month
                </button>
                <button className="counter" onClick={removeMonth}>
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

export default Month;
