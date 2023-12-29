import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Latestblogcard({ img, title, name, date, link, Id }) {
  const navigate = useNavigate();

  const handleProject = (id) => {
    navigate(`/Matter/${id}`);
  };

  return (
    <div onClick={() => handleProject(Id)} id="blogcard">
      <div className="cardtop">
        <LazyLoadImage src={img} alt="img" />
      </div>
      <div className="cardbottom">
        <h3 className="cardtitle">{title}</h3>
        <div className="w-100 d-flex justify-content-between cardINfo ">
          <p className="cardname">{name}</p>
          <p className="carddate">{date}</p>
        </div>
        <div className="cardbutton">READ</div>
      </div>
    </div>
  );
}

export default Latestblogcard;
