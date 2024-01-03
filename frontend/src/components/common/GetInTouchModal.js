import React, { useState } from "react";
import "./GetInTouchmodal.css";

const GetInTouchModal = ({PopUp}) => {

  return (
    <>
      {/* <div
        className={`${
          comingFrom === "header1"
            ? ""
            : comingFrom === "header2"
            ? ""
            : "projectbutton"
        }`}
      > */}
      <div className="">
        <button onClick={() => PopUp(true)}>
          Get In Touch &nbsp;&nbsp;&nbsp;
        </button>
      </div>
    </>
  );
};

export default GetInTouchModal;
