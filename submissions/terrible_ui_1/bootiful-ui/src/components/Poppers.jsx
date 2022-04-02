import React from "react";
 
const Poppers = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="close-icon" onClick={props.handleClose}>x</div>
        {props.content}
      </div>
    </div>
  );
};
 
export default Poppers;