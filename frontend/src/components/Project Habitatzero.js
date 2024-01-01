import React, { useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/habitat1.png";
import pimg2 from "../assets/habitat2.png";
import concept from "../assets/habitatconcept.png";
import gal1 from "../assets/habitatgal1.png";
import gal2 from "../assets/habitatgal2.png";
import gal3 from "../assets/habitatgal3.png";
import gal4 from "../assets/habitatgal4.png";
import BuildProject from "./common/BuildProject";

function Projectxyz() {
  return (
    <div id="projectxyz">
      <div className="projectheroimg" id="projhabitat">
        <div className="heronavproj">{"HOME > PROJECTS > HABITAT ZERO"}</div>
        <div className="projectheading">
          <div className="projecttype">
            Residential
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">Habitat Zero </div>
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
            <strong>Location:</strong> New Delhi, India
          </p>
          <p>
            <strong>Built-up Area:</strong> --
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
          The world has become extremely sensitive to the predicament of climate
          change. Even after the world succumbing to the global pandemic it is
          estimated that the ill effects due to climate change shall far
          outweigh the effects of the current situation.This has lead to the
          rethinking of how housing shall exist. The systems and construction
          techniques employed must not only be green but must be reimagined to
          be able to modulate and adapt to the needs of the time.
        </p>
      </div>
      <div className="pimg">
        <img src={pimg2} alt="" className="projectimg" />
      </div>
      <div className="projtext" id="text2">
        <p>
          The solution to this is to make the new system transient in nature. It
          must be thought about from cradle to cradle while being an active
          contributor to the urban fabric. It must be able to circumvent there
          permanence built environment and must become flexible to change the
          environment based on the constraints and conditions. It must be
          thought about not just about the embodied energy, but the total life
          cycle of all elements and its reuse once the system becomes defunct.
          Finally, it must be more than just a self-sustained pod but must go
          beyond its own system by contributing back to the larger ecosystem of
          the urban fabric.
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
            Habitat Zero is a transportable modular pod traversing the urban
            landscape to fixed nests, revitalising the environment while being
            born infinitesimally- an ode to carbon neutral on and off grid
            hybrid lifestyles. Completely reusable through dry modular CLT
            construction, it aims to exemplify the green nature of CLT and the
            infinite possibilities to reuse its various components. The
            pollution remediating façade doesn’t just provide an enhanced living
            environment but also tackles the massive pollution issues in major
            urban cities across India like New Delhi and Mumbai, making it an
            active positive contributor to the urban fabric.
            <br />
            <br /> Using CLT as a material for all structural and spatial
            purposes itself reduces the carbon footprint by 36%. Owing to its
            modular nature, the building can be repurposed or its materials can
            be recycled at the end of its life cycle with no wastage whatsoever.
            Ease in transport and assemblage ensures that the process is
            greener, more affordable and responsible.
            <br />
            <br /> Habitat zero is a re-imagined formula for housing needs and
            reimagining the way in which we interact with the built environment.
            It is a new take on construction systems where the typical
            permanency is replaced by transient reusability and eco sensitive
            community initiatives.
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
