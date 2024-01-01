import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/epco1.png";
import pimg2 from "../assets/epco2.png";
import concept from "../assets/epcoconcept.png";
import gal1 from "../assets/epcogal1.png";
import gal2 from "../assets/epcogal2.png";
import gal3 from "../assets/epcogal3.png";
import gal4 from "../assets/epcogal4.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projepco">
        <div className="heronavproj">
          {"HOME > PROJECTS > EPCO CM RISE SCHOOLS - SHAHGANJ"}
        </div>
        <div className="projectheading">
          <div className="projecttype">
            Institutional
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">EPCO CM Rise Schools- Shahganj </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong>Madhya Pradesh Government (CM Rise)
          </p>
          <p>
            <strong>Location:</strong> Sehore, Madhya Pradesh, India
          </p>
          <p>
            <strong>Built-up Area:</strong> 189,000 sqft.
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong>Start Date: </strong> January 2021
          </p>
          <p>
            <strong>Completion Date:</strong> June 2022
          </p>
          <p>
            <strong>Sustainable Accreditation:</strong> Targeting LEED Gold
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
          serve about 1500 students, from kindergarten to class 12, and employ a
          large body of staff.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The school was designed sustainably, creating a welcoming, playful and
          exciting environment for students-the primary users of the space! The
          recessed windows and the vertical louvres create a playful and
          attractive façade. <br /> <br /> Shahganj is a place prone to water
          logging in the rains. The school's location is planned according to
          the contours to avoid water logging, so that it can also act as a
          healthcare centre and collection area during monsoon season. <br />{" "}
          <br /> With feature staircases and a luxurious multi purpose hall, our
          aim is to make the students proud of being educated in a government
          school in their district.
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
            recessed window is used as storage space. <br /> <br /> Above the
            windows are aluminium fanlights with fixed glass, to let in
            scattered sunlight without glare. <br /> <br />{" "}
            <strong>Ramps- </strong> The schools are built around the ramps,
            making them a main feature rather than hidden away as secondary
            thoughts. <br /> <br /> <strong>Sloping roofs</strong> - A problem
            observed in the existing schools was that due to lack of
            maintenance, flat roofs led to stagnant water and eventually seepage
            and leakage. To prevent this, we provided sloping roofs in all
            schools.
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
