import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./Carousel.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./Matterhome.css";
import "./Header.css";
import logo from "../assets/KlimArt Logo - Horizontal Lockup.png";
import matterlogo from "../assets/matterlogo.png";
import handsvg from "../svgs/hand.svg";
import line from "../assets/Line 1.png";
import topSvg from "../svgs/topRightLine.svg";
import highlightcard1 from "../assets/woodenhero.png";
import highlightcard2 from "../assets/wayfindhero.png";
import highlightcard3 from "../assets/smartlighthero.png";
import matterlib1 from "../assets/matterlib1.png";
import matterlib2 from "../assets/matterlib2.png";
import matterlib3 from "../assets/matterlib3.png";
import matterlib4 from "../assets/matterlib4.png";
import SelectedProjects from "./SelectedProjects";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import interiorimg from "../assets/interiorimg.png";
import Arrow from "../svgs/arrow.svg";
import { Carousel } from "react-responsive-carousel";
import Newsletter from "./Newsletter";
import Linebreakright from "./Linebreakright";
import BuildProject from "./common/BuildProject";
// import MatterCaraousel from "./MatterCaraousel";
// import DemoImage from "../assets/anunani.png";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  fetchHomeBlog,
  fetchMainTag,
  fetchSingleBlogs,
} from "./features/actions/blogAction";

