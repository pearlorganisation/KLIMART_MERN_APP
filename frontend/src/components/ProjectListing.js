import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import "./ProjectListing.css";
import HPCLhero from "../assets/hpclhero.png";
import PGCILhero from "../assets/pgcilhero.png";
import EPCOhero from "../assets/epcohero.png";
import BIOMEhero from "../assets/biomehero.png";
import HABIThero from "../assets/habitathero.png";
import project1 from "../assets/pgcilhero.png";
import project2 from "../assets/hpclhero.png";
import project3 from "../assets/microhero.png";
import project4 from "../assets/epcohero.png";
import project5 from "../assets/biomehero.png";
import project6 from "../assets/habitathero.png";
import project7 from "../assets/epcohero2.png";
import tellusimg from "../assets/tellusimg.png";
// import project8 from "../assets/project8.png";
// import project9 from "../assets/project9.png";
// import project10 from "../assets/project10.png";
// import project11 from "../assets/project11.png";
// import project12 from "../assets/project12.png";
import projectlong from "../assets/anunani.png";
// import projectsquare from "../assets/projectsquare.png";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import pausebtn from "../assets/pausebtn.png";
import playbtn from "../assets/pausebtn.png";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import GetInTouchModal from "./common/GetInTouchModal";
import Newsletter from "./Newsletter";
import TellUs from "./common/TellUs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "./features/actions/projectAction";
import { filterProjectsbyType } from "./features/slices/projectSlice";

