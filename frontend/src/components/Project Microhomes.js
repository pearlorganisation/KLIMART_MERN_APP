import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/micro1.png";
import pimg2 from "../assets/micro2.png";
// import testxyz from "../assets/Testimonialxyz.png";
import concept from "../assets/microconcept.png";
import gal1 from "../assets/microgal1.png";
import gal2 from "../assets/microgal2.png";
import gal3 from "../assets/microgal3.png";
import gal4 from "../assets/microgal4.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projmicro">
        <div className="heronavproj">{"HOME > PROJECTS > MICRO HOMES"}</div>
        <div className="projectheading">
          <div className="projecttype">
            Hospitality
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">Micro Homes </div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            <strong>Client:</strong> --
          </p>
          <p>
            <strong>Location:</strong> Off-grid Location
          </p>
          <p>
            <strong>Built-up Area:</strong> 46.8 sqm
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            <strong>Status </strong> Competition
          </p>
        </div>
      </div>
      <div className="pimg">
        <img src={pimg1} alt="" className="projectimg" />
      </div>
      <div className="projtext">
        <p>
          In today’s growing world, design innovation has become more important
          and complex than ever. There are increasing opportunities to do
          something different and innovate, but a paucity of jobs. In the age of
          rising environmental crisis and overpopulation in our urbanised
          regions, there is a dire need for going back to our earthen roots and
          contribute back to the community. biome is carbon net +ve system while
          assisting in pollution remediation to solve the ever increasing
          pollution crisis.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The aerodynamic shape assists the air to flow into the cabin. Warm air
          is captured near the roof and can be completely ventilated in hot
          climates by opening the ventilator or trapped to maintain thermal
          comfort in case of cold climates. The front has phytoremediating algae
          that purifies the polluted air through natural processes. We envision
          a well-connected sustainable community, focused on the sharing of
          resources and culture through modular scale living, preventing the
          depletion of resources from the natural environment.
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
            Biome performs over two time scales simultaneously. The day cycle
            has to do with its solar power, passive cooling, water harvesting,
            thermal adaptability and pollution remediation. The Life cycle has
            to do with its low cost recyclable material and its portable prefab
            system. The thermal mass is created on one phase and can be
            customised to either hot or a cold climate based on the
            requirements.
            <br />
            <br /> It acts as a hollow water storage tank with a porous outside
            membrane over which when wind passes over it gets cooled and creates
            a comfortable environment by the evaporative cooling principle. It
            also acts as a hollow trombe wall which helps in thermal insulation
            by trapping a layer of air between the large mass thereby
            maintaining a thermal lag comfort at all times.
            <br />
            <br /> Our goal is to provide a micro living environment for young
            professionals independent of the location or site conditions that
            can be climate customized while harnessing all the forces of nature
            along with purifying the polluted air in the environment.
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
