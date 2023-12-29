import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/epco12.png";
import pimg2 from "../assets/epco22.png";
import concept from "../assets/epcoconcept.png";
import gal1 from "../assets/epco2gal1.png";
import gal2 from "../assets/epco2gal2.png";
import gal3 from "../assets/epco2gal3.png";
import gal4 from "../assets/epco2gal4.png";
import gal5 from "../assets/epco2gal5.png";
import gal6 from "../assets/epco2gal6.png";
import gal7 from "../assets/epco2gal7.png";
import gal8 from "../assets/epco2gal8.png";
import gal9 from "../assets/epco2gal9.png";
import gal10 from "../assets/epco2gal10.png";
import gal11 from "../assets/epco2gal11.png";
import BuildProject from "./common/BuildProject";
function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projepco2">
        <div className="heronavproj">
          {"HOME > PROJECTS > EPCO CM RISE SCHOOLS-ASHTA"}
        </div>
        <div className="projectheading">
          <div className="projecttype">
            institutional
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">EPCO CM Rise Schools- Ashta </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong> Machya Pradesh Government (CM Rise)
          </p>
          <p>
            <strong>Location:</strong> Sehore, Madhya Pradesh, India
          </p>
          <p>
            <strong>Built-up Area:</strong>
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong>Status: </strong> Started
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          The EPCO CM Rise schools, being built in small districts of Madhya
          Pradesh, are an initiative by the MP Government to improve education
          infrastructure to promote enrollment, continuation and quality of
          education for children from economically backward regions. This school
          is located in Sehore District of Madhya Pradesh. This school will
          serve more than 3000 students, from class 4 to class 12, and employ a
          large body of staff.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The school was designed keeping in mind the basic requirement for the
          users- creating a welcoming, playful and exciting environment for
          students built sustainably and with purpose. Keeping in mind the
          socio-economic background of the students and their families, it was
          designed with a modern look, to keep children enrolled and interested
          in being educated. The bright, smart colours and the play of straight
          lines and obtuse angles gives the school a modern finish. Being one of
          the largest schools, We have designed Ashta in a way that all the
          blocks are interconnected and accessible from all parts, making it
          cosy despite its size.
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
            There are some common features in all 14 of our EPCO CM Rise schools
            spread across Sehore and Alirajpur districts. These features,
            although small, are very significant in creating a comfortable, safe
            and lively environment for the schools. <br /> <br />
            <strong> Recessed windows</strong>- All typical windows in the
            schools have a 750mm recession. This makes the windows themselves
            act like sunshades, creating a clean façade. The space under the
            recessed window is used as storage space. Above the windows are
            aluminium fanlights with fixed glass, to let in scattered sunlight
            without glare.
            <br />
            <br /> <strong> Ramps</strong>- The schools are built around the
            ramps, making them a main feature rather than hidden away as
            secondary thoughts.
            <br />
            <br />
            <strong> Sloping roofs</strong>- A problem observed in the existing
            schools was that due to lack of maintenance, flat roofs led to
            stagnant water and eventually seepage and leakage. To prevent this,
            we provided sloping roofs in all schools.
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
const images = [
  gal1,
  gal2,
  gal3,
  gal4,
  gal5,
  gal6,
  gal7,
  gal8,
  gal9,
  gal10,
  gal11,
];
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