function ProjectListing() {
  const herodata = [
    {
      img: HPCLhero,
      title: "HPCL North Central Zone HQ",
      caption: "Interiors",
    },
    {
      img: PGCILhero,
      title: "PGCIL Campus ",
      caption: "Institutional",
    },
    {
      img: EPCOhero,
      title: "EPCO CM Rise Schools- Shahganj",
      caption: "Institutional",
    },
    {
      img: BIOMEhero,
      title: "Biome + ",
      caption: "Residential",
    },
    {
      img: HABIThero,
      title: "Habitat Zero ",
      caption: "Residential",
    },
  ];

  // const types = [
  //   "all",
  //   "hospitality",
  //   "residential",
  //   "commercial",
  //   "institutional",
  //   "interiors",
  //   "masterplan",
  //   "healthcare",
  // ];

  const cardsdata = [
    {
      img: project1,
      label: "institutional",
      link: "/Projects/Project-PGCIL",
      title: "PGCIL Campus",
      caption: "2016 • BENGALURU, INDIA",
    },
    {
      img: project2,
      label: "institutional",
      link: "/Projects/Project-HPCL",
      title: "HPCL Zonal Headquarters",
      caption: "2015 • BENGALURU, INDIA",
    },
    {
      img: project3,
      label: "hospitality",
      link: "/Projects/Project-Micro-Homes",
      title: "Micro Homes",
      caption: "COMPETITION • OFF-GRID",
    },
    {
      img: projectlong,
      label: "residential",
      link: "/Projects/Project-Anu-Nani-Residence",
      title: "Anu & Nani Residence",
      caption: "2015 • BENGALURU, INDIA",
    },
    {
      img: project4,
      label: "institutional",
      link: "/Projects/Project-EPCO-Shahganj",
      title: "EPCO CM Rise Schools- Shahganj",
      caption: "2021 • SEHORE, INDIA",
    },
    {
      img: project5,
      label: "residential",
      link: "/Projects/Project-Biome",
      title: "Biome+",
      caption: "COMPETITION • NEW DELHI, INDIA",
    },
    {
      img: project6,
      label: "residential",
      link: "/Projects/Project-Habitat-Zero",
      title: "Habitat Zero",
      caption: "COMPETITION • NEW DELHI, INDIA",
    },
    {
      img: project7,
      label: "residential",
      link: "/Projects/Project-EPCO-Ashta",

      title: "EPCO CM Rise Schools- Ashta",
      caption: "2021 • SEHORE, INDIA",
    },

    // {
    //   img: project8,
    //   label: "interiors",
    //   link: "/Projects/Project-HPCL",
    //   title: "PSBB LLA School",
    //   caption: "2018 • BENGALURU, INDIA",
    // },
    // {
    //   img: project9,
    //   label: "concept",
    //   link: "#",
    //   title: "HPCL Zonal Headquarters",
    //   caption: "2019 • BENGALURU, INDIA",
    // },
    // {
    //   img: project10,
    //   label: "residential",
    //   link: "#",
    //   title: "KSEB Headquarters",
    //   caption: "2021 • TRIVANDRUM, INDIA",
    // },
    // {
    //   img: project11,
    //   label: "interiors",
    //   link: "#",
    //   title: "PSBB LLA School",
    //   caption: "2018 • BENGALURU, INDIA",
    // },
    // {
    //   img: project12,
    //   label: "interiors",
    //   link: "#",
    //   title: "PSBB LLA School",
    //   caption: "2018 • BENGALURU, INDIA",
    // },
    // {
    //   img: projectsquare,
    //   label: "interiors",
    //   link: "#",
    //   title: "PSBB LLA School",
    //   caption: "2018 • BENGALURU, INDIA",
    // },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopUp] = useOutletContext();
  const [selected, setSelected] = useState("All");
  const [cards, setCards] = useState([]);
  const [play, setPlay] = useState(true);
  const [typesList, setTypesList] = useState([]);

  const handleViewMore = () => {
    setCards([...cards, ...cards]);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { getProjectData, filterProjectState } = useSelector(
    (state) => state?.getProject
  );

  useEffect(() => {
    if (Array.isArray(getProjectData) && getProjectData?.length > 0) {
      const types = getProjectData.map((project) =>
        project?.type?.type_name.toString()
      );
      const uniqueTypes = [...new Set(types)];
      if (uniqueTypes?.length > 0) setTypesList(uniqueTypes);
    }
  }, [getProjectData]);

  // console.log(typesList, "Abhishek Types:::::::::::::::::");

  useEffect(() => {}, [typesList]);

  // const handleselect = (type) => {
  //   if (type === "All") {
  //     setSelected("All");
  //     setCards(cardsdata);
  //     return;
  //   }
  //   // console.log(cardsdata,"Hi Abhishek Jaguri :::::::::::::");
  //   setCards(cardsdata.filter((card) => card.label === type));
  //   setSelected(type);
  // };

  // console.log(getProjectData, "Checking for data::::::::::::::");
  return (
    <>
      <div className="about ">
        <div id="projectlisting">
          {/* <div class="projectheroimgs">
          <Link to="/Projects/Projectxyz">
            <img src={projecthero} alt="" id="projecthero" />
          </Link>
        </div>
      </div> */}
          <div
            className={`${play ? "carousel-main" : "carousel-main paused"} `}
          >
            <Carousel autoPlay={play} infiniteLoop={true} interval="5000">
              {getProjectData?.map((data, ind) => {
                return (
                  <>
                    <div
                      slideid={0}
                      className="cslide caro"
                      key={ind}
                      onClick={() => navigate(`/projects/${data?._id}`)}
                    >
                      <LazyLoadImage src={data?.heroImg[0]} alt="" style={{cursor:"pointer"}} />
                      <div className="slide-container container-gradient">
                        <div className="slide-content">
                          <p>{data?.type?.type_name}</p>
                          <div className="slide-content-head">{data?.name}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </Carousel>
          </div>
          <div className="hero-container">
            <div className="heronav" id="heronavprojecthome">
              <Link to="/" style={{ color: "white" }}>
                HOME
              </Link>
              {" > PROJECTS"}
            </div>
            <h1 id="fixit">Select Projects</h1>
            <div onClick={() => setPlay(!play)} className="carouselbutton">
              {/* <img src={play ? pausebtn : playbtn} alt="btn" /> */}
              {play ? (
                <AiOutlinePauseCircle fill="white" size="50px" />
              ) : (
                <AiOutlinePlayCircle size="50px" fill="white" fontSize="2rem" />
              )}
            </div>
          </div>
        </div>
        {/* list types */}
        <section id="projecttypes" className="">
          <div className="projecttypestitle">TYPE :</div>

          <div className="projecttypes hidescrollbar">
            <button
              onClick={() => {
                setSelected("All");
                dispatch(
                  filterProjectsbyType({ typeName: "All", comesFrom: "All" })
                );
              }}
              className={
                selected === "All"
                  ? "projectypebutton selected"
                  : "projectypebutton"
              }
            >
              All
            </button>
            {typesList?.map((type, idx) => {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelected(type);

                    dispatch(
                      filterProjectsbyType({
                        typeName: type,
                        comesFrom: "Types",
                      })
                    );
                  }}
                  className={
                    selected === type
                      ? "projectypebutton selected"
                      : "projectypebutton"
                  }
                >
                  {type?.toString()?.replace(/[^a-zA-Z ]/g, "")}
                </button>
              );
            })}
          </div>
        </section>
        <section id="projectcards">
          <div className="projectcards">
            {filterProjectState?.map((e, i) => {
              return (
                <span key={i}>
                  <ProjectCard
                    key={i}
                    toptext={e?.type?.type_name}
                    title={e?.name}
                    caption={e?.location?.state}
                    caption1={e?.location?.country}
                    image={e?.heroImg[0]}
                    // link={e.link}
                    id={e?._id}
                  />
                </span>
              );
            })}
          </div>
        </section>
        {/* <div className="viewmorebtnp">
        <div className="viewmorebtnline"></div>
        <div onClick={handleViewMore} className="viewmorebtn">
          VIEW MORE
        </div>
        <div className="viewmorebtnline"></div>
      </div> */}
        <section id="tellus">
          <LazyLoadImage src={tellusimg} alt="interiors" id="chairs" />
          <h2>Tell us about your next Project</h2>
          <div id="workbtn">
            <GetInTouchModal PopUp={setShowPopUp} />
          </div>
        </section>
        {/* <section>
          <TellUs PopUp={setShowPopUp} />
        </section> */}

        {/* <section className="newsletter">
        <Newsletter />
      </section> */}
      </div>
    </>
  );
}

export default ProjectListing;

export const ProjectCard = ({
  toptext,
  title,
  caption,
  caption1,
  image,
  id,
}) => {
  const navigate = useNavigate();

  const handleProject = (id) => {
    navigate(`/Projects/${id}`);
  };

  return (
    <div onClick={() => handleProject(id)} className="projectcard">
      <div className="cardtoptext">{toptext}</div>
      <div className="cardimg">
        <img src={image} alt="projectsimage" />
      </div>
      <div className="projectcardbottom">
        <div className="projectcardtitle">{title}</div>
        <p className="projectcardcaption">
          {caption}, {caption1}
        </p>
      </div>
    </div>
  );
};
