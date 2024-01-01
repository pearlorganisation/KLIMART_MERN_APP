import React from "react";
import GetInTouchModal from "./GetInTouchModal";

const BuildProject = ({PopUp}) => {
  return (
    <>
      <section id="buildproject">
        <div id="projectcaption">
          <h2>
            Looking to build<br></br> your next project?
          </h2>
        </div>
        <div className="projectbutton" onClick={() => PopUp(true)}>
          <GetInTouchModal PopUp={PopUp}/>
        </div>
      </section>
    </>
  );
};

export default BuildProject;
