import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import GetInTouchModal from "./GetInTouchModal";
import tellusimg from "../../assets/tellusimg.png";

const TellUs = ({PopUp,data}) => {
  return (
    <>
      <section id="tellus">
        <LazyLoadImage src={data?.Image} alt="interiors" id="chairs" />
        <h2>{data?.header}</h2>
        <div id="workbtn" onClick={() => PopUp(true)}>
          <GetInTouchModal PopUp={PopUp}/>
        </div>
      </section>
    </>
  );
};

export default TellUs;
