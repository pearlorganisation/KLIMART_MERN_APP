import React, { useEffect, useState } from "react";
import { instance } from "../services/axiosInstance";
import "./Dashboard.css";
import { FaHandshake } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { SiEightsleep, SiPowerpages } from "react-icons/si";
import { AiFillTags, AiOutlinePhone } from "react-icons/ai";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { BiGitBranch, BiLabel } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "react-lottie";
import animation from "../Lottie/Loader.json";
import { IoMdContacts } from "react-icons/io";

const Dashboard = () => {
  const [getInTouch, setGetInTouch] = useState();
  const [pages, setPages] = useState();
  const [tags, setTags] = useState();
  const [types, setTypes] = useState();
  const [projects, setProjects] = useState();
  const [career, setCareer] = useState();
  const [contact, setcontact] = useState();
  const [blogs, setBlogs] = useState();
  const [branch, setBranch] = useState();
  const [employee, setEmployee] = useState();
  const [clientelle , setClientelle] = useState()
  const [currentVacancies , setCurrentVacancies] = useState()
 

  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: { loading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    blogLength();
    getInTouchLength();
    pagesLength();
    projectsLength();
    careerLength();
    contactLength();
    tagsLength();
    typeLength();
    branchLength();
    EmployeeLength()
    clientelleLength()
    currentVacanciesLength()
    
  }, []);
  const clientelleLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/clientelle", { withCredentials: true });
      setLoading(false);
      setClientelle(res.data.data.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }; 



  const branchLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/branch", { withCredentials: true });
      setLoading(false);
      setBranch(res.data.data.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }; 

  
  const EmployeeLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/employee", { withCredentials: true });
      setLoading(false);
      setEmployee(res.data.data.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }; 

  
  const currentVacanciesLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/currentVacancies", { withCredentials: true });
      setLoading(false);
      setCurrentVacancies(res.data.data.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }; 

  const blogLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/blog", { withCredentials: true });
      setLoading(false);
      setBlogs(res.data.blog.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  const getInTouchLength = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/getInTouch", {
        withCredentials: true,
      });
      setLoading(false);

      setGetInTouch(response.data.data.length);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  const pagesLength = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/pages", { withCredentials: true });

      setLoading(false);

      setPages(res.data.page.length);
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  };

  const projectsLength = async () => {
    setLoading(true);
    try {
      const {
        data: { Project },
        status,
      } = await instance.get("/projects", {
        withCredentials: true,
      });
      if (status === 200) {
        setProjects(Project.length);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const careerLength = async () => {
    setLoading(true);

    try {
      const res = await instance.get("/career");
      if (res.status) {
        setCareer(res.data.data.length);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const contactLength = async () => {
    setLoading(true);

    try {
      const res = await instance.get("/contact", { withCredentials: true });

      if (res.status) {
        setcontact(res.data.data.length);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const tagsLength = async () => {
    setLoading(true);

    try {
      const response = await instance.get("/tag", { withCredentials: true });
      setTags(response.data.Tags.length);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  const typeLength = async () => {
    setLoading(true);

    try {
      const response = await instance.get("/types", { withCredentials: true });
      setTypes(response.data.data.length);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="container">
        <div className="row g-6 mb-6 mt-4">
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Budget
                    </span>
                    <span className="h3 font-bold mb-0">$750.90</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-primary-subtle text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      <BsCreditCard />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    <BsArrowUp />
                    13%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      New projects
                    </span>
                    <span className="h3 font-bold mb-0">215</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-primary text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      <BsFillPeopleFill />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    <BsArrowUp />
                    30%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Total hours
                    </span>
                    <span className="h3 font-bold mb-0">1.400</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-info text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      <BsClockHistory />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-danger-subtle text-danger me-2">
                    <BsArrowDown />
                    -5%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 my-2">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Work load
                    </span>
                    <span className="h3 font-bold mb-0">95%</span>
                  </div>
                  <div className="col-auto">
                    <div
                      className="icon icon-shape bg-warning text-white text-lg rounded-circle"
                      style={{ padding: "10px", fontSize: "20px" }}
                    >
                      <BsFillCartCheckFill />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-info-subtle text-success me-2">
                    <BsArrowUp />
                    10%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {loading ? (
        <>
          <>
            <div className="h-100 d-flex justify-content-center align-items-center flex-column">
              <Lottie
                options={defaultOptions}
                height={120}
                width={120}
                // style={{ stroke: "orangered" }}
                className="loader-prog"
              />
              <p>Loading...</p>
            </div>
          </>
        </>
      ) : (
        <>
          <div id="root">
            <div class="container pt-5">
              <div class="row align-items-stretch">
              <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/clientelle")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                    Logo
                      {/* <i class="fa-light fa-handshake"></i> */}
                      {/* <FaHandshake /> */}
                      <i class="fa-solid fa-l"></i>
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {clientelle}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/get-in-touch")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Get In Touch
                      {/* <i class="fa-light fa-handshake"></i> */}
                      <FaHandshake />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {getInTouch}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/blog")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading w-100 d-flex justify-content-between align-items-center heading5 hind-font medium-font-weight c-dashboardInfo__title">
                      Blogs
                      <BsFillPencilFill />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {blogs}
                    </span>
                  </div>
                </div>
                {/* <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/pages")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Pages
                      <SiPowerpages />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {pages}
                    </span>
                  </div>
                </div> */}
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/branch")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Branch
                      <BiGitBranch />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {branch}
                    </span>
                  </div>
                </div>
                
              
              </div>
              <div class="row align-items-stretch mt-4">
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/projects")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Projects
                      <BsFillClipboard2Fill />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {projects}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/tables")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Career
                      <GiGraduateCap />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {career}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/contact")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Contact
                      <AiOutlinePhone />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {contact}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/employee")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Employee
                      <IoMdContacts />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {employee}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/currentVacancies")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                    Current Vacancies
                    <i class="fa-solid fa-users"></i>
                      {/* <IoMdContacts /> */}
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {currentVacancies}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/tags")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex align-items-center justify-content-between hind-font medium-font-weight c-dashboardInfo__title">
                      Tags
                      <AiFillTags />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {tags}
                    </span>
                  </div>
                </div>
                <div
                  class="c-dashboardInfo col-lg-3 col-md-6"
                  onClick={() => navigate("/types")}
                  style={{ cursor: "pointer" }}
                >
                  <div class="wrap">
                    <h4 class="heading heading5 w-100 d-flex justify-content-between align-items-center hind-font medium-font-weight c-dashboardInfo__title">
                      Types
                      <BiLabel />
                    </h4>
                    <span class="hind-font caption-12 c-dashboardInfo__count">
                      {types}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
