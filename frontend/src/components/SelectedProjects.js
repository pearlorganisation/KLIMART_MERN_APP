import React from "react";
import project1 from "../assets/hpclhero.png";
import project2 from "../assets/habitathero.png";
import project3 from "../assets/microhero.png";
import { ProjectCard } from "./ProjectListing";
import "./SelectedProjects.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SelectedProjects({ toptext, title, caption, image, link }) {

  const navigate = useNavigate();

  const { getProjectData } = useSelector((state) => state.getProject);
  const data = [
    {
      img: project1,
      label: "institutional",
      link: "/Projects/Project-HPCL",
      title: "HPCL Zonal Headquarters",
      caption: "2015 • BENGALURU, INDIA",
    },
    {
      img: project2,
      label: "residential",
      link: "/Projects/Project-Habitat-Zero",
      title: "Habitat Zero",
      caption: "COMPETITION • NEW DELHI, INDIA",
    },
    {
      img: project3,
      label: "hospitality",
      link: "/Projects/Project-Micro-Homes",
      title: "Micro Homes",
      caption: "COMPETITION • OFF-GRID",
    },
  ];


  return (
    <div className="select">
      <div className="selectedprojecttitle">Selected Projects</div>
      <div className="selectdesktop">
        <div className="selectedprojectcards">
          {Array.isArray(getProjectData) &&
            getProjectData?.length > 0 &&
            getProjectData?.map((item, ind) => {
              if (ind < 3)
                return (
                  <>
                    <div className="cardanim" key={ind}>
                      <ProjectCard
                        toptext={item?.type?.type_name}
                        title={item?.name}
                        caption={item?.location?.city}
                        image={item?.heroImg[0]}
                        caption1={item?.location?.state}
                        id={item?._id}
                        // link={data[0].link}
                      />
                    </div>
                  </>
                );
            })}
          {/* <div className="cardanim">
            <ProjectCard
              toptext={data[1].label}
              title={data[1].title}
              caption={data[1].caption}
              image={data[1].img}
              link={data[1].link}
            />
          </div>
          <div className="cardanim">
            <ProjectCard
              toptext={data[2].label}
              title={data[2].title}
              caption={data[2].caption}
              image={data[2].img}
              link={data[2].link}
            />
          </div> */}
        </div>
        <div className="seperatorline"></div>
      </div>
      <div className="selectmobile">
        {getProjectData?.map((item, ind) => {
          return (
            <>
              <div
                className="mobcard"
                onClick={() => navigate(`/Projects/${item?._id}`)}
                key={ind}
              >
                <div className="moblabel">{item?.type?.type_name}</div>
                <img src={item?.heroImg[0]?.path || ""} alt="" className="mobprojimg" />
                <div className="mobtitle">{item?.name}</div>
                <div className="mobcaption">{item?.location?.city}</div>
                <div className="mobcaption">{item?.location?.state}</div>
              </div>
            </>
          );
        })}

        {/* <a href={data[1].link}>
          <div className="mobcard">
            <div className="moblabel">{data[1].label}</div>
            <img src={data[1].img} alt="" className="mobprojimg" />
            <div className="mobtitle">{data[1].title}</div>
            <div className="mobcaption">{data[1].caption}</div>
          </div>
        </a>
        <a href={data[2].link}>
          <div className="mobcard">
            <div className="moblabel">{data[2].label}</div>
            <img src={data[2].img} alt="" className="mobprojimg" />
            <div className="mobtitle">{data[2].title}</div>
            <div className="mobcaption">{data[2].caption}</div>
          </div>
        </a> */}
      </div>
    </div>
  );
}

export default SelectedProjects;
