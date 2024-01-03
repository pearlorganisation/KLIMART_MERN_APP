import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import "../grid.css";
import "./Header.css";
import Tellus from "./Tellus";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import Buildproject from "./Buildproject";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import heropic1 from "../assets/Hero-1.png";
import heropic2 from "../assets/Hero-2.png";
import heropic3 from "../assets/Hero-3.png";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import linered from "../assets/redline.png";
import linebreak from "../assets/linebreakright.png";
import thumbnail from "../assets/thumbnail1.png";

import whoweareimg from "../assets/whoweare-long.png";
import sbr from "../assets/sunnybrookes.png";
import anunani from "../assets/anunani.png";
import pgcl from "../assets/pgcl.png";
import kseb from "../assets/kseb.png";
import shantanu from "../assets/shantanu.png";
import kseblogo from "../assets/kseblogo.png";
import iitm from "../assets/iitm.png";
import psbb from "../assets/psbb.png";
import educomp from "../assets/educomp.png";
import uptour from "../assets/up tourism.png";
import mpshasan from "../assets/mp.png";
import hp from "../assets/Hindustan_Petroleum_Logo.png";
import epco from "../assets/epco.png";
import powergrid from "../assets/pgcllogo.png";
import momnme from "../assets/momnme.png";
import strides from "../assets/strides.png";
import reva from "../assets/Reva-Logo.png";
import usha from "../assets/usha shriram.png";
import domino from "../assets/domino.png";
import tagore from "../assets/tagore.png";
import matter1 from "../assets/matterlibbig1.png";
import matter2 from "../assets/matterlibbig2.png";
import matter3 from "../assets/matterlibbig3.png";
import matter4 from "../assets/matterlibbig4.png";
import newsletterimg from "../assets/newsletterimg.png";
import quote from "../assets/quote.png";
import card1 from "../assets/smartlight5.png";
import card2 from "../assets/wooden13.png";
import card3 from "../assets/solid9.png";
import homelib1 from "../assets/homelib1.png";
import homelib2 from "../assets/homelib2.png";
import homelib3 from "../assets/homelib3.png";
import homelib4 from "../assets/homelib4.png";
import Latestblogcard from "./Latestblogcard";
import GetInTouchModal from "./common/GetInTouchModal";

import tellusimg from "../assets/tellusimg.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Dispatch } from "react";

import "./Tellus.css";
import BuildProject from "./common/BuildProject";
import TellUs from "./common/TellUs";
import { useDispatch } from "react-redux";

import { useOutletContext } from "react-router-dom";
import { fetchBlogs } from "./features/actions/blogAction";
import { fetchProjects } from "./features/actions/projectAction";
import { fetchHomeData, fetchLogos } from "./features/actions/homeAction";

const Latestblogcards = [
  {
    title: "The Comfort of Smart Lighting",
    name: "By Saoirse Tope",
    date: "23 September 2022",
    img: card1,
    link: "/Matterlisting/Blog The-Comfort-of-Smart-Lighting",
  },
  {
    title: "Modern alternatives to wooden surfaces",
    name: "By Saoirse Tope",
    date: "23 September 2022",
    img: card2,
    link: "/Matterlisting/Blog Modern-alternatives-to-wooden-surfaces",
  },
  {
    title: "How to make a solid first impression",
    name: "By Raksha Alangi",
    date: "23 October 2022",
    img: card3,
    link: "/Matterlisting/Blog How-to-make-a-solid-first-impression",
  },
];

