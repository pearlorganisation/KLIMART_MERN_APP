import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/biome1.png";
import pimg2 from "../assets/biome2.png";
// import testxyz from "../assets/Testimonialxyz.png";
import gal1 from "../assets/biomegal1.png";
import gal2 from "../assets/biomegal2.png";
import gal3 from "../assets/biomegal3.png";
import gal4 from "../assets/biomegal4.png";
import concept from "../assets/biomeconcept.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projbiome">
        <div className="heronavproj">{"HOME > PROJECTS > BIOME+"}</div>
        <div className="projectheading">
          <div className="projecttype">
            Residential
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">Biome+ </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong>
          </p>
          <p>
            <strong>Location:</strong> New Delhi, India
          </p>
          <p>
            <strong>Built-up Area:</strong>
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong> Status</strong>: Competition
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          Established in 2001 as a Private Limited Company, KlimArt prides
          itself in being one of its kind of Architecture, Urban Planning and
          Interiors firm which provides end-to-end solution in terms of design
          and project management. Established in 2001 as a Private Limited
          Company, KlimArt prides itself in being one of its kind of
          Architecture, Urban Planning and Interiors firm which provides
          end-to-end solution in terms of design and project management.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          Established in 2001 as a Private Limited Company, KlimArt prides
          itself in being one of its kind of Architecture, Urban Planning and
          Interiors firm which provides end-to-end solution in terms of design
          and project management. Established in 2001 as a Private Limited
          Company, KlimArt prides itself in being one of its kind of
          Architecture, Urban Planning and Interiors firm which provides
          end-to-end solution in terms of design and project management.
        </p>
      </div>
      {/* <div id="testimonialxyz">
        <img src={testxyz} alt="" />
      </div> */}
      <div id="concept">
        <div id="concepttoptext">
          <div className="projecttoptext">
            Concept
            <img src={line} alt="" />
          </div>
        </div>
        <div className="cimg">
          <img src={concept} alt="Concept" />
        </div>
        <div className="concepttext">
          <p>
            Established in 2001 as a Private Limited Company, KlimArt prides
            itself in being one of its kind of Architecture, Urban Planning and
            Interiors firm which provides end-to-end solution in terms of design
            and project management. Established in 2001 as a Private Limited
            Company, KlimArt prides itself in being one of its kind of
            Architecture, Urban Planning and Interiors firm which provides
            end-to-end solution in terms of design and project management.
          </p>
        </div>
        {/* <div className="gallerycontainer"></div> */}
      </div>
      <div id="galary">
        <div
          style={{ marginBottom: "2rem", paddingLeft: "7rem" }}
          className="projecttoptext"
        >
          Gallery
          <img src={line} alt="" />
        </div>
        <Gallery />
      </div>
      <section className="buildProjects">
      <BuildProject/>
      </section>
    </div>
  );
}

// const images = [chairs, pimg1, chairs, chairs, chairs, chairs];
const images = [gal1, gal2, gal3, gal4];
const Gallery = () => {
  const [currIdx, setCurrIdx] = useState(0);
  return (
    <section id="galary_carousel">
      <div className="galary_wrapper">
        <div className="big_img">
          <img src={images[currIdx]} alt="" />
        </div>
        <div className="scroll_img">
          {images.map((img, i) => (
            <img
              className={currIdx === i ? "galary_img_selected" : ""}
              src={img}
              onClick={() => setCurrIdx(i)}
              alt=""
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default Projectxyz;
