import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import wayfind1 from "../assets/wayfind1.png";
import wayfind2 from "../assets/wayfind2.png";
import wayfind3 from "../assets/wayfind3.png";
import wayfind4 from "../assets/wayfind4.png";
import wayfind5 from "../assets/wayfind5.png";
import wayfind6 from "../assets/wayfind6.png";
import wayfind7 from "../assets/wayfind7.png";
import wayfind8 from "../assets/wayfind8.png";
import wayfind9 from "../assets/wayfind9.png";
import wayfind10 from "../assets/wayfind10.png";
import wayfind11 from "../assets/wayfind11.png";
import wayfind12 from "../assets/wayfind12.png";
import wayfind13 from "../assets/wayfind13.png";
import wayfind14 from "../assets/wayfind14.png";
import wayfind15 from "../assets/wayfind15.png";
import Newsletter from "./Newsletter";

function Matterwayfind() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="wayfindhero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">Do you really design for your user?</div>
          <div className="blogsubhead">
            Here are 3 key steps for designing a successful wayfinding system
            for a school
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
            I remember crying on my first day of school, as a scared four year
            old clingy little ball of snot. My overprotective parents tried very
            hard to make sure that my directionally challenged 2’ nothing self
            doesn’t get lost on my way to class. Unfortunately after two weeks
            of following me till the classroom door, my teacher had to ask them
            to let me be independent. Reluctantly they agreed. It took me some
            time to understand their reluctance, but I did.
          </p>
          <div className="bloghead">
            All that a parent wants for their child is safety, wholesome
            enjoyment, and a good learning environment.
          </div>
          <p className="blogpara">
            The one common factor, and key to success in any design- be it
            products, systems, websites or spaces, is considering the{" "}
            <strong> user’s experience</strong>. Design often follows similar
            principles as democracy- it is by the user, for the user and of the
            user. It is the most logical to consider, and the toughest to
            execute, and the most vital for success-{" "}
            <strong> know your user</strong>.
          </p>
          <div className="imagecenter">
            <img src={wayfind1} alt="" />
          </div>
          <p className="blogpara">
            Projects that test and challenge our abilities as responsible
            architects and designers are the ones that cater to the most extreme
            users. The EPCO CM Rise schools, being built in small districts of
            Madhya Pradesh, are an initiative by the MP Government to improve
            education infrastructure to promote enrollment, continuation and
            quality of education for children from economically backward
            regions. Being able to provide a healthy and exciting learning
            environment for these users is a challenge and a privilege.
          </p>
          <div className="imagecenter">
            <img src={wayfind2} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wayfind3} alt="" />
          </div>
          <p className="blogcaptions">
            Current state of infrastructure of the government schools in Sehore
            district, Madhya Pradesh
          </p>
          <p className="blogpara">
            Part of the process of designing a school, apart from just the built
            structure, is creating an{" "}
            <strong> immersive experience for students </strong> while enhancing
            functionality and aesthetic appeal. One way to do this is by
            creating a
            <strong> clear and effective wayfinding and signage system.</strong>
          </p>
          <div className="imagecenter">
            <img src={wayfind4} alt="" />
          </div>
          <p className="blogpara">
            <strong>
              Three simple steps to consider for this process are:
            </strong>
          </p>
          <div className="blogheading">STEP 1: </div>
          <div className="blogsubhead">Understand your user</div>
          <p className="blogpara">
            Designing good interiors and a proper wayfinding system for the KG
            block of a school is not as easy a process as one would think. When
            we considered our user, we automatically narrowed down how we needed
            to design.
          </p>
          <div className="imagecenter">
            <img src={wayfind5} alt="" />
          </div>
          <div className="blogpara">
            My initial thought process for this was to design something
            <strong>
              {" "}
              grounded, down to earth, personalized and relatable
            </strong>
            &nbsp;for the students. But after discussing with my colleagues, I
            realized that user centered design can mean different things.
            Sometimes it means designing according to the cultural and
            historical context, but sometimes it means
            <strong>
              &nbsp;understanding your user’s needs, and designing for those.
            </strong>
            <br />
            <br /> Keeping children enrolled in schools in a state where
            drop-out rates are 23.8%, higher than the national average of 14.6%
            means that children and parents need to feel a sense of pride in
            being educated in a government school. For this purpose, using more
            modern, simplistic, clean design language was considered instead.
            <br /> <br />
            This could instill a sense of belonging that might linger into their
            bright futures and make its way into generations of educated Indians
            to come.
          </div>
          <p className="blogcaptions">
            Some of the schools currently have a wayfinding system, as well as
            signages that are communicative, but not elegant
          </p>
          <div className="imagecenter">
            <img src={wayfind6} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wayfind7} alt="" />
          </div>
          <p className="blogcaptions">
            Current signages at some of the schools
          </p>
          <div className="blogheading">STEP 2: </div>
          <div className="blogsubhead">Help them not get lost</div>

          <div className="blogpara">
            This includes a very simple combination of a design element called
            Wayfinding. Helping your user navigate through a space can be done
            using active wayfinding. <br /> <br /> Wayfinding is a design system
            that uses spatial cues to help the user adjust, and orient
            themselves in the space. This can be done in multiple ways including
            creating signages, boards, using semantics, colours, circulation,
            etc. <br /> <br />
            <strong>
              There are two types of wayfinding systems- Active, and passive
            </strong>
            . Active wayfinding includes direct forms of navigation like maps,
            signages, directions, labels, etc.
          </div>
          <div className="imagecenter">
            <img src={wayfind8} alt="" />
          </div>
          <p className="blogpara">
            <strong> Choosing colours </strong> <br /> <br />
            The colours used for this were considered with the rest of the
            school space. Bright bursts of colours compliment the plain, clean
            look of the white walls to create a sophisticated, yet attractive
            effect. <br /> <br /> Using multiple colours was important to
            differentiate one zone from another, like classrooms from
            laboratories from staff rooms from washrooms. It was also important
            to not tire out one's eyes with repetition of a shade. We chose the
            colour palette to be pastel offshoots of primary and secondary
            colours, distinguishable from each other, yet in the same family.
            Visible from afar, yet easy on the eyes. <br /> <br /> When
            designing signages, consider- <br /> <br />
            <strong>Inclusivity</strong>- Is your design inclusive to users with
            different abilities? People with physical and visual impairments
            such as colour blindness, blindness, myopia, etc should be able to
            navigate through a public space just as easily as the rest. <br />
            <br /> <strong>Negative space</strong>- Leaving breathing space is
            very important when using colours, as in most public spaces, the
            users experience the space for long periods of time, leaving them
            with a very strong positive or negative impression of it.
            <br />
            <br />
            <strong>Language sensitivity</strong>- It is vital to consider the
            user’s literacy level and language of comfort, in any case, making
            signages legible, in multiple languages, and if not that, then with
            explanatory icons is of utmost importance
          </p>
          <div className="imagecenter">
            <img src={wayfind9} alt="" />
          </div>
          <p className="blogpara">
            <strong>Simple Symbols and Iconography</strong>
            <br />
            <br />
            Let’s face it, everyone likes a clean and minimal look for spaces.
            For most of us, being used to schools, hotels and malls, we
            intuitively understand the zoning of a space. For those who aren’t,
            labeling spaces and zones is of utmost importance.
          </p>
          <div className="imagecenter">
            <img src={wayfind10} alt="" />
          </div>
          <p className="blogpara">
            Let’s face it, everyone likes a clean and minimal look for spaces.
            For most of us, being used to schools, hotels and malls, we
            intuitively understand the zoning of a space. For those who aren’t,
            labeling spaces and zones is of utmost importance.
            <br />
            <br />
            <br />
            <br />
          </p>
          <p className="blogpara">
            <strong>Drumroll please!</strong>
          </p>
          <div className="imagecenter">
            <img src={wayfind11} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wayfind12} alt="" />
          </div>
          <div className="blogheading"> STEP 3: </div>
          <div className="blogsubhead">
            <i>Really</i> make sure they don't get lost
          </div>
          <p className="blogpara">
            This was done through passive wayfinding elements. Passive
            wayfinding is a more subtle approach that uses sensory cues like
            colours, scents, circulation, memory, etc to help make sure that the
            user understands the space well. <br /> <br /> By coloring the
            underside of ramps and railings in different shades, we created a
            visual hierarchy that guides students and visitors through the
            building subconsciously through zones. <br /> <br /> Additionally,
            using color as a wayfinding tool can be especially helpful for young
            children, who may not yet be able to read words or symbols. Overall,
            incorporating color is a simple, yet effective way to create a
            functional and visually appealing wayfinding system for a school.
          </p>
          <div className="imagecenter">
            <img src={wayfind13} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wayfind14} alt="" />
          </div>
          <div className="imagecenter">
            <img src={wayfind15} alt="" />
          </div>
          <p className="blogpara">
            Anti-clockwise from top: <br /> <br />
            <ol>
              <li>
                Painting just the underside of the ramp and the railings with
                the same colour helps in segregating the KG/ Primary/ Middle and
                high school blocks visually
              </li>
              <li>
                Yellow railings and signages on white columns and walls and grey
                flooring zone out the KG block of the schools in a clean,
                simplistic manner
              </li>
              <li>
                Simple grey signages explaining the floor-wise navigation are
                installed in all blocks, with respective colour coded railings
              </li>
              <li>
                1.1x1.4m Classroom and laboratory signages set apart the high
                school block
              </li>
            </ol>
          </p>
          <div className="blogheading">
            It is important to step in the shoes of your user to make a
            successful user centric design. <br /> <br /> Understanding their
            needs creates a space for positive impact, without fail.
          </div>
          <p className="blogpara">
            Overall, designing a wayfinding and signage system for a schools in
            backward areas in Madhya Pradesh was a challenging but rewarding
            experience.
            <br /> By carefully considering the needs and preferences of the
            school community, I was able to create a system that would
            effectively guide and inform, and invite students, teachers, and
            visitors for years to come.
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
            <div id="design">Design Processes </div>
            <div id="architecture">Journal </div>
            <div id="architecture">Institutional</div>
            <div id="schooldesign">Interior</div>
          </div>
          <div className="blogsources">
            <div className="blogsourceheader">Sources</div>
            <div className="blogsourceli">
              PTI News Agency (2022) Dropout rate at secondary level higher than
              national average in over dozen states: Official Data, The Indian
              Express.
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

export default Matterwayfind;
