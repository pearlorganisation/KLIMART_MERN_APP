import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import solid1 from "../assets/solid1.png";
import solid2 from "../assets/solid2.png";
import solid3 from "../assets/solid3.png";
import solid4 from "../assets/solid4.png";
import solid5 from "../assets/solid5.png";
import solid6 from "../assets/solid6.png";
import solid7 from "../assets/solid7.png";
import solid8 from "../assets/solid8.png";
import solid9 from "../assets/solid9.png";
import solid10 from "../assets/solid10.png";
import solid11 from "../assets/solid11.png";
import solid12 from "../assets/solid12.png";
import Newsletter from "./Newsletter";

function Mattersolid() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="solidhero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">
            How to make a solid first impression
          </div>
          <div className="blogsubhead">
            Corian solid surface- Realistic stone finishes
          </div>
          <div className="blogheadbottom">
            <div className="author">
              <div className="authorname">Raksha Alangi</div>
              <div className="publishdate">23 OCTOBER 2022</div>
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
            As the saying "You never get a second chance to make a first
            impression" goes, first impressions are valuable. It's likely that
            if you're remodelling a room, you're looking to impress someone- a
            client, your friends, that one person (no judgements here!). <br />{" "}
            A powerful desk or table is a strong visual element in any office
            room. Laminate, tile, quartz, or natural stone are all common and
            engaging options for countertops, but solid surface countertops are
            an excellent alternative to be considered. Solid surface offers a
            unique look, combining creativity with the natural elements. <br />{" "}
            <br /> Solid surface countertops are one of the most popular options
            on the market and have surpassed natural stone slabs such as granite
            and marble. Designed by Dupont more than 50 years ago, Corian solid
            surface is made from a homogeneous mixture, either polyester or
            acrylic-based , forming a non-porous surface. <br /> Although Corian
            refers only to DuPont brand solid surface countertops, many use the
            term to refer to all solid surface countertops.
          </p>
          <div className="blogheading">ALL ABOUT THE MATERIAL</div>
          <div className="bloghead">What is Solid Surface?</div>
          <p className="blogpara">
            Corian is a "solid surface" material which means the artificial
            material has a solid composition from the inside out, which is often
            used for countertops. Solid surface countertops are made up of three
            elements: mineral particles, a bonding resin, and added pigments.
            The most commonly used natural mineral filler is alumina trihydrate
            (ATH) and the resins are made up of either polyester, acrylic, or a
            combination of the two.
          </p>
          <div className="bloghead">
            Corian Solid surface used in KlimArt’s office
          </div>
          <div className="imagecenter">
            <img src={solid1} alt="" />
          </div>
          <div className="imagecenter">
            <img src={solid2} alt="" />
          </div>
          <p className="imglegend">KlimArt office, Bengaluru</p>
          <div className="bloghead">Other uses of solid surfaces</div>
          <div className="imagecenter">
            <img src={solid3} alt="" />
          </div>
          <p className="blogcaptions">Kitchen countertops</p>
          <div className="imagecenter">
            <img src={solid12} alt="" />
          </div>
          <p className="blogcaptions">Basins</p>
          <div className="imagecenter">
            <img src={solid4} alt="" />
          </div>
          <p className="blogcaptions">Healthcare and technology</p>
          <div className="bloghead">
            How is it made?
            <br />
          </div>
          <p className="blogpara">
            Corian solid surface is made from a mixture of 1/3rd acrylic polymer
            and 2/3rd natural minerals. The main ingredient is Alumina
            Trihydrate. This is derived from Bauxite Ore which is one of the
            main components in the manufacture of Aluminium. These minerals are
            pulverised and then, through a highly specialised process, are
            reconstituted and strengthened by adding acrylic polymer resin,
            which is then then cut in sheets or shapes and sanded and polished
            further
          </p>

          <div className="imagecenter">
            <img src={solid5} alt="" />
          </div>
          <div className="bloghead">Why corian solid surface?</div>
          <p className="blogpara">
            Corian surface worktops were a good fit for the newly refurbished
            office at Klimart since it required a desk that would be durable,
            smooth and seamless and fit in well with the colour scheme of the
            space.
            <br />
            <br />
            <strong>Versatile options</strong>
            <br />
            <br />
            Corian worktops are incredibly versatile with endless design
            possibilities, allowing you to create anything as it offers an
            almost infinite combination of shapes, colours, patterns and
            textures
            <br />
            <br />
          </p>
          <div className="imagecenter">
            <img src={solid6} alt="" className="imageright" />
            <p className="blogpara">
              <strong>Durability</strong>
              <br />
              <br />
              With a non-porous surface it prevents dirt and stains from
              penetrating the material and in turn provide high levels of
              hygiene. These countertops will last many decades if they are
              properly maintained. They can withstand heat upto 100° C.
            </p>
          </div>
          <p className="blogpara">
            <strong>Sustainability</strong>
            <br />
            <br />
            With their capacity for reuse, extended lifespan, utilisation of
            recycled components, and minimal VOC (Volatile Organic Compounds)
            emissions, Corian countertops are an ideal sustainable alternative.
            They minimise waste and material utilisation because of their
            durability and long life cycle, making it a perfect addition to the
            klimart material library!
          </p>
          <div className="imagecenter">
            <img src={solid7} alt="" />
          </div>
          <div className="blogheading">
            <br />
            <br />
            USAGE
          </div>
          <div className="blogsubhead">
            KlimArt Office, <br /> Bengaluru
          </div>
          <p className="blogpara">
            The office cabin at Klimart was recently newly refurbished where the
            vision for designing the cabin was a perfect mix of comfort and
            style. A desk is an element that makes the first impression on
            clients and where new ideas are brainstormed and shaped, therefore
            it was important choosing a desk designed with the same perspective.
          </p>
          <div className="imagecenter">
            <img src={solid8} alt="" />
          </div>

          <div className="imagecenter">
            <img src={solid9} alt="" />
          </div>
          <div className="imagecenter">
            <img src={solid10} alt="" />
          </div>
          <div className="imagecenter">
            <img src={solid11} alt="" className="imageright" />
            <p className="blogpara">
              Corian solid surface was a perfect fit for the desktop as it was
              subtle yet classy and blended in well with the colour scheme of
              the cabin. The desk is white with a seamless finish and subdued
              textural features that revealed intriguing veining. The neutral
              whites of the desk complement the warm tones of the surrounding
              laminate wall panelling. The desk, being built to last and
              sustainable, it embodies the core philosophy of KlimArt.
            </p>
          </div>
        </div>
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
            <div id="materials">Materials & Techniques </div>
            <div id="architecture">Report</div>
            <div id="schooldesign">Technology</div>
          </div>
          <div className="blogsources"></div>
        </div>
      </div>
    </div>
    {/* <section className="newsletter">
      <Newsletter/>
    </section> */}
    </>
  );
}

export default Mattersolid;
