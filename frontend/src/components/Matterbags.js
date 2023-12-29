import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import bags1 from "../assets/bags1.png";
import bags2 from "../assets/bags2.png";
import bags3 from "../assets/bags3.png";
import bags4 from "../assets/bags4.png";
import bags5 from "../assets/bags5.png";
import bags6 from "../assets/bags6.png";
import bags7 from "../assets/bags7.png";
import Newsletter from "./Newsletter";

function Matterbags() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="bagshero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">
            Site visit: Pack your bags, open your minds
          </div>
          <div className="blogsubhead">
            Here are 4 things you can take away from an architectural site visit
          </div>
          <div className="blogheadbottom">
            <div className="author">
              <div className="authorname">Saoirse Tope</div>
              <div className="publishdate">23 SEPTEMBER 2022</div>
            </div>
            <img src={line} alt="lineseperator" className="bloglinetop" />
            {/* line img here */}
            <div className="likebutton" onClick={() => setIsLiked(!isLiked)}>
              <TbHeart className={isLiked ? "liked" : "notliked"} />
            </div>
          </div>
        </div>
        <div className="blogcontent">
          <p className="blogpara">
            There are very few things that break the never-ending monotony of
            studio work. Large scale projects seamlessly blend into one another
            and the weight of deadlines and submissions fades out the starting
            line. When did the project begin? What was our purpose? What are we
            actually working towards? <br /> <br /> Kavya found that small
            breaks like a chat across the desk, evening tea and an occasional
            doodle would help take the numbness away from the AutoCAD interface-
            until the day of the site visit. <br /> <br /> Where it did begin,
            was at Sehore and Alirajpur districts in Madhya Pradesh. With
            literacy rates ranging from an impressive 81% to an unfortunate 36%,
            the drop-out rates higher than the national average. Schools in
            dilapidated conditions, peeling off the face of the villages,
            crumbling down like the systems that failed the residents. <br />{" "}
            <br /> There's our purpose- what we are working towards.
          </p>
          <div className="imagecenter">
            <img src={bags1} alt="" />
          </div>
          <div className="imagecenter">
            <img src={bags2} alt="" />
          </div>
          <div className="blogcaptions">
            Current state of infrastructure of the government schools in Sehore
            district, Madhya Pradesh
          </div>
          <p className="blogpara">
            Our studio team has been dedicatedly working towards designing and
            constructing the EPCO CM Rise schools in Sehore, MP for one year
            now. On 12th December 2022, a few Architects from our studio got the
            chance to do a site visit to Sehore for the same. <br /> Over the
            next few days, they grasped what they were actually working towards.
            Their end goal was something much larger than this project's curtain
            call.
          </p>
          <div className="imagecenter">
            <img src={bags3} alt="" />
          </div>
          <p className="blogpara">
            According to the team, here are a few things you can take away from
            a site visit-
          </p>
          <div className="blogheading">Takeaway 1</div>
          <div className="bloghead">
            AutoCAD will never do justice to what is truly out there
          </div>
          <p className="blogpara">
            As an architect, the knowledge of space and scale is not nearly ever
            enough to believe what you are going to experience when you visit
            the site. <br /> <br /> As their car pulls over near the site
            boundary, Kavya is left in awe at the sheer magnitude of the space.
            Interrupting buildings, houses and temples- small irritants in the
            master plan actually seem real-and huge. Seemingly small level
            differences and narrow drains are mountains to climb and rivers to
            cross. <br /> <br /> Every tired AutoCAD command, every bored PDF
            sent makes a difference.
            <strong>You make a difference, every single day</strong>.
          </p>
          <div className="imagecenter">
            <img src={bags4} alt="" />
          </div>
          <p className="blogcaptions">
            A small rectangle on CAD was a huge temple on site, and had to be
            worked around
          </p>
          <div className="blogheading">Takeaway 2</div>
          <div className="bloghead">People and places will surprise you!</div>
          <p className="blogpara">
            When we visit a world so different from our own, we create
            pre-conceived notions about it. The people, the place, the
            surroundings all sprout from stories we are told by newspaper
            articles and Netflix documentaries. <br /> <br /> The common visual
            of poverty stricken villages with crumbling dry land, unemployment,
            lack of education and a general mist of hopelessness is what one
            keeps in mind before visiting a site as such. But even in the most
            unlikely of places, people can surprise you. <br /> <br /> The
            teachers aren't trained, the students have no infrastructure-
            <strong> but they are all motivated and passionate</strong>. <br />{" "}
            <br /> Abhinav draws a crowd of students from the Manuben site as he
            describes his role in the future of their school. These students
            haven't even been inside a science lab. They identify Abhinav's new
            phone's model, manufacturer, and warranty expiration with a glimpse
            of his pocket. <br /> <br />{" "}
            <i>
              "I bet you, given the resources, these kids can be smarter than
              all of us", says Abhinav
            </i>
            .
          </p>
          <div className="blogheading">
            “I can bet you, given the resources, these kids can be smarter than
            all of us”
          </div>
          <div className="imagecenter">
            <img src={bags5} alt="" />
          </div>
          <div className="blogheading">Takeaway 3</div>
          <div className="bloghead">
            Talk to the people you work with, for and around
          </div>
          <p className="blogpara">
            Conversations lead to memories that last a lifetime. Sometimes the
            smallest, simplest statements can reveal a world of information,
            without having to say much. <br /> <br /> They can lead to big
            changes- like altering the design. They can also lead to bigger
            changes, like altering your perspective. <br /> <br /> "
            <i>
              We talked to some of the students. They were shy but excited",
              recalls Kavya. "We asked them what they wanted to be put in the
              schools like, a playground, labs, canteens. All they said was,
              'just make us a school'"
            </i>
          </p>
          <div className="bloghead">
            "All they said was, 'just make us a school'"
          </div>
          <div className="imagecenter">
            <img src={bags6} alt="" />
          </div>
          <div className="blogheading">Takeaway 4</div>
          <div className="bloghead">
            Your design is larger than your site, always
          </div>
          <p className="blogpara">
            As she notices the eerie corridors leading to the girl's washroom,
            the abandoned building burnt to a crisp and a mysterious scent of
            smoke from somewhere, Manasa imagines a dystopian world.
            <br />
            <br /> She visualizes the beautiful, functional school buildings
            that will soon replace these. Something students, parents, teachers
            and the entire community will be proud to be a part of. <br />
            <br /> It's a few schools for us, but it's the bright future of
            countless potential students to come.
            <br /> <br /> "
            <i>
              "Architecture isn't just about pretty facades. It has the power to
              transform lives. This is what we've been working towards for the
              past year, but this is what they have needed since forever", says
              Manasa.
            </i>
          </p>
          <div className="bloghead">
            “Architecture isn’t just about pretty facades, it has the power to
            transform lives.”
          </div>
          <div className="imagecenter">
            <img src={bags7} alt="" />
          </div>
          <p className="blogpara">
            Students gather in awe, around the large print out of the
            masterplan, trying to guess where their classes would be held.
            <br /> <br /> They don't understand the design, so all they see is a
            dream finally coming true, after generations of empty promises.
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
            <div id="peopleandevents">People and Events </div>
            <div id="architecture">Report</div>
            <div id="schooldesign">Building</div>
            <div id="schooldesign">Institutional</div>
          </div>
          <div className="blogsources">
            <div className="blogsourceheader">Sources</div>
            <div className="blogsourceli">
              <a
                href="https://indianexpress.com/article/education/over-a-dozen-states-have-dropout-rate-at-secondary-level-higher-than-national-average-8173362/lite/"
                target="_blank"
              >
                “Madhya Pradesh's Alirajpur District Has Lowest Literacy Rate.”
                Twocircles.net. IANS.
              </a>
            </div>
            <div className="blogsourceli">
              Census of India | Office of the Registrar General & Census
              Commissioner, India . India, 2018. Web Archive.
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

export default Matterbags;
