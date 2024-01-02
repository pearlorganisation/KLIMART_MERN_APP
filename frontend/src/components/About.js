import React, { useEffect } from "react";
import { useState } from "react";
import "./About.css";
import "../grid.css";
import { Link, useOutletContext } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import heroabout from "../assets/abouthero.svg";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import linewhitevert from "../assets/Line white vert.png";
import roundbuilding from "../assets/roundbuilding.png";
import redarrow from "../assets/arrowbig.png";
import processmain from "../assets/processmain.png";
import processsub1 from "../assets/processsub1.png";
import processsub2 from "../assets/processsub2.png";
import solution from "../assets/thesolution.png";
import bigpic from "../assets/bigpic.png";
import processafter from "../assets/processafter.png";
import valuesheadermob from "../assets/microhero.png";
import value1 from "../assets/value1.png";
import value2 from "../assets/value2.png";
import value3 from "../assets/value3.png";
import aboutquote from "../assets/aboutquote.png";
// import team1 from "../assets/team1.png";
// import team2 from "../assets/team2.png";
// import team3 from "../assets/team3.png";
// import team4 from "../assets/team4.png";
// import team5 from "../assets/team5.png";
// import team6 from "../assets/team6.png";
// import team7 from "../assets/team7.png";
// import team8 from "../assets/team8.png";
// import team9 from "../assets/team9.png";
// import team10 from "../assets/team10.png";
// import team11 from "../assets/team11.png";
// import team12 from "../assets/team12.png";
// import team13 from "../assets/team13.png";
// import team14 from "../assets/team14.png";
// import team15 from "../assets/team15.png";
// import team16 from "../assets/team16.png";
import themeaningbg from "../assets/themeaningbg.png";
import map1 from "../assets/map1.png";
import map2 from "../assets/map2.png";
import Newsletter from "./Newsletter";
import SelectedProjects from "./SelectedProjects";
import GetInTouchModal from "./common/GetInTouchModal";
import Linebreakright from "./Linebreakright";
import BuildProject from "./common/BuildProject";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaQuoteLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKlimart,
  getAboutData,
  getTeam,
  getValueProvidedData,
} from "./features/actions/aboutAction";

const aboutbuttons = [
  {
    title: "The Challenge",
    color: "#FFFFFF",
  },
  {
    title: "Our Mission",
    color: "#000000",
  },
  {
    title: "Our Process",
    color: "#FFFFFF",
  },
  {
    title: "Our People",
    color: "#000000",
  },
];

