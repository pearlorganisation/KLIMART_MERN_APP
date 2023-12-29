import React, { useEffect, useState } from "react";
import "./Projectxyz.css";
import line from "../assets/Line 1.png";
import linewhite from "../assets/Line white.png";
import pimg1 from "../assets/pgcil1.png";
import pimg2 from "../assets/pgcil2.png";
// import testxyz from "../assets/Testimonialxyz.png";
import gal1 from "../assets/pgcilgal1.png";
import gal2 from "../assets/pgcilgal2.png";
import gal3 from "../assets/pgcilgal3.png";
import gal4 from "../assets/pgcilgal4.png";
import gal5 from "../assets/pgcilgal5.png";
import gal6 from "../assets/pgcilgal6.png";
import gal7 from "../assets/pgcilgal7.png";
import gal8 from "../assets/pgcilgal8.png";
import gal9 from "../assets/pgcilgal9.png";
import gal10 from "../assets/pgcilgal10.png";
import BuildProject from "./common/BuildProject";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleproject } from "./features/actions/projectAction";

function ProjectsNew() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleData } = useSelector((state) => state?.getProject);
  const [tempImage, setTempImage] = useState([]);
  

  useEffect(() => {
    dispatch(fetchSingleproject(id));
  }, []);

  useEffect(() => {
    setTempImage(singleData?.data?.propertyGallery);
  }, [singleData]);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // completion data
  const completionDate= new Date(singleData?.data?.completionDate)
  const formateDateCompletion= completionDate.toLocaleDateString(undefined, options);
  // console.log(singleData?.data)



// stART DATE
  const date= new Date(singleData?.data?.startingDate)
// const options = { year: 'numeric', month: 'short', day: 'numeric' };
const formateDate= date.toLocaleDateString(undefined, options);
// console.log(formateDate)

  return (
    <div id="projectxyz">
      <div
        className="projectheroimg"
        id="projpgcil"
        style={{
          backgroundImage: `url('${singleData?.data?.heroImg[0]}')`,
        }}
      >
        <div className="heronavproj">{"Home"> "PROJECTS > PGCIL CAMPUS"}</div>
        <div className="projectheading">
          <div className="projecttype">
            institutional
            <img src={linewhite} alt="" />
          </div>
          <div className="projectname">{singleData?.data?.name}</div>
        </div>
      </div>

      <div className="projectdetails">
        <div className="projecttoptext">
          Project Details
          <img src={line} alt="" />
        </div>
        <div className="projectdetailstext left">
          <p>
            {/* <strong>Client:</strong> */}
            {singleData?.data?.client && (<p><strong>Client: </strong>{singleData?.data?.client}</p>)}
          </p>
          <p>
            {/* <strong>Location:</strong> */}
            {
              (singleData?.data?.location?.city || singleData?.data?.location?.state || singleData?.data?.location?.country) && <p><strong>Location: </strong>{singleData?.data?.location?.city},{singleData?.data?.location?.state}, {singleData?.data?.location?.country}</p>
            }
        
          </p>
          <p>
            {/* <strong>Built-up Area:</strong> */}
            {singleData?.data?.buildUpArea && <p><strong>Built-up Area: </strong>{singleData?.data?.buildUpArea}</p>}
          </p>
        </div>
        <div className="projectdetailstext right">
          <p>
            
            <strong>  {formateDate && "Start Date: "+formateDate } </strong>
          </p>
          <p>
            <strong>{formateDateCompletion && "Completion Date: "+ formateDateCompletion }</strong>
          </p>
          <p>
            {/* <strong>Sustainable Accreditation:</strong> */}
            {singleData?.data?.sustainableAccreditation && <p><strong>Sustainable Accreditation: </strong>{singleData?.data?.sustainableAccreditation}</p> }
          </p>
        </div>
      </div>
      <div className="pimg">
        <img
          src={singleData?.data?.picOne[0]}
          alt=""
          className="projectimg"
        />
      </div>
      <div className="projtext">
        <p>{singleData?.data?.description}</p>
      </div>
      <div className="pimg">
        <img
          src={singleData?.data?.picTwo[0]}
          alt=""
          className="projectimg"
        />
      </div>
      <div className="projtext" id="text2">
        <p>{singleData?.data?.concept}</p>
      </div>
      {/* <div id="testimonialxyz">
        <img src={testxyz} alt="" />
      </div>
      <div id="concept">
        <div id="concepttoptext">
          <div className="projecttoptext">
            Concept
            <img src={line} alt="" />
          </div>
        </div>
        <div className="cimg">
          <img src={concept} alt="Concept" />
        </div>
        <div className="concepttext">
          <p>
            Established in 2001 as a Private Limited Company, KlimArt prides
            itself in being one of its kind of Architecture, Urban Planning and
            Interiors firm which provides end-to-end solution in terms of design
            and project management. Established in 2001 as a Private Limited
            Company, KlimArt prides itself in being one of its kind of
            Architecture, Urban Planning and Interiors firm which provides
            end-to-end solution in terms of design and project management.
          </p>
        </div>
      </div> */}
      <div id="galary">
        <div
          style={{ marginBottom: "2rem", paddingLeft: "7rem" }}
          className="projecttoptext"
        >
          Gallery
          <img src={singleData?.data?.heroImg[0]} alt="" />
        </div>
        {/* <Gallery images={singleData?.data?.propertyGallery}/> */}
        <Gallery images={tempImage} />
      </div>
      <section className="buildProjects">
        <BuildProject />
      </section>
    </div>
  );
}

// const images = [chairs, pimg1, chairs, chairs, chairs, chairs];
// const images = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10];
const Gallery = ({ images }) => {
  const [currIdx, setCurrIdx] = useState(0);

  return (
    <section id="galary_carousel">
      <div className="galary_wrapper">
        <div className="big_img">
          <LazyLoadImage
            src={`${
              Array.isArray(images) && images.length > 0
                ? images[currIdx]
                : ""
            }`}
            alt=""
          />
        </div>
        <div className="scroll_img">
          {images?.map((img, i) => (
            <img
              className={currIdx === i ? "galary_img_selected" : ""}
              src={img}
              onClick={() => setCurrIdx(i)}
              alt=""
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsNew;
