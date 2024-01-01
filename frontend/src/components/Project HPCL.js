import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/hpcl1.png";
import pimg2 from "../assets/hpcl2.png";
import concept from "../assets/hpclconcept.png";
import gal1 from "../assets/hpclgal1.png";
import gal2 from "../assets/hpclgal2.png";
import gal3 from "../assets/hpclgal3.png";
import gal4 from "../assets/hpclgal4.png";
import gal5 from "../assets/hpclgal5.png";
import gal6 from "../assets/hpclgal6.png";
import gal7 from "../assets/hpclgal7.png";
import gal8 from "../assets/hpclgal8.png";
import gal9 from "../assets/hpclgal9.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projhpcl">
        <div className="heronavproj">
          {"HOME > PROJECTS > HPCL NORTH CENTRAL HQ"}
        </div>
        <div className="projectheading">
          <div className="projecttype">
            Institutional
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">HPCL North Central Zone HQ </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong> Hindustan Petroleum
          </p>
          <p>
            <strong>Location:</strong> Bengaluru, Karnataka, India
          </p>
          <p>
            <strong>Built-up Area:</strong> 189,000 square feet
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong>Status: </strong> Completed 2015
          </p>
          <p>
            <strong>Sustainable Accreditation:</strong> 5 star GRIHA rating
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          Hindustan Petroleum Corporation Limited North Zone Office, Lucknow was
          designed by klimArt. Located in the North Central retail zone,
          Gomtinagar, Lucknow with a site area of 1000 sq.m, Hindustan Petroleum
          Corporation Limited (A Government of India Enterprise) is targeted for
          5 STAR GRIHA Green Building Rating. It embodies the core philosophies
          of klimArt through its best sustainable practices and economic design
          principles paving a way for not just buildings but a more integrated
          piece of the urban fabric.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The orientation of building is kept such that the longer façade is
          kept along the south and north with façade stretching to 19.5m and
          20.97m respectively. On the other hand, the west and east façade
          stretch only to 12.63m and 16.7m respectively. Summer corner-
          Northwest part – is consumed by toilets and staircase acting as a heat
          buffer. Most service spaces are placed along west and east side. More
          number of glazing has been provided on southern facade of the building
          which welcomes winter sun. Relatively less number of openings are
          provided in northern façade which restricts summer sun. The building
          has an excellent EPI value of 70 KW/h/SqM/Year.
        </p>
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
            The total roof area is around 242.04 sq m. Rainwater recharging is
            provided and is done through 100 dia. pipes. Average rainfall is
            about 1000mm annually. Considering the roof area of 242 sq m, it is
            possible for the project to collect almost 9289 liters of water over
            a period of 2 days.
            <br />
            <br /> Grass pavers have been used. By using grass pavers, a total
            of 141.82 sq m of area is soft paved. Paving blocks with 24%
            pervious area are being used in project. The whole site around the
            office block is covered with Grass pavers. Planters/Terrace gardens
            are used to reduce heat gain.
            <br />
            <br /> White texture paint is applied on exterior façade which
            reflects heat and reduces Urban Heat Island Effect. The fixing of
            Solar PV panels is done in such a way that it gets most radiation
            from the sun and acts as a shading device for the roof, cutting off
            a large amount of solar radiation and reducing direct solar heat
            gain.
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
const images = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9];
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
