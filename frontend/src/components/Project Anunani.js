import React, { useState } from "react";
import "./Projectxyz.css";
import projecthero from "../assets/anunanihero.png";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/anunani1.png";
import pimg2 from "../assets/anunani2.png";
// import testxyz from "../assets/Testimonialxyz.png";
import gal1 from "../assets/anunanigal1.png";
import gal2 from "../assets/anunanigal2.png";
import gal3 from "../assets/anunanigal3.png";
import gal4 from "../assets/anunanigal4.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projanunani">
        <div className="heronavproj">
          {"HOME > PROJECTS > ANU & NANI RESIDENCE"}
        </div>
        <div className="projectheading">
          <div className="projecttype">
            Residential
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">Anu & Nani Residence </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong> Anuradha & Narayan Raju
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
            <strong> Status: </strong> Completed 2015
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          The Villa was designed in 2012 for the family of Anuradha & Narayan
          Raju, their children – Anirudh and Neha, and his mother, in Bangalore.
          The main aim was to make all spaces function to the maximum and to be
          visually pleasing, where some spaces will be simplistic and well
          organized, others delightfully inspiring. Overall, the Design, a
          delightful house with spaces that convert from private cozy scales to
          large spaces to host big gatherings. A play of textures and volumes
          are woven by an interesting composition of light to create and ever
          changing habitat inspired by the clients lifestyle.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The drama of the house begins from the entrance with a column free
          porch with an expansive landscaping divided by the automatic rolling
          doors of the garage and a lift to the main lobby. The garage has
          movable and openable partitions so the ground floor can house 4-6 of
          the client's high end cars or double as a party hall of 300 capacity
          spilling out into the garden. The soft textures and the use of greens
          to enhance the quality of the space helps create a connect to the
          interiors thereby blurring the lines between the closed and open
          areas.
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
        {/* <div className="gallerycontainer"></div> 
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