function Matterhome() {
  const [showPopup, setShowPopUp] = useOutletContext();
  const navigate = useNavigate();
  const data = useSelector((state) =>
    state.getBlog.HomeBlogData?.data ? state.getBlog.HomeBlogData?.data : []
  );
  // console.log(data);
  const { mainTags } = useSelector((state) => state.getBlog);
  // console.log(mainTags);

  // ------------------------------------------useEffect-----------------------------

  useEffect(() => {
    dispatch(fetchHomeBlog());
    dispatch(fetchMainTag());
  }, []);

  const herodata = [
    {
      title: "Sustainability",
      img: matterlib1,
      color: "#94AD1E",
      link: "sustainability",
    },
    {
      title: "Design Processes",
      img: matterlib2,
      color: "#44513D",
      link: "designprocess",
    },
    {
      title: "Materials & Techniques",
      img: matterlib3,
      color: "#FFC000",
      link: "materialsandtechniques",
    },
    {
      title: "People and Events",
      img: matterlib4,
      color: "#8B7150",
      link: "peopleandevents",
    },
  ];

  const handleClick = (idx) => {
    navigate("/Matterlisting", {
      state: { index: idx },
    });
  };

  // ----------------------------------------------Hooks-----------------------------------------------
  const dispatch = useDispatch();

  const { getBlogData } = useSelector((state) => state?.getBlog);

  // --------------------------------------------------------------------------------------------------

  // -----------------------------------------------useEffect-------------------------------------------
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  // ----------------------------------------------------------------------------------------------------
  return (
    <>
      <div className="matter_home">
        <div className="matterhero">
          <div className="heronav">
            <Link to="/">Home</Link> {">"} <strong>Matter</strong>
          </div>
          <div className="herocontainer">
            <div className="herologo">
              <div className="outer-container">
                <div className="inner-container">
                  <img src={matterlogo} alt="matterlogo" />
                </div>
              </div>
              <div className="herobuttons">
                {herodata.map((data, idx) => (
                  <div
                    onClick={() => handleClick(idx + 1)}
                    style={{
                      color: data?.color,
                    }}
                    databtntitle={data?.title}
                    className="herobutton"
                    key={idx}
                  >
                    <img
                      className="herobuttonimg"
                      src={data?.img}
                      alt={data?.title}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="herocontent">
              <div className="herocontenthead">{data[0]?.header}</div>
              <div className="herocontenttext">{data[0]?.Desc}</div>
              <Link to={`/Matterlisting/${mainTags[0]?._id}`}>
                <button className="button" id="exploremore">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="info_container">
          <div
            className="chairs_image"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <img src={interiorimg} alt=" Chairs Image " />
          </div>
          <div
            className="right_info_content"
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <div>{data[1]?.header}</div>
            <div className="chairs_image_mob">
              <img src={data[1]?.Image} alt=" Chairs Image " />
            </div>
            <div
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <p>{data[1]?.Desc}</p>
            </div>
          </div>

          <div
            className="left_info_content"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <div>{data[2]?.header}</div>
            <div className="temp_image_mob">
              <img src={data[2]?.Image} alt="Hand Image" />
            </div>
            <div>
              <p>{data[2]?.Desc}</p>
            </div>
          </div>
          <div
            className="temp_image"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
          >
            <img src={handsvg} alt="Hand Image" />
          </div>
        </div>
        <div className="black_background">
          <img src={line} alt="" className="black_background_line" />
          <img src={topSvg} alt="" className="top_right_line_svg" />
          <div className="heading_h2">{data[3]?.header}</div>
          <div className="paragraph">{data[3]?.Desc}</div>
        </div>

        {/* slider  */}

        <div
          className="carMatter"
          style={{
            display: "block",
            height: "400px",
            margin: "20px",
            overflow: "hidden",
          }}
        >
          <Carousel>
            {Array.isArray(getBlogData) &&
              getBlogData?.length > 0 &&
              Array(3)
                .fill(0)
                .map((key, index) => {
                  return (
                    <div>
                      <img className="sliderImage" src={getBlogData[index]?.propertyGallery[0] || ""} />
                    </div>
                  );
                })}
          </Carousel>
        </div>

        {/* <PartialSlider /> */}
        <div className="matterlib">
          <div id="matterlibtop">Matter Library Topics</div>
          {/* normal row  */}
          <div className="matterlibleft">
            <Link

            to={`/Matterlisting/${mainTags[0]?._id}`}

              className="overlay_img"
              onClick={() => {
                handleClick(0);
                // dispatch(fetchSingleBlogs(mainTags[0]._id));
              }}
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <img src={data[4]?.Image} alt="" />
              <div
                style={{ backgroundColor: "#94ad1e" }}
                className="overlay"
              ></div>
              <div className="overlay_remain"></div>
            </Link>

            <div
              className="matlefttext"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <div className="matleftTextWrapper">
             
                <div>{data[4]?.header}</div>
                <div>{data[4]?.Desc}</div>
                <div className="matterexplore">
                
                  
                  <Link to ={`/Matterlisting/${mainTags[0]?._id}`}
                    onClick={() => {
                      handleClick(0);
                      // dispatch(fetchSingleBlogs(mainTags[0]._id));
                    }}
                  >
                    <span> Explore More</span>
                    <AiOutlineArrowRight />
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
          {/* row-reverse / */}
          <div className="matterlibleft rev_row">
            <div
              className="overlay_img overlay_img_rev"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              
              <img src={data[5]?.Image} alt="" />
               <Link to ={`/Matterlisting/${mainTags[1]?._id}`}
                style={{ backgroundColor: "#44513D" }}
                className="overlay overlay_rev"
                onClick={() => {
                  handleClick(1);

                  // dispatch(fetchSingleBlogs(mainTags[1]._id));
                }}
              ></Link>
              <div
                style={{ backgroun: "#44513D" }}
                className="overlay_remain_rev"
              ></div>
            </div>

            <div
              className="matlefttext"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <div className="matleftTextWrapper">
                <div>{data[5]?.header}</div>
                <div>{data[5]?.Desc}</div>
                <div className="matterexplore">
                  <Link to ={`/Matterlisting/${mainTags[1]?._id}`}
                    onClick={() => {
                      handleClick(1);
                      // dispatch(fetchSingleBlogs(mainTags[1]._id));
                    }}
                  >
                    <span> Explore More</span>
                    <AiOutlineArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* material  */}
          <div className="matterlibleft">
          {/* <Link to ={`/Matterlisting/${mainTags[2]._id}`} */}
           <Link to ={`/Matterlisting/${mainTags[2]?._id}`}
              className="overlay_img"
              onClick={() => handleClick(2)}
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <img src={data[6]?.Image} alt="" />
              
              <div
                style={{ backgroundColor: "#FFC000" }}
                className="overlay"
              ></div>
              <div
                style={{ backgroundColor: "#FFC000" }}
                className="overlay_remain"
              ></div>
            {/* </div> */}
              </Link>

            <div
              className="matlefttext"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <div className="matleftTextWrapper">
                <div>{data[6]?.header}</div>
                <div>{data[6]?.Desc}</div>
                <div className="matterexplore">
                  <Link to={`/Matterlisting/${mainTags[2]?._id}`} onClick={() => handleClick(2)}>
                    <span> Explore More</span>
                    <AiOutlineArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* events  */}

          <div className="matterlibleft rev_row">
            <Link to ={`/Matterlisting/${mainTags[3]?._id}`}
              className="overlay_img overlay_img_rev"
              onClick={() => handleClick(3)}
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <img src={data[7]?.Image} alt="" />
              <div
                style={{ background: "#8B7150" }}
                className="overlay overlay_rev"
              ></div>
              <div
                style={{ background: "#8B7150" }}
                className="overlay_remain_rev"
              ></div>
            </Link>

            <div
              className="matlefttext"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-easing="ease-in-sine"
            >
              <div className="matleftTextWrapper">
                <div>{data[7]?.header}</div>
                <div>{data[7]?.Desc}</div>
                <div className="matterexplore">
                  <Link to={`/Matterlisting/${mainTags[3]?._id}`} onClick={() => handleClick(3)}>
                    <span> Explore More</span>
                    <AiOutlineArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SelectedProjects />
        {/* <section className="newsletter">
       <Newsletter/>
      </section>
      <Linebreakright/> */}
        <section className="buildProjects">
          <BuildProject PopUp={setShowPopUp} />
        </section>
      </div>
    </>
  );
}

// const PartialSlider = () => {
//   return (
//     <section id="highlights">
//       <div className="toptext">
//         HighLights
//         <img src={line} alt="" />
//       </div>
//       <div style={{ clear: "both", background: "inherit" }}>
//         <Carousel
//           autoPlay={false}
//           // infiniteLoop={true}
//           // interval={4000}
//           style={{ width: "auto" }}
//         >
//           {/* first content  */}
//           <div className="parent_wrapper">
//             <div className="first">
//               {" "}
//               {/* <img src={card1} alt="" />{" "} */}
//             </div>
//             <div className="highlights_Content">
//               <img src={highlightcard1} alt="" />
//               <Link to="/Matterlisting/Blog Modern-alternatives-to-wooden-surfaces">
//                 <div className="highlight_text">
//                   <div className="hightlight_text_parent">
//                     <div>Modern alternatives to wooden surfaces</div>q
//                     <div>By Saoirse Tope</div>
//                     <div>23 September 2022</div>
//                     <div className="hightlight_read_btn">
//                       <p> READ </p>
//                       <img src={Arrow} alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* first content  */}
//           <div className="parent_wrapper">
//             <div className="first">
//               {" "}
//               {/* <img src={card1} alt="" />{" "} */}
//             </div>
//             <div className="highlights_Content">
//               <img src={highlightcard2} alt="" />
//               <Link to="/Matterlisting/Blog Do-you-really-design-for-your-user">
//                 <div className="highlight_text">
//                   <div className="hightlight_text_parent">
//                     <div>Do you really design for your user?</div>
//                     <div>By Saoirse Tope</div>
//                     <div>23 September 2022</div>
//                     <div className="hightlight_read_btn">
//                       <p> READ </p>
//                       <img src={Arrow} alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//           {/* first content  */}
//           <div className="parent_wrapper">
//             <div className="first">
//               {" "}
//               {/* <img src={card1} alt="" />{" "} */}
//             </div>
//             <div className="highlights_Content">
//               <img src={highlightcard3} alt="" />
//               <Link to="/Matterlisting/Blog The-Comfort-of-Smart-Lighting">
//                 <div className="highlight_text">
//                   <div className="hightlight_text_parent">
//                     <div>The Comfort of Smart Lighting</div>
//                     <div>By Saoirse Tope</div>
//                     <div>23 September 2022</div>
//                     <div className="hightlight_read_btn">
//                       <p> READ </p>
//                       <img src={Arrow} alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </Carousel>
//       </div>
//     </section>
//   );
// };

export default Matterhome;
