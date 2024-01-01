import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import smartlight1 from "../assets/smartlight1.png";
import smartlight2 from "../assets/smartlight2.png";
import smartlight3 from "../assets/smartlight3.png";
import smartlight4 from "../assets/smartlight4.png";
import smartlight5 from "../assets/smartlight5.png";
import smartlight6 from "../assets/smartlight6.png";
import smartlight7 from "../assets/smartlight7.png";
import smartlight8 from "../assets/smartlight8.png";
import smartlight9 from "../assets/smartlight9.png";
import smartlight10 from "../assets/smartlight10.png";
import smartlight11 from "../assets/smartlight11.png";
import smartlight12 from "../assets/smartlight12.png";
import smartlight13 from "../assets/smartlight13.png";
import Newsletter from "./Newsletter";

function Mattersmartlight() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="smartlighthero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">The Comfort of Smart Lighting</div>
          <div className="blogsubhead">
            Cove lighting- creating comfortable interiors
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
            You'll feel at peace the moment you enter a space that is drenched
            in warm, inviting light. If you enter the same room, which is
            pulsing with strong fluorescents, you might start to grind your
            teeth. <br /> <br /> Why? <br /> <br /> Both the visual and
            non-visual parts of lighting schemes may benefit most from
            luminaires that use both a direct and indirect lighting component.
            With modifications in the direct/indirect light ratio and the light
            distribution across the ceiling, this type of luminaire still has a
            wide range of potential applications, each with advantages and
            disadvantages of their own. <br /> <br /> Indirect illumination's
            capacity to produce a soothing light that reduces eye strain can be
            useful in indoor settings that don't have or don't have any natural
            light. A flexible environment where the furniture or room layout is
            subject to change is best suited for indirect lighting.
          </p>
          <div className="bloghead">ALL ABOUT THE TECHNIQUE</div>
          <div className="blogsubhead">What are cove lights?</div>
          <p className="blogpara">
            Cove lighting is a form of indirect lighting built into ledges,
            recesses, or valances in a ceiling or high on the walls of a room.
            It directs light up towards the ceiling and down adjacent walls.{" "}
            <br /> The individual layers of the HPL panels consist of
            resin-impregnated paper. Layers of these are compressed together to
            create this robust material.
          </p>
          <div className="blogsubhead">
            Cove lighting used in KlimArt’s projects
          </div>
          <div className="imagecenter">
            <img src={smartlight1} alt="" />
          </div>
          <div className="blogcaptions">HPCL Office, Lucknow</div>
          <div className="imagecenter">
            <img src={smartlight2} alt="" />
          </div>
          <div className="blogcaptions">KlimArt office, Bengaluru</div>
          <div className="imagecenter">
            <img src={smartlight3} alt="" />
          </div>
          <div className="blogcaptions">
            Narayan Raju’s residence, Bengaluru
          </div>
          <div className="blogsubhead">Other Projects with cove lighting</div>
          <div className="imagecenter">
            <img src={smartlight4} alt="" />
          </div>
          <div className="blogcaptions">Guangzhou Opera House, China</div>
          <div className="imagecenter">
            <img src={smartlight5} alt="" />
          </div>
          <div className="blogcaptions">Heydar Aliyev centre, Baku</div>
          <div className="imagecenter">
            <img src={smartlight6} alt="" />
          </div>
          <div className="blogcaptions">Monasterio del Escorial, Spain</div>
          <div className="blogsubhead">How is cove lighting produced?</div>
          <p className="blogpara">
            A cove luminaire is a line of light made via an LED strip that is
            hidden from view, within a cove in the wall or ceiling. The cove
            then illuminates an adjacent surface from where the light is
            reflected into the room to be illuminated. This light can be
            produced in many ways to create different levels of lumination.
          </p>
          <div className="imagecenter">
            <img src={smartlight7} alt="" />
          </div>
          <div className="blogsubhead">Why cove lighting?</div>
          <p className="blogpara">
            Cove lighting provides a pleasant ambience and allows to frame the
            room with light. Indirect lighting enhances visibility, reduces eye
            strain, and boost productivity by reducing glare. <br /> <br />
          </p>
          <p className="blogpara">
            <strong>Creating a mood</strong> <br /> <br />
            All types of interiors benefit greatly from indirect lighting when
            creating a mood. the use of uplighting or downlighting, sleek modern
            or organic designs, or traditional country styles It improves the
            architecture, that much is certain.
            <br /> <br />
            <br /> <br /> <strong>Visual openness</strong>
            <br /> <br />
            In a stylish way, indirect lighting illuminates floors, walls, and
            even ceilings. The reflected light gives the space a sense of more
            openness. You may draw attention to the building and emphasise the
            lighting features by employing colour. When the lighting is painted
            the same colour as the walls, the space is fully integrated.
            <br /> <br />
            <br /> <br /> <strong>Visual comfort</strong>
            <br /> <br />
            Indirect lighting produces a totally unshadowed strip of light when
            employed as linear lighting. This gives the impression of more space
            and ensures diffuse, even illumination throughout. In Indirect
            lighting, the light source is not visible, which means you never
            feel blinded
          </p>
          <div className="imagecenter">
            <img src={smartlight8} alt="" />
          </div>
          <div className="blogheading">USAGE</div>
          <div className="blogsubhead">KlimArt Office, Bengaluru</div>
          <p className="blogpara">
            KPL office is 3 storey building located in bengaluru. The principal
            architects office uses a rich design elements with warm cove
            lighting enhancing the design elements in the space. <br /> <br />{" "}
            The intention was that a person visiting the office could freely
            discuss all the things about his/her project and interact and it is
            space where important discussions, decisions are taken place so the
            place should have the ambience to it.
          </p>
          <div className="imagecenter">
            <img src={smartlight9} alt="" />
          </div>
          <div className="blogsubhead">Narayan Raju’s Residence</div>
          <p className="blogpara">
            Narayan Raju’s Villa is a two story house, this 2015 villa is
            located in Bengaluru. The home theatre room of the villa with fluid
            ceiling design incorporated with cove lighting creates a even,
            pleasant and ticked the vibe check for movie night on friday.
          </p>
          <div className="imagecenter">
            <img src={smartlight10} alt="" />
          </div>
          <div className="blogheading">POSSIBLE PREDICAMENTS</div>
          <p className="blogpara">Reflection on tiles</p>
          <p className="blogpara">
            From the recent project of KPL office we encountered a problem with
            the cove lighting is the reflections created by tiles, of light
            stripes, tubes etc. The under cabinet lighting in kitchens, lighting
            below storage units create a mirror image showing the actual light
            strip than diffusing the light.
          </p>
          <div className="imagecenter">
            <img src={smartlight11} alt="" />{" "}
          </div>
          <div className="imagecenter">
            <p className="blogpara">
              From the recent project of KPL office we encountered a problem
              with the cove lighting is the reflections created by tiles, of
              light stripes, tubes etc. The under cabinet lighting in kitchens,
              lighting below storage units create a mirror image showing the
              actual light strip than diffusing the light. This is most common
              in residences, offices to which the solution can be: In design
              stage, selection of non reflective tiles at the area of cove
              lighting Making a cove under the cabinets as made in the ceilings,
              to eliminate reflections, have more diffusion and helps to have
              clean look with no wires under.
            </p>
            <img src={smartlight12} alt="" className="imageright" />
          </div>
          <div className="imagecenter">
            <img src={smartlight13} alt="" />
          </div>
          <p className="blogpara">
            If the problem is observed after completion, a translucent fiber
            board can be placed 6-10 cm away from the strip to eliminate the
            reflections and the translucent board gives a even diffusion of the
            light.
          </p>
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
            <div id="materials">Materials & Techniques</div>
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

export default Mattersmartlight;
