import React, { useState } from "react";
import Poppers from "./Poppers";
import "../styles/PopUp.css";

function AmPm() {
  const [isOpen, setIsOpen] = useState(false);
  const [AmPm, setAmPm] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const setAm = () => {
    setAmPm("am");
    setIsOpen(!isOpen);
  };

  const setPm = () => {
    setAmPm("PM");
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <input className="select-btn" type="button" value={AmPm ? AmPm : "when"} onClick={togglePopup} />
        {isOpen && (
          <Poppers
            content={
              <>
                <div className="popup-header">
                  <img className="clippy" src="https://i.gifer.com/origin/c6/c6afab251a20e6d0eb80b983450bc66e_w200.gif" alt="clippy" />
                  whern:
                </div>
                <button className="counter" onClick={setAm}>
                  AM
                </button>
                <button className="counter" onClick={setPm}>
                Pm
                </button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
    </div>
  );
}

export default AmPm;
