import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import wooden1 from "../assets/wooden1.png";
import wooden2 from "../assets/wooden2.png";
import wooden3 from "../assets/wooden3.png";
import wooden4 from "../assets/wooden4.png";
import wooden5 from "../assets/wooden5.png";
import wooden6 from "../assets/wooden6.png";
import wooden7 from "../assets/wooden7.png";
import wooden8 from "../assets/wooden8.png";
import wooden9 from "../assets/wooden9.png";
import wooden10 from "../assets/wooden10.png";
import wooden11 from "../assets/wooden11.png";
import wooden12 from "../assets/wooden12.png";
import wooden13 from "../assets/wooden13.png";
import wooden14 from "../assets/wooden14.png";
import Newsletter from "./Newsletter";

function Wooden() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="woodenhero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">
            Modern alternatives to wooden surfaces
          </div>
          <div className="blogsubhead">
            HPL- A sustainable, durable laminate
          </div>
          <div className="blogheadbottom">
            <div className="author">
              <div className="authorname">Saoirse Tope</div>
              <div className="publishdate">23 SEPTEMBER 2022</div>
            </div>
            <img src={line} alt="lineseperator" className="bloglinetop" />
            {/* line img here */}
            {/* <div className="likebutton" onClick={() => setIsLiked(!isLiked)}>     
              <TbHeart class={isLiked ? "liked" : "notliked"} />
            </div> */}
          </div>
        </div>
        <div className="blogcontent">
          <p className="blogpara">
            Wood has been used in designing buildings since the beginning of
            built structures. Somewhere, it changed from a purely structural
            component to an aesthetic element as well. From cozy mountain cabins
            to royal, intricately carved wooden gables. From Luxurious hardwood
            floors to clean Scandinavian furniture, it has the versatility of
            becoming a key element in any design. Laminates were a revolution in
            the architecture and construction industry. They became a cost
            effective, low maintenance, durable and easy to install alternative
            for a wooden finish. Developments in this industry have been taking
            place for decades, for instance, wood-like colours and texture
            printing, anti-bacterial technology, etc. <br /> <br /> HPL (High
            Pressure Laminate) is one such technological advancement. A material
            so versatile, we have used it in our ___ sqM residential design, as
            well as our ___sqM IT Kochi design.
          </p>
          <div className="blogheading">ALL ABOUT THE MATERIAL</div>
          <div className="blogsubhead">What is HPL?</div>
          <p className="blogpara">
            HPL laminate panels are high-pressure laminates. This means that the
            individual layers of the panels are pressed together at high
            temperatures and high pressure in a complex manufacturing process.
            The individual layers of the HPL panels consist of resin-impregnated
            paper. Layers of these are compressed together to create this robust
            material.
          </p>
          <div className="blogsubhead">HPL used in KlimArt’s projects</div>
          <div className="imagecenter">
            <img src={wooden1} alt="" />
          </div>
          <div className="blogcaptions">
            Narayan Raju’s residence, Bengaluru
          </div>
          <div className="imagecenter">
            <img src={wooden2} alt="" />
          </div>
          <div className="blogcaptions">Income Tax office, Kochi</div>
          <div className="blogsubhead">Other uses of HPL</div>
          <div className="imagecenter">
            <img src={wooden3} alt="" />
          </div>
          <div className="blogcaptions">Semi-permanent structures</div>
          <div className="imagecenter">
            <img src={wooden4} alt="" />
          </div>
          <div className="blogcaptions">Facade paneling</div>
          <div className="imagecenter">
            <img src={wooden5} alt="" />
          </div>
          <div className="blogcaptions">Kitchen surfaces</div>
          <div className="blogsubhead">How is it made?</div>

          <div className="imagecenter">
            <img src={wooden6} alt="" />
            <p className="blogpara">
              The product is made up of six to eight layers of resin-impregnated
              kraft paper, decorative paper (with a pattern, colour or
              woodgrain) and a clear overlay. These layers are manufactured
              under 1000kg per-square-meter of pressure, under 140°C+
              temperatures.
            </p>
          </div>
          <div className="imagecenter">
            <img src={wooden7} alt="" />
          </div>
          <div className="blogsubhead">Why HPL?</div>
          <p className="blogpara">
            Fundermax’s HPL has been used in two key projects by KlimArt.
            Kochi’s Ayakar Bhawan (Income Tax Dept.) and Anuradha and Narayan
            Raju’s Villa in Bangalore, both projects of different types and
            scales. In both these projects this material was used on the facade
            of the structure.
          </p>
          <div className="imagecenter">
            <img src={wooden8} alt="" />
            <p className="blogpara" id="wooden8">
              <strong>Ventilated Facade</strong> <br /> <br /> The aesthetic
              appeal, weather resistance, and high acoustic and thermal
              isolation are the reasons it was used in these projects. The
              facades generally have interior and exterior layers of cladding
              separated by an air cavity. The external layer of cladding works
              as protection gear against rain and wind and the air cavity
              maintains heat isolation and prevents moisture buildup.
            </p>
          </div>
          <p className="blogpara">
            <strong>Cost, maintenance and installation</strong> <br /> <br />
            Being resistant to abrasion, impact, scratches and extreme
            temperature fluctuations, this saves the clients a lot of time and
            money, HPL requires close to no maintenance cost for a long time. It
            is lightweight, easy to install, and can be applied to curved
            surfaces like Narayan Raju’s wave-like facade.
          </p>
          <p className="blogpara">
            <strong> Sustainability </strong> <br /> <br />
            This material is 100% recyclable, made from rapidly renewable raw
            materials.making it an essential part of Klimart’s material library.
            <br /> <br />
            HPL by Fundermax is also EPD, HPD, FSC, PEFC, and Greenguard
            Certified.
          </p>
          <div className="imagecenter">
            <img src={wooden9} alt="" />
          </div>

          <div className="blogheading">MATERIAL USAGE</div>
          <div className="blogsubhead">Ayakar Bhawan, Kochi</div>
          <p className="blogpara">
            IT Kochi is a nine floor building, armored in Tyrol Pine HPL. This
            2017 project boasts of large vertical grain panels of Fundermax’s
            HPL that stretch across the facade, giving it the appearance of a
            grand, modern high rise, complimenting the traditional wooden
            pillars and carved cornices. <br /> <br /> In a city like Kochi
            where heat, rainfall and humidity are high, a robust HPL ventilated
            facade helps in interior climate control.
          </p>
          <div className="imagecenter">
            <img src={wooden10} alt="" />
          </div>
          <p className="blogcaptions">HPL clad facade for IT Kochi</p>
          <div className="imagecenter">
            <img src={wooden11} alt="" />
          </div>
          <p className="blogcaptions">Ayakar Bhawan (IT Kochi)</p>
          <div className="blogheading">Narayan Raju’s Residence</div>
          <p className="blogpara">
            Narayan Raju’s Villa is a two story house with a wave-shaped facade,
            clad in Tyrol Pine HPL by Fundermax. This 2015 villa is located in
            Bengaluru. Anyone who has spent a year in the city can effortlessly
            verify that the villa experiences rains across the year. <br />{" "}
            <br /> HPL is the perfect material for the building’s skin, because
            not only is it easy to apply on curved surfaces but it also
            minimizes water absorption in the structure, leaving it maintenance
            free- a great solution for any family.
          </p>
          <div className="imagecenter">
            <img src={wooden12} alt="" />
          </div>
          <p className="blogcaptions">HPL Gate for Narayan Raju’s residence</p>
          <div className="imagecenter">
            <img src={wooden13} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wooden14} alt="" />
          </div>
          <p className="blogcaptions">
            HPL clad curved facade at Narayan Raju’s residence
          </p>

          <div className="blogheading">FUNDERMAX LAMINATES</div>
          <p className="blogpara">
            Fundermax is an Austrian company specializing in wood based
            High-quality wood-based materials and compact laminates in a wide
            range of decors. <br /> <br /> KlimArt prides itself on helping
            their clients get material of the highest quality, which is project
            budget-friendly, durable and overall the best option for the design.{" "}
            <br /> <br /> For Income Tax Building, Kochi and Narayan Raju’s
            residence, Fundermax HPL’s shade Tyrol Pine was used. <br /> <br />{" "}
            For more information on Fundermax HPL, shades and sizes, visit-
            www.fundermax.com/en
          </p>

          <div className="blogfooter">
            <img src={line} alt="" className="blogendline" />
            <div className="author">
              <div className="authorname">Saoirse Tope</div>
              <div className="publishdate">23 SEPTEMBER 2022</div>
            </div>
            <div className="publishdate" id="footertags">
              TAGS:
            </div>
            <div className="blogtags">
              <div id="materials">Materials & Techniques</div>
              <div id="architecture">Report</div>
              <div id="schooldesign">Technology</div>
            </div>
            <div className="blogsources">
              {/*
              <div className="blogsourceheader">Sources</div>
              <div className="blogsourceli">
                <a
                  href="https://indianexpress.com/article/education/over-a-dozen-states-have-dropout-rate-at-secondary-level-higher-than-national-average-8173362/lite/"
                  target="_blank"
                >
                  Bridgland V, et al. (2021). Why the COVID-19 pandemic is a
                  traumatic stressor.
                </a>
              </div>
              <div className="blogsourceli">
                Fisher J. (2017). Trauma-informed stabilisation treatment: A new
                approach to treating unsafe behaviour.
              </div>
              <div className="blogsourceli">
                Nelson CA, et al. (2020). Adversity in childhood is linked to
                mental and physical health throughout life.
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <section className="newsletter">
      <Newsletter/>
    </section> */}
    </>
  );
}

export default Wooden;
