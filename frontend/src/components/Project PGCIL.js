import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/pgcil1.png";
import pimg2 from "../assets/pgcil2.png";
// import testxyz from "../assets/Testimonialxyz.png";
import gal1 from "../assets/pgcilgal1.png";
import gal2 from "../assets/pgcilgal2.png";
import gal3 from "../assets/pgcilgal3.png";
import gal4 from "../assets/pgcilgal4.png";
import gal5 from "../assets/pgcilgal5.png";
import gal6 from "../assets/pgcilgal6.png";
import gal7 from "../assets/pgcilgal7.png";
import gal8 from "../assets/pgcilgal8.png";
import gal9 from "../assets/pgcilgal9.png";
import gal10 from "../assets/pgcilgal10.png";
import BuildProject from "./common/BuildProject";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projpgcil">
        <div className="heronavproj">{"HOME > PROJECTS > PGCIL CAMPUS"}</div>
        <div className="projectheading">
          <div className="projecttype">
            institutional
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">PGCIL Campus </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong> Power Grid (South)
          </p>
          <p>
            <strong>Location:</strong> Bengaluru, Karnataka, India
          </p>
          <p>
            <strong>Built-up Area:</strong> 40113.05 sq.m (9.91 acres)
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong>Start Date: </strong>
          </p>
          <p>
            <strong>Completion Date:</strong>
          </p>
          <p>
            <strong>Sustainable Accreditation:</strong> 4 star rating under
            GRIHA, HUDCO design award 2016- Green Building
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          Power Grid Corporation of India Limited was designed in the Southern
          Regional Transmission System-II, Yelahanka Hobli, Bangalore. Power
          Grid Corporation of India Limited (A Government of India Enterprise)
          has beenawarded a “Four Star” rating under GRIHA in the year 2017. It
          has also won HUDCO Design Award for the year 2016 in Green Building
          Category.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The project was the master plan design of the multi-use Regional
          campus which included the RHQ, staff quarters, cultural centre, other
          amenities, and the substation. The Regional headquarters building
          (RHQ) was designed with the aim to achieve maximum sustainability.
        </p>
      </div>
      {/* <div id="testimonialxyz">
        <img src={testxyz} alt="" />
      </div>
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
      </div> */}
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
        <BuildProject />
      </section>
    </div>
  );
}

// const images = [chairs, pimg1, chairs, chairs, chairs, chairs];
const images = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10];
const Gallery = () => {
  const [currIdx, setCurrIdx] = useState(0);
  return (
    <section id="galary_carousel">
      <div className="galary_wrapper">
        <div className="big_img">
          <LazyLoadImage src={images[currIdx]} alt="" />
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