function Home() {
  const [showPopup, setShowPopUp] = useOutletContext();
  const { getBlogData } = useSelector((state) => state.getBlog);
  const data =useSelector((state)=>state?.home?.HomeData?.data ? state?.home?.HomeData?.data : [])
  const logoData =useSelector((state)=>state?.home?.logoData)
  
  const { getProjectData, filterProjectState } = useSelector(
    (state) => state?.getProject)

console.log("getproject data", getProjectData)
  // console.log(logoData);
  // console.log("hello")



  
  const dispatch = useDispatch();

  const navigate = useNavigate();



  const handleClick = (idx) => {
    navigate("/Matterlisting", {
      state: { index: idx },
    });
  };

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchProjects());
    dispatch(fetchHomeData());
    dispatch(fetchLogos())
    
  }, []);

  return (
    <>
<div className="home">
        {/* Hero page */}
        <div className="hero">
          <div className="hero__text">
            <h1>
           {Array.isArray(data) && data?.length>0 &&  data[0]?.header}
            </h1>
          </div>
          <div className="wor">
           
            <LazyLoadImage className="work__pic" src={Array.isArray(data) && data?.length>0 && data[0]?.Image} />
            {/* <LazyLoadImage className="work__pic" src={heropic2} />
            <LazyLoadImage className="work__pic" src={heropic3} /> */}
          </div>
        </div>
        {/* Video Section */}
        <section className="section2">
          <div className="toptext" id="wecreate">
            We Create The Difference
            <LazyLoadImage src={line} alt="" />
          </div>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/SsrqHbtYBlg"
              height="518"
              width="920"
              allowFullScreen="true"
              loading="lazy"
            ></iframe>
          </div>
          {/* <div className="vidtextbox">
            <div className="vidtext">
              We make<br></br> your dreams come true
            </div>
          </div> */}
        </section>
        {/* Build Project  */}
        {/* <Buildproject PopUp={props.PopUp} /> */}
  
        <section className="buildProjects">
          <BuildProject PopUp={setShowPopUp} />
        </section>
        {/* Who we are */}
        <section id="whoweare" data-aos="fade-up"  data-aos-duration="3000">
          <div>
            <LazyLoadImage src={linebreak} alt="linebreak" id="linebreak" />
            <div id="whoweareimg">
              <LazyLoadImage src={Array.isArray(data) && data?.length>0 && data[1]?.Image} />
            </div>
          </div>
  
          <div>
            <div className="toptext">
             Who we are
              <LazyLoadImage src={line} alt="" />
            </div>
            <div>
              <h3 id="whowearemain">
                {Array.isArray(data) && data?.length>0 && data[1]?.header}
              </h3>
            </div>

            <div id="whowearesub">
              <p>
                {Array.isArray(data) && data?.length>0 && data[1]?.Desc}
              </p>
            </div>
  
            <div id="whowearetextbox">
              <div id="whowearetext">
              {Array.isArray(data) && data?.length>0 && data[2]?.Desc}
              </div>
            </div>
          </div>
        </section>
  
        {/* Values Delivered */}
        <div className="homelib">
          <div className="toptext">
            Values Delivered
            <LazyLoadImage src={line} alt="" />
          </div>
          <div className="homelibleft" id="homelibleft1">
            <div
               data-aos="fade-up"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <LazyLoadImage src={Array.isArray(data) && data?.length>0 && data[3]?.Image} alt="" />
            </div>
            <div
              className="homelefttext"
               data-aos="fade-down"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <h2>{Array.isArray(data) && data?.length>0 && data[3]?.header}</h2>
              <p>
               {Array.isArray(data) && data?.length>0 && data[3]?.Desc}
              </p>
            </div>
          </div>
          <div className="homelibright">
            <div
               data-aos="fade-down"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <LazyLoadImage src={Array.isArray(data) && data?.length>0 && data[4]?.Image} alt="" />
            </div>
            <div
              className="homerighttext"
               data-aos="fade-up"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <h3>{Array.isArray(data) && data?.length>0 && data[4].header}</h3>
              <p>
            {Array.isArray(data) && data?.length>0 && data[4]?.Desc}
              </p>
            </div>
          </div>
          <div className="homelibleft">
            <div
               data-aos="fade-down"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <LazyLoadImage src={Array.isArray(data) && data?.length>0 && data[5]?.Image} alt="" />
            </div>
            <div
              className="homelefttext"
               data-aos="fade-up"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <h3>{Array.isArray(data) && data?.length>0 && data[5]?.header}</h3>
              <p>
                {Array.isArray(data) && data?.length>0 && data[5]?.Desc}
              </p>
            </div>
          </div>
          <div className="homelibright">
            <div
               data-aos="fade-down"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <LazyLoadImage src={Array.isArray(data) && data?.length>0 && data[6]?.Image} alt="" />
            </div>
            <div
              className="homerighttext"
              id="homerighttext2"
               data-aos="fade-up"
               data-aos-offset="500"
               data-aos-easing="ease-in-sine"
            >
              <h3>{Array.isArray(data) && data?.length>0 && data[6]?.header}</h3>
              <p>
               {Array.isArray(data) && data?.length>0 && data[6]?.Desc}
              </p>
            </div>
          </div>
        </div>
  
        {/* Select Projects  */}
        <section id="Select">
          <div className="toptext" id="selectproj">
            Select Projects
            <LazyLoadImage src={line} id="selpro" alt="" />
          </div>
          <div id="projects">
            {getProjectData?.slice(0,6).map((data)=>{
              return (
                <div id="sbr"
                style={{cursor:"pointer"}}
                onClick={()=> navigate(`/Projects/${data?._id}`)}>
                <div className="type">{data?.type?.type_name}</div>
                <div className="zoomhover">
                  <LazyLoadImage src={data?.heroImg} />
                </div>
                <div className="projecttitle">{data?.name}</div>
                <div className="dateloc">{data?.location?.city},{data?.location?.country}</div>
              </div>
              )
            })}
{/*             
            <div id="sbr">
              <div className="type">Residence</div>
              <div className="zoomhover">
                <LazyLoadImage src={sbr} />
              </div>
              <div className="projecttitle">Sunny Brookes Residence</div>
              <div className="dateloc">2022 • BENGALURU, INDIA</div>
            </div>
            <div id="anunanibox">
              <div className="type">Residence</div>
              <div id="anunanihover">
                <LazyLoadImage src={anunani} />
              </div>
              <div className="projecttitle">Anu & Nani Residence</div>
              <div className="dateloc">2016 • BENGALURU, INDIA</div>
            </div>
            <div id="pgcl">
              <div className="type">Township</div>
              <div className="zoomhover">
                <LazyLoadImage src={pgcl} />
              </div>
              <div className="projecttitle">
                Power Grid Corporation of India Limited Headquarters
              </div>
              <div className="dateloc">2018 • BENGALURU, INDIA</div>
            </div>
            <div id="shantanu">
              <div className="type">Interiors</div>
              <div className="zoomhover">
                <LazyLoadImage src={shantanu} />
              </div>
              <div className="projecttitle">Shaantnu Residence Interiors</div>
              <div className="dateloc">2016 • BENGALURU, INDIA</div>
            </div>
            <div id="kseb">
              <div className="type">Interiors</div>
              <div className="zoomhover">
                <LazyLoadImage src={kseb} />
              </div>
              <div className="projecttitle">KSEB Headquarters Office</div>
              <div className="dateloc">2016 • TRIVANDRUM, INDIA</div>
            </div> */}
          </div>
        </section>
  
        <Link to="/Projects">
          <button className="button" id="gotoproj">
            Go to Projects
          </button>
        </Link>
        {/* Clients Text  */}
        <section id="clienttext">
          <div className="toptext" id="clienttop">
            Who we work with
            <LazyLoadImage src={linewhite} alt="" />
          </div>
          <div id="clientmain">{Array.isArray(data) && data?.length>0 && data[8]?.header}</div>
          <div id="clientsub">
          {Array.isArray(data) && data?.length>0 && data[8]?.Desc}
          </div>
        </section>
        {/* Client Logos  */}
        <section id="clientlogos"  data-aos="fade-up" data-aos-duration="3000">
          <div className="toptext" id="clogostop" style={{marginBottom:"40px"}}>
            Our Clientelle
            <LazyLoadImage src={line} id="selpro" alt="" />
          </div>
          <div>
          <div style={{display:"flex" ,gap:"100px", flexWrap:"wrap", alignItems:"center"}}>
                {Array.isArray(logoData?.data) && logoData?.data.length>0 && logoData?.data.map((data)=>{
                  return (
                    <div>
                      <LazyLoadImage src={data.Image} id="ksebl" alt="logo" className="outClientelleImage" />
                    </div>
                  )
                })}
              </div>
          </div>
          {/* <div className="logogrid">
            <div className="logorow row">
            <div className="col span-1-of-5">
                <LazyLoadImage src={kseblogo} id="ksebl" alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={iitm} alt="logo " />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={psbb} alt="" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={educomp} alt="" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={uptour} alt="" />
              </div>
            </div>
            <div className="logorow row">
              <div className="col span-1-of-5">
                <LazyLoadImage src={mpshasan} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={hp} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={epco} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={powergrid} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={momnme} alt="logo" />
              </div>
            </div>
            <div className="logorow row">
              <div className="col span-1-of-5">
                <LazyLoadImage src={strides} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={reva} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={usha} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={domino} alt="logo" />
              </div>
              <div className="col span-1-of-5">
                <LazyLoadImage src={tagore} alt="logo" />
              </div>
            </div>
          </div> */}
  
          {/* <div className="mobilelogos">
            <div className="logorow row">
              <div className="col span-1-of-3">
              {Array.isArray(logoData?.data) && logoData?.data.length>0 && logoData?.data.map((data)=>{
                  return (
                    <LazyLoadImage src={data?.Image} id="ksebl" alt="logo" />
                  )
                })}
                
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={iitm} alt="logo " />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={psbb} alt="" />
              </div>
            </div>
  
            <div className="logorow row">
              <div className="col span-1-of-3">
                <LazyLoadImage src={educomp} alt="" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={uptour} alt="" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={mpshasan} alt="logo" />
              </div>
            </div>
  
            <div className="logorow row">
              <div className="col span-1-of-3">
                <LazyLoadImage src={hp} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={epco} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={powergrid} alt="logo" />
              </div>
            </div>
  
            <div className="logorow row">
              <div className="col span-1-of-3">
                <LazyLoadImage src={momnme} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={strides} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={reva} alt="logo" />
              </div>
            </div>
  
            <div className="logorow row">
              <div className="col span-1-of-3">
                <LazyLoadImage src={usha} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={domino} alt="logo" />
              </div>
              <div className="col span-1-of-3">
                <LazyLoadImage src={tagore} alt="logo" />
              </div>
            </div>
          </div> */}
          {/* <LazyLoadImage src={linered} alt="border" id="borderbtn" /> */}
        </section>
  
        {/* Testimonials */}
        {/* <section id="testimonials">
          <div className="toptext" id="testimonialstop">
            What our clients have to say
            <LazyLoadImage src={line} alt="" />
          </div>
          <div
            style={{ clear: "both", paddingRight: "2rem", background: "inherit" }}
          >
            <Carousel style={{ width: "auto" }}>
              <div className="testimonialContent">
                <LazyLoadImage src={quote} alt="" />
                <div className="testmonial_text">
                  The house designed by klimArt Architects is a beautiful and
                  modern masterpiece.
                </div>
                <div className="textmonial_separating_line">
                  <span></span>
                  <span></span>
                </div>
                <div className="testimonial_name">Ankush PA Reddy</div>
                <div className="testimonial_name_designation">
                  Chief Executive Officer, Google
                </div>
              </div>
  
              <div className="testimonialContent">
                <LazyLoadImage src={quote} alt="" />
                <div className="testmonial_text">
                  The house designed by klimArt Architects is a beautiful and
                  modern masterpiece.
                </div>
                <div className="textmonial_separating_line">
                  <span></span>
                  <span></span>
                </div>
                <div className="testimonial_name">Ankush PA Reddy</div>
                <div className="testimonial_name_designation">
                  Chief Executive Officer, Google
                </div>
              </div>
  
              <div className="testimonialContent">
                <LazyLoadImage src={quote} alt="" />
                <div className="testmonial_text">
                  The house designed by klimArt Architects is a beautiful and
                  modern masterpiece.
                </div>
                <div className="textmonial_separating_line">
                  <span></span>
                  <span></span>
                </div>
                <div className="testimonial_name">Ankush PA Reddy</div>
                <div className="testimonial_name_designation">
                  Chief Executive Officer, Google
                </div>
              </div>
  
              <div className="testimonialContent">
                <LazyLoadImage src={quote} alt="" />
                <div className="testmonial_text">
                  The house designed by klimArt Architects is a beautiful and
                  modern masterpiece.
                </div>
                <div className="textmonial_separating_line">
                  <span></span>
                  <span></span>
                </div>
                <div className="testimonial_name">Ankush PA Reddy</div>
                <div className="testimonial_name_designation">
                  Chief Executive Officer, Google
                </div>
              </div>
            </Carousel>
          </div>
        </section> */}
        {/* Tell Us */}
        {/* <Tellus PopUp={props.PopUp} />
        
         */}
  
        <section className="tellus" style={{marginTop:"40px"}}>
          <TellUs PopUp={setShowPopUp} data={Array.isArray(data) && data?.length>0 && data[7]} />
        </section>
  
        {/* Matter */}
        <section id="matter">
          <div id="mat">
            <h3>
              MATTER
              <div id="color">I</div>
              <br /> For <br />
              Discussion
            </h3>
            <p id="mattercontent">
              Our blog hub, a source for all things related to klimArt
            </p>
          
          </div>
          <div id="matterimg">
            <div className="container">
              <div className="card">
                <LazyLoadImage
                  onClick={() => handleClick(1)}
                  src={matter1}
                  alt="..."
                />
              </div>
              <div className="card">
                <LazyLoadImage
                  onClick={() => handleClick(3)}
                  src={matter2}
                  alt="..."
                />
              </div>
              <div className="card">
                <LazyLoadImage
                  onClick={() => handleClick(2)}
                  src={matter3}
                  alt="..."
                />
              </div>
              <div className="card">
                <LazyLoadImage
                  onClick={() => handleClick(4)}
                  src={matter4}
                  alt="..."
                />
              </div>
            </div>
          </div>
  
          <div id="latestblogs">
            <div className="toptext">
              Latest blogs
              <LazyLoadImage src={line} alt="" />
            </div>
            <div className="cardsContainer">
              {getBlogData?.map((carddata, index) => {
                if (index < 3) {
                  const timestamp = carddata?.date;
                  const date = new Date(timestamp);
  
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
  
                  const dateString = date.toLocaleDateString(undefined, options);
                  return (
                    <span key={index}>
                      <Latestblogcard
                        name={`By ${carddata.writer}`}
                        img={carddata.propertyGallery[0]}
                        title={carddata.topic}
                        date={dateString}
                        link={carddata.content}
                        Id={carddata._id}
                      />
                    </span>
                  );
                }
              })}
            </div>
  
            <div className="matterblogsbtnp">
              <Link to="/Matterlisting">
                <button className="matterblogsbtn">GO TO MATTER BLOGS</button>
              </Link>
            </div>
          </div>
        </section>
  
        {/* <section classname="newsletter">
            <Newsletter/>
        </section> */}
      </div>
    </>
  )
}

export default Home;