function About() {
  const [showPopup, setShowPopUp] = useOutletContext();

  const [isHoveringA, setIsHoveringA] = useState(false);
  const [isHoveringR, setIsHoveringR] = useState(false);
  const [isHoveringT, setIsHoveringT] = useState(false);

  const dispatch = useDispatch();
  const { team, isLoading, aboutData, valueProvidedData, KlimartData } =
    useSelector((state) => state.about);
  // const {KlimartData}=  useSelector((state)=>state.about)
  //  console.log(valueProvidedData)
  // console.log(KlimartData)
  // console.log(valueProvidedData)

  // -------------------------------------------------use effect------------------------------------------

  useEffect(() => {
    dispatch(getTeam());
    dispatch(fetchKlimart());
  }, []);

  useEffect(() => {
    dispatch(getAboutData());
    dispatch(getValueProvidedData());
  }, []);

  const handleMouseOverA = () => {
    setIsHoveringA(true);
  };

  const handleMouseOutA = () => {
    setIsHoveringA(false);
  };
  const handleMouseOverR = () => {
    setIsHoveringR(true);
  };

  const handleMouseOutR = () => {
    setIsHoveringR(false);
  };
  const handleMouseOverT = () => {
    setIsHoveringT(true);
  };

  const handleMouseOutT = () => {
    setIsHoveringT(false);
  };

  return (
    <div className="about">
      <div className="heroabout">
        <div className="heronav" id="abtherotext">
          <Link to="/">HOME</Link>
          {">"}ABOUT
        </div>
        <div className="toptext" id="aboutherotop">
          {Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData?.[0]?.header}
          {/* {
            // Array.isArray(Array.isArray(aboutData) && aboutData?.length>0 && aboutData) && Array.isArray(aboutData) && aboutData?.length>0 && aboutData?.length>0 && Array.isArray(aboutData) && aboutData?.length>0 && aboutData?.[0]?.header
          } */}
          <LazyLoadImage src={line} alt="linedecor" />
        </div>
        <div className="hero__textabout">
          <h1>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[0]?.Desc}
            {/* Creating a world where <line>people</line> and{" "}
            <line>environments</line> are in <line>everlasting harmony.</line> */}
          </h1>
        </div>
        <LazyLoadImage
          src={
            Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData[0]?.Image
          }
          alt="heroimage"
          id="heroimg"
        />
      </div>
      {/* <div id="aboutbtns">
        <button className="testbutton">THE CHALLENGE</button>
      </div> */}

      <div id="challenge">
        <LazyLoadImage
          src={
            Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData[1]?.Image
          }
          alt="roundbuilding"
          id="sunnyimg"
        />
        <div className="toptext">
          {Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData[1]?.header}
          <LazyLoadImage src={line} alt="linedecor" />
        </div>
        <div id="challengecontent">
          <p style={{ marginBotton: "40px" }}>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[1]?.Desc}
            {/* The world needs to bridge the gap <br></br> of sustainable
            infrastructure development<br></br>without compromising comfort,
            growth<br></br> and budget. */}
          </p>
        </div>
        {/* <LazyLoadImage src={roundbuilding} alt="" id="sunnymob" /> */}
        <LazyLoadImage src={redarrow} alt="redarrow" id="redarrow" />
        <div>
          <LazyLoadImage src={solution} alt="thesolution" id="solution" />
        </div>
        <div className="solutionmob">
          <div className="toptext">
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[2]?.header}
            <LazyLoadImage src={linewhite} alt="linedecor" />
          </div>
          <div className="solutiontextmob">
            <p>
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[2]?.Desc}
            </p>
          </div>
        </div>
      </div>
      <div id="afterchallenge"></div>

      <div id="mission">
        <div id="missioncontent">
          <div id="missionmotto">
            <h3>
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[3]?.header}
            </h3>
          </div>
          <LazyLoadImage src={linewhitevert} alt="linespace" id="vertwhite" />
          <LazyLoadImage src={linewhite} alt="" id="linemobwhite" />

          <div id="missiontext">
            <div className="toptext">
              The klimart mission
              <LazyLoadImage src={linewhite} alt="linedecor" />
            </div>
            <p>
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[3]?.Desc}
            </p>
          </div>
        </div>
      </div>
      <div id="process">
        <div className="toptext">
          Our Process
          <LazyLoadImage src={line} alt="" />
        </div>
        <div id="processcontent" data-aos="fade-up" data-aos-duration="3000">
          <h2>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[4]?.header}{" "}
          </h2>
          <div className="flipped">
            <LazyLoadImage
              src={
                Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[4]?.Image
              }
              alt="processmain"
              id="processmainimg"
            />
            <p>
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[4]?.Desc}
              {/* At klimArt, our dynamic and multidisciplinary team collaborates on
              a cutting-edge platform to deliver exceptional architectural
              designs. Our diverse expertise and integrated approach drive
              progress in the industry and bring your vision to life. */}
            </p>
          </div>
          <img src={line} alt="linedecor" className="linetop" />
          <h3 id="processubhead">
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[5]?.header}
          </h3>
          <p>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[5]?.Desc}
            {/* With 20+ years of industry experience in the realm of architecture,
            design, construction and sustainability, we deliver unparalleled
            high quality results. With experience in project management,
            handling and execution, we also strive to create an efficient and
            comfortable experience for the client. */}
          </p>
        </div>
        <div id="processsubcontent1">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={
                Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[6]?.Image
              }
              id="processsub1"
              alt="process"
            />
          </div>
          <div
            id="processsubcon1"
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <img src={line} alt="linedecor" className="linetop" />
            <h3 id="processubhead1">
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[6]?.header}
            </h3>
            <p>
              {Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[6]?.Desc}
              {/* We believe that the beauty is in the details, and no matter how
              small or big the project is, we make sure no detail escapes our
              attention. We strive for perfection for every scale of design. */}
            </p>
          </div>
        </div>
        <div id="processsubcontent2">
          <div id="processsubcon2">
            <div>
              <img src={processsub2} id="processsub2mob" />
            </div>
            <div
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <img src={line} alt="linedecor" className="linetop" />
              <h3 id="processubhead2">
                {Array.isArray(aboutData) &&
                  aboutData?.length > 0 &&
                  aboutData[7]?.header}
              </h3>
              <p>
                {Array.isArray(aboutData) &&
                  aboutData?.length > 0 &&
                  aboutData[7]?.Desc}
                {/* We have a team of multidisciplinary architects, designers and
                industry professionals collaborating at all levels to create
                truly outstanding spaces. */}
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={
                Array.isArray(aboutData) &&
                aboutData?.length > 0 &&
                aboutData[7]?.Image
              }
              id="processsub2"
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="3000">
        <LazyLoadImage
          src={
            Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData[8]?.Image
          }
          alt=""
          id="processafter"
        />
      </div>
      <div id="values">
        <LazyLoadImage
          src={
            Array.isArray(aboutData) &&
            aboutData?.length > 0 &&
            aboutData[9]?.Image
          }
          alt=""
          className="valuesheadermob"
        />
        <div id="valuesheader">
          <h2>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[9]?.header}
          </h2>
        </div>
        <div id="valuescontent">
          <div className="toptext" id="valuestoptext">
            Values Provided
            <LazyLoadImage src={line} alt="" />
          </div>
          <div className="values row ">
            {Array.isArray(valueProvidedData) &&
              valueProvidedData.length > 0 &&
              valueProvidedData.map((data) => {
                return (
                  <div className="valuecol col span-1-of-3">
                    <LazyLoadImage src={data?.Image} alt="valueicon" />
                    <p className="valuetitle">{data?.header}</p>
                    <p className="valuecontent">{data?.Desc}</p>
                  </div>
                );
              })}
            {/* <div className="valuecol col span-1-of-3">
              <LazyLoadImage src={value2} alt="valueicon" />
              <p className="valuetitle">
                Innovative /<br /> modern
              </p>
              <p className="valuecontent">
                Architecture that is innovative and modern that push the
                boundaries of design and functionality.
              </p>
            </div>
            <div className="valuecol col span-1-of-3">
              <LazyLoadImage src={value3} alt="valueicon" />
              <p className="valuetitle">
                Holistic -<br />
                truly green
              </p>
              <p className="valuecontent">
                Create truly green and holistic spaces that prioritize the
                health of our planet and its inhabitants.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <div id="meaning">
        <div id="themeaning">
          <h3>The meaning of </h3>
          <h3>our ART</h3>
          <img src={line} alt="" id="meaningline" />
        </div>

        <div id="companymeaning">
          <div id="klim">
            <p>klim</p>
          </div>
          <div id="art">
            <div
              className="artsquare"
              id="A"
              onMouseOver={handleMouseOverA}
              onMouseOut={handleMouseOutA}
            >
              <p className="artbutton">A</p>
              {isHoveringA && (
                <div className="artcontent">
                  <p className="artcontitle">
                    {KlimartData && KlimartData[0]?.header}
                  </p>
                  <p className="artcontext">
                    {KlimartData && KlimartData[0]?.Desc}
                  </p>
                </div>
              )}
            </div>
            <img src={line} alt="" className="artline" />
            <div
              className="artsquare"
              id="R"
              onMouseOver={handleMouseOverR}
              onMouseOut={handleMouseOutR}
            >
              <p className="artbutton">R</p>
              {isHoveringR && (
                <div className="artcontent">
                  <p className="artcontitle">
                    {KlimartData && KlimartData[1]?.header}
                  </p>
                  <p className="artcontext">
                    {KlimartData && KlimartData[1]?.Desc}
                  </p>
                </div>
              )}
            </div>
            <LazyLoadImage src={line} alt="" className="artline" />
            <div
              className="artsquare"
              id="T"
              onMouseOver={handleMouseOverT}
              onMouseOut={handleMouseOutT}
            >
              <p className="artbutton">T</p>
              {isHoveringT && (
                <div className="artcontent">
                  <p className="artcontitle">
                    {KlimartData && KlimartData[2]?.header}
                  </p>
                  <p className="artcontext">
                    {KlimartData && KlimartData[2].Desc}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div id="themeaningbg"></div>
          <div id="artmob">
            <div id="klimmob">
              <p>
                klim<div className="viewmorebtnline"></div>
              </p>
            </div>
            <div className="artsquare" id="Amob">
              <p className="artbutton">A</p>
            </div>
            <div className="artconmob">
              <p className="artheader">Action</p>

              <p className="artcon">
                Action being the steps we take in our day to day processes
                towards designing and building green and sustainable habitats.
              </p>
            </div>
            <div className="vl"></div>
            <div className="artsquare" id="Amob">
              <p className="artbutton">R</p>
            </div>
            <div className="artconmob">
              <p className="artheader">Responsibility</p>
              <p className="artcon">
                Responsibility is our duty on educating the masses through our
                educative platforms which would deliver high quality content.
              </p>
            </div>
            <div className="vl"></div>
            <div className="artsquare" id="Amob">
              <p className="artbutton">T</p>
            </div>
            <div className="artconmob">
              <p className="artheader">Transformation</p>
              <p className="artcon">
                Transformation is our aim through our efforts and way of life to
                impact and change the world with the projects we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LocationComponent />
      <div id="careersbutton">
        <div id="careersbuttonleft">
          <h3>
            Are you looking to work with us? You can check out our&nbsp;
            <Link to="/Careers">
              <span>Careers</span>
            </Link>
            &nbsp;Page for vacancies.
          </h3>
        </div>
        <div id="careersbuttonright">
          <Link to="/Careers">
            <AiOutlineArrowRight />
          </Link>
        </div>
      </div>

      <div id="ourpeople">
        <div className="toptext" id="ourpeopletop">
          Our People
          <LazyLoadImage src={line} alt="linedecor" />
        </div>
        <div id="peopledrive">
          <h3>
            {Array.isArray(aboutData) &&
              aboutData?.length > 0 &&
              aboutData[10]?.header}
            <LazyLoadImage src={line} alt="" id="peopleline" />
          </h3>

          <div>
            <div className="slogan_heading">
              <h2>
                <FaQuoteLeft />
                {Array.isArray(aboutData) &&
                  aboutData?.length > 0 &&
                  aboutData[10]?.Desc}
              </h2>
              <div className="seperatorline">
                <p>Dr Sujit Kumar</p>
              </div>
            </div>

            {/* <LazyLoadImage src={aboutquote} alt="quote" id="aboutquote" /> */}
          </div>
          <div
            id="peoplecontainer"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div id="profilecard">
              <div id="name">Dr Sujit Kumar</div>
              <div id="designation">Founder/Principal Architect</div>
              <div id="credentials">
                <ul>
                  <li>
                    <strong>PhD | IIT Delhi</strong>
                    <br /> in Solar Passive Architecture and Earth Coupling for
                    Space Conditioning for Buildings
                  </li>
                  <li>
                    <strong>M.Tech | IIT Delhi</strong>
                    <br /> Building Science and Construction Management
                  </li>
                  <li>
                    <strong>B.Arch | MANIT Bhopal</strong> (Formerly MACT)
                  </li>
                </ul>
              </div>
            </div>
            <div id="aboutcontent">
              <p>
                {Array.isArray(aboutData) &&
                  aboutData?.length > 0 &&
                  aboutData[11]?.Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="team"
        data-aos="fade-up"
        data-aos-duration="2000"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div id="theteam">
          <h3>The Team</h3>
          <img src={line} alt="" id="teamline" />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div
            className="theTeamcontainer"
            style={{
              display: "flex",
              flexWrap: "wrap",

              width: "66%",
            }}
          >
            {Array.isArray(team) &&
              team?.length > 0 &&
              team.map((item) => {
                return (
                  <span
                    style={{
                      width: "10rem",
                      height: "10rem",
                      marginTop: "60px",
                    }}
                    className=""
                  >
                    <img
                      style={{ width: "10rem", height: "10rem" }}
                      src={item?.propertyGallery[0]}
                      alt="no image"
                    />
                    <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                      {item?.Name}
                    </p>
                  </span>
                );
              })}
          </div>
          {/* <div className="teamcol col span-1-of-5">
            <img src={team1} alt="" />
            <p>Shankari Narayanan</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team2} alt="" />
            <p>Dr Kanwal Sujit </p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team3} alt="" />
            <p>Abhinav Sujit </p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team4} alt="" />
            <p>Manasa Nandini</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team5} alt="" />
            <p>Migom Doley</p>
          </div> */}
        </div>
        {/* <div className="teamrow row">
          <div className="teamcol col span-1-of-5">
            <img src={team6} alt="" />
            <p>Kavya Raja</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team7} alt="" />
            <p>Balaji R</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team8} alt="" />
            <p>Srishti Kundaliya</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team9} alt="" />
            <p>Saoirse Tope</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team10} alt="" />
            <p>Ganesh Shelke</p>
          </div>
        </div>
        <div className="teamrow row">
          <div className="teamcol col span-1-of-5">
            <img src={team11} alt="" />
            <p>Gopal Bhattli</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team12} alt="" />
            <p>Swatika K</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team13} alt="" />
            <p>Tony C Sam</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team14} alt="" />
            <p>Vinayak Vijayakumar</p>
          </div>
          <div className="teamcol col span-1-of-5">
            <img src={team15} alt="" />
            <p>Shivani S</p>
          </div>
        </div>
        <div className="teamrow row">
          <div className="teamcol col span-1-of-5">
            <img src={team16} alt="" />
            <p>Neha P</p>
          </div>
        </div> */}
      </div>

      <section className="select_projetcs">
        <SelectedProjects />
      </section>
      {/* <section className="newsletter">
        <Newsletter />
      </section> */}
      {/* <Linebreakright /> */}
      <section className="buildproject">
        <BuildProject PopUp={setShowPopUp} />
      </section>
    </div>
  );
}

export default About;

function LocationComponent() {
  const [selected, setSelected] = useState(0);

  const handleClick = (i) => {
    setSelected(i);
  };

  return (
    <>
      <div className="map_component">
        <div className="section_head">
          <div className="section_title">Spread across the</div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div className="section_title">country</div>
            <div className="viewmorebtnline"></div>
          </div>
        </div>
        <div className="map_map">
          <img src={selected ? map2 : map1} alt="" className="mapimg" />
        </div>
        <div className="map_circle">
          <div className="map_btns"></div>
          <div className="map_btns">
            <div
              onClick={() => handleClick(0)}
              className={selected === 0 ? "map_btn selected" : "map_btn"}
            >
              <h1>5</h1>
              <p>Bases</p>
            </div>
            <div
              onClick={() => handleClick(1)}
              className={selected === 1 ? "map_btn selected" : "map_btn"}
            >
              <h1>45+</h1>
              <p>
                Cities
                <br />
                Reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
