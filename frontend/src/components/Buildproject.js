import React from "react";
import "./Home.css";

function buildproject(props) {
  return (
    <section id="buildproject">
      <div id="projectcaption">
        <h2>
          Looking to build<br></br> your next project?
        </h2>
      </div>
      <div className="projectbutton">
        <button onClick={() => props.PopUp(true)}>
          Get In Touch &nbsp;&nbsp;&nbsp; <tag> &#8594;</tag>
        </button>
      </div>
    </section>
  );
}

export default buildproject;
