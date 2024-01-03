import React from "react";
import tellusimg from "../assets/tellusimg.png";
import "./Tellus.css";

function Tellus(props) {
  return (
    <section id="tellus">
      <img src={tellusimg} alt="interiors" id="chairs" />
      <h2>Tell us about your next Project</h2>
      <div id="workbtn">
        <button
          onClick={() => {
            props.PopUp(true);
          }}
        >
          {/* Work With Us &nbsp;&nbsp;&nbsp; <tag> &#8594;</tag> */}
          Get in Touch
        </button>
      </div>
    </section>
  );
}

export default Tellus;
