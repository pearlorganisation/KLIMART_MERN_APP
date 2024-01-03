import { Link } from "react-router-dom";
import {
  FaUserCog,
  FaUserAlt,
  FaWpforms,
  FaBlog,
  FaProjectDiagram,
  FaTable,
  FaGlobe,
} from "react-icons/fa";
import { logout } from "../../../features/actions/authenticationActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clearReduxStoreData } from "../../../features/slices/authenticationSlices";
import { confirmAlert } from "react-confirm-alert";
import { ImHome } from "react-icons/im";

import { FaHandshake } from "react-icons/fa";
import { BsBuildingsFill, BsFillPencilFill, BsFillTelephoneFill } from "react-icons/bs";
import { SiPowerpages } from "react-icons/si";
import { AiFillTags, AiOutlinePhone  } from "react-icons/ai";
import {IoMdContacts} from 'react-icons/io'
import { BsFillClipboard2Fill } from "react-icons/bs";
import { BiGitBranch, BiLabel } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { useContext } from "react";
import AppContext from "../../../features/ContextApi/ContextForProjects";
import axios from "axios";
import { instance } from "../../../services/axiosInstance";

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    isUserLoggedIn,
    loggedInUserData,
    logoutSuccessMessage,
    isSuccess,
    isLoading,
  } = useSelector((state) => state.authentication);

  const { opensidebar, setOpenSidebar } = useContext(AppContext);

  const location = useLocation();
  const [active, setActive] = useState();

  const { pathname } = useLocation();

  const [imageForView, setImageForView] = useState([]);
  const [aboutSectionData, setAboutSectionData] = useState([]);

  const [homeSectionData, setHomeSectionData] = useState([]);

  const [careerSectionData, setCareerSectionData] = useState([]);

  const [blogPageSectionData , setBlogPageSectionData] = useState([])

  const [valuesProvidedSecData , setValuesProvidedSecData] = useState([])

  // This method is used to handle Logout.
  const handleLogout = () => {
    dispatch(logout());
  };
  console.log(
    logoutSuccessMessage,
    " ",
    isSuccess,
    " ",
    isUserLoggedIn,
    "Checking for error messages"
  );

  useEffect(() => {
    if (location.pathname === "/reset-password") {
      setActive("");
    }
  }, [location]);

  useEffect(() => {
    if (logoutSuccessMessage !== "" && isSuccess && !isUserLoggedIn) {
      dispatch(clearReduxStoreData());
      navigate("/");
    }
  }, [logoutSuccessMessage, isSuccess, isUserLoggedIn]);

  // about page

  const handleGetAllData = async () => {
    try {
      const { data } = await instance.get("/aboutpage", {
        withCredentials: true,
      });

      console.log("response", data?.data);

      setAboutSectionData(data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);
  // console.log("imageForView@@@",imageForView)
  // console.log("aboutSectionData",aboutSectionData)

  // home page

  const handleGetDataOfHomePage = async () => {
    try {
      const { data } = await instance.get("/homepage", {
        withCredentials: true,
      });

      console.log("response", data?.data);

      setHomeSectionData(data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleGetAllCareerAndContact = async()=>{
    try {
      const { data } = await instance.get("/careerpage", {
        withCredentials: true,
      });

      console.log("response", data?.data);

      setCareerSectionData(data?.data);
    } catch (err) {
      console.log("err", err);
    }

  }
  const getAllDataFromBlogPage = async()=>{
 try {
      const { data } = await instance.get("/blogpage", {
        withCredentials: true,
      });

      console.log("response", data?.data);

      setBlogPageSectionData(data?.data);
    } catch (err) {
      console.log("err", err);
    }
  }
  const getAllDataFromValuesProvider = async()=>{
    try {
      const { data } = await instance.get("/valuesProvided", {
        withCredentials: true,
      });

      console.log("response", data?.data);

      setValuesProvidedSecData(data?.data);
    } catch (err) {
      console.log("err", err);
    }

    
  }

  useEffect(() => {
    handleGetDataOfHomePage();
    handleGetAllCareerAndContact();
    getAllDataFromBlogPage()
    getAllDataFromValuesProvider()
    
  }, []);

  return (
    <>
      <div
        className={`main-sidebar ${
          opensidebar ? "width-increase" : "main-sidebar1"
        }`}
      >
        <div className="header-sidebar bg-light">
          <span className="bg-light"></span>
        </div>
        <div className="main-menu">
          <ul
            className="sidebar-menu scrollable"
            style={{ overflow: "scroll" }}
          >
            <li className="sidebar-item">
              {/* <Link
                type="button"
                className="sidebar-link-group-title has-sub"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Authentication
              </Link> */}
              <ul className="sidebar-link-group collapse show" id="collapseOne">
                {/* <li className="sidebar-dropdown-item">
                  <Link
                    // to="/"
                    className="sidebar-link"
                    title="Logout"
                  >
                    <span className="nav-icon">
                      <FaUserCog />
                    </span>
                    <span
                      className="sidebar-txt"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </span>
                  </Link>
                </li> */}
                {/* <li className="sidebar-dropdown-item">
                  <Link to="/registration" className="sidebar-link" title="Registration">
                    <span className="nav-icon">
                      <FaUserCog />
                    </span>
                    <span className="sidebar-txt">Registration</span>
                  </Link>
                </li> */}
                {/* <li className="sidebar-dropdown-item">
                  <Link
                    to="/reset-password"
                    className="sidebar-link"
                    title="Reset Password"
                  >
                    <span className="nav-icon">
                      <FaUserCog />
                    </span>
                    <span className="sidebar-txt">Reset Password</span>
                  </Link>
                </li> */}
                {/* <li className="sidebar-dropdown-item">
                  <Link to="/update-password" className="sidebar-link"
                  title="Update Password">
                    <span className="nav-icon">
                      <FaUserCog />
                    </span>
                    <span className="sidebar-txt">Update Password</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <li className="sidebar-item">
              <Link
                role="button"
                className="sidebar-link-group-title has-sub"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                User
              </Link>
              <ul className="sidebar-link-group" id="collapseTwo">
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/users"
                    className="sidebar-link"
                    title="View Profile"
                  >
                    <span className="nav-icon">
                      <FaUserAlt />
                    </span>
                    <span className="sidebar-txt">View Profile</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/edit-user"
                    className="sidebar-link"
                    title="Edit Profile"
                  >
                    <span className="nav-icon">
                      <FaUserAlt />
                    </span>
                    <span className="sidebar-txt">Edit Profile</span>
                  </Link>
                </li>
              </ul>
            </li> */}
            <li className="sidebar-item">
              {/* <Link
                role="button"
                className="sidebar-link-group-title has-sub"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                Components
              </Link> */}
              <ul className="sidebar-link-group" id="collapseThree">
                {/* <li className="sidebar-item open">
                  <ul className="sidebar-link-group"></ul>
                </li> */}
                <li className="sidebar-dropdown-item ">
                  <Link
                    to="/"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                    className={`sidebar-link d-flex align-items-center ${
                      location.pathname === "/" ? "active1" : ""
                    }`}
                    title="Dashboard"
                  >
                    <span className="nav-icon">
                      <ImHome
                        fill={
                          location.pathname === "/" ? "white" : "black"
                        }
                      />{" "}
                    </span>
                    <span className="sidebar-txt">Dashboard</span>
                  </Link>
                </li>
             

                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div  class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button
                      style={{transform:'translateX(-1rem)'}}
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                      <span className="nav-icon px-2">
                      <ImHome/>
                    </span>
                        Home Page

                        
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      {Array.isArray(homeSectionData) &&
                        homeSectionData.length > 0 &&
                        homeSectionData?.map((item, index) => {
                          return (
                            <div class="accordion-body">
                              <Link
                                to={`/HomePageSec/${item._id}/${index + 1}`}
                                style={{ color: "#000" }}
                              >
                                Section {index + 1}
                              </Link>
                              
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                        
                        style={{transform:'translateX(-1rem)'}}
                      >
                        <span className="nav-icon px-2">
                      {/* <ImHome/> */}
                      <i class="fa-solid fa-address-card"></i>
                    </span>
                        About Page
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo"
                      data-bs-parent="#accordionFlushExample"
                    >
                      {Array.isArray(aboutSectionData) &&
                        aboutSectionData.length > 0 &&
                        aboutSectionData?.map((item, index) => {
                          return (
                            <div class="accordion-body">
                              <Link
                                to={`/AboutPageSec/${item._id}/${index + 1}`}
                                style={{ color: "#000" }}
                              >
                                Section {index + 1}
                              </Link>
                            </div>
                          );
                        })}

                    </div>
                  </div>



                  {/* ===== career page  */}
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                        
                        style={{transform:'translateX(-1rem)'}}
                      >
                        <span className="nav-icon px-2">
                      {/* <ImHome/> */}
                      <i class="fa-solid fa-arrow-up-right-dots"></i>
                    </span>
                        Career Page 
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      {Array.isArray(careerSectionData) &&
                        careerSectionData.length > 0 &&
                        careerSectionData?.map((item, index) => {
                          return (
                            <div class="accordion-body">
                              <Link
                                to={`/CareerPageSec1/${item._id}/${index + 1}`}
                                style={{ color: "#000" }}
                              >
                                Section {index + 1}
                              </Link>
                            </div>
                          );
                        })}

                    
                    </div>
                  </div>

                  {/* blog Page */}

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFour">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                        
                        style={{transform:'translateX(-1rem)'}}
                      >
                        <span className="nav-icon px-2">
                      {/* <ImHome/> */}
                      <i class="fa-brands fa-blogger"></i>
                      
                    </span>
                        Blog Page
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingFour"
                      data-bs-parent="#accordionFlushExample"
                    >
                      {Array.isArray(blogPageSectionData) &&
                        blogPageSectionData.length > 0 &&
                        blogPageSectionData?.map((item, index) => {
                          return (
                            <div class="accordion-body">
                              <Link
                                to={`/blogPageSec/${item._id}/${index + 1}`}
                                style={{ color: "#000" }}
                              >
                                Section {index + 1}
                              </Link>
                            </div>
                          );
                        })}

                    </div>
                  </div>


                  {/* ------------------ */}

                  {/* Values Provider */}
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFive">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFive"
                        aria-expanded="false"
                        aria-controls="flush-collapseFive"
                        
                        style={{transform:'translateX(-1rem)'}}
                      >
                        <span className="nav-icon px-2">
                      {/* <ImHome/> */}
                      <i class="fa-solid fa-v"></i>
                    </span>
                       ValuesProvided
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingFive"
                      data-bs-parent="#accordionFlushExample"
                    >
                      {Array.isArray(valuesProvidedSecData) &&
                        valuesProvidedSecData?.length > 0 &&
                        valuesProvidedSecData?.map((item, index) => {
                          return (
                            <div class="accordion-body">
                              <Link
                                to={`/valuesProvidedSec/${item._id}/${index + 1}`}
                                style={{ color: "#000" }}
                              >
                                Section {index + 1}
                              </Link>
                            </div>
                          );
                        })}

                    </div>
                  </div>

                  {/* <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                        style={{transform:'translateX(-1rem)'}}
                        >
                          <span className="nav-icon px-2">
                        <ImHome/>
                      </span>
                        Career Page
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <Link to="/CareerPageSec1" style={{ color: "#000" }}>
                          Section 1
                        </Link>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* ================================= */}


                
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/clientelle"
                    className={`sidebar-link ${
                      location.pathname === "/clientelle" ? "active1" : ""
                    }`}
                    title="clientelle"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                   
                    <i class="fa-solid fa-l" fill={
                          location.pathname === "/clientelle" ? "white" : "black"
                        }></i>
                      {/* <IoMdContacts
                        fill={
                          location.pathname === "/clientelle" ? "white" : "black"
                        }
                      /> */}
                    </span>
                    <span className="sidebar-txt">Logo</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/CurrentVacancies"
                    className={`sidebar-link ${
                      location.pathname === "/CurrentVacancies" ? "active1" : ""
                    }`}
                    title="CurrentVacancies"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      
                    <i class="fa-solid fa-users" fill={
                          location.pathname === "/CurrentVacancies" ? "white" : "black"
                        }></i>
                      {/* <IoMdContacts
                        fill={
                          location.pathname === "/CurrentVacancies" ? "white" : "black"
                        }
                      /> */}
                    </span>
                    <span className="sidebar-txt">CurrentVacancies</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/KlimART"
                    className={`sidebar-link ${
                      location.pathname === "/KlimART" ? "active1" : ""
                    }`}
                    title="KlimART"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                    <i class="fa-regular fa-building"    fill={
                          location.pathname === "/KlimART" ? "white" : "black"
                        }></i>
                      {/* <IoMdContacts
                        fill={
                          location.pathname === "/KlimART" ? "white" : "black"
                        }
                      /> */}
                    </span>
                    <span className="sidebar-txt">KlimART</span>
                  </Link>
                </li>



                <li className="sidebar-dropdown-item">
                  <Link
                    to="/headQuarter"
                    className={`sidebar-link ${
                      location.pathname === "/headQuarter" ? "active1" : ""
                    }`}
                    title="headQuarter"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BsBuildingsFill
                        fill={
                          location.pathname === "/headQuarter"
                            ? "white"
                            : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Headquarter</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/employee"
                    className={`sidebar-link ${
                      location.pathname === "/employee" ? "active1" : ""
                    }`}
                    title="employee"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <IoMdContacts
                        fill={
                          location.pathname === "/employee" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Employee</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/branch"
                    className={`sidebar-link ${
                      location.pathname === "/branch" ? "active1" : ""
                    }`}
                    title="branch"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BiGitBranch
                        fill={
                          location.pathname === "/branch" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Branch</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/get-in-touch"
                    className={`sidebar-link ${
                      location.pathname === "/get-in-touch" ? "active1" : ""
                    }`}
                    title="Get In Touch"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <FaHandshake
                        fill={
                          location.pathname === "/get-in-touch"
                            ? "white"
                            : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Get In Touch</span>
                  </Link>
                </li>
                {/* <li className="sidebar-dropdown-item">
                  <Link
                    to="/pages"
                    className={`sidebar-link ${
                      location.pathname === "/pages" ? "active1" : ""
                    }`}
                    title="Pages"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <SiPowerpages
                        fill={
                          location.pathname === "/pages" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Pages</span>
                  </Link>
                </li> */}

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/tags"
                    className={`sidebar-link ${
                      location.pathname === "/tags" ? "active1" : ""
                    }`}
                    title="Tags"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <AiFillTags
                        fill={location.pathname === "/tags" ? "white" : "black"}
                      />
                    </span>
                    <span className="sidebar-txt">Tags</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/blog"
                    className={`sidebar-link ${
                      location.pathname === "/blog" ? "active1" : ""
                    }`}
                    title="Blogs"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BsFillPencilFill
                        fill={location.pathname === "/blog" ? "white" : "black"}
                      />
                    </span>
                    <span className="sidebar-txt">Blogs</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/types"
                    // onClick={() => {
                    //   setActive("types");
                    // }}
                    className={`sidebar-link ${
                      location.pathname === "/types" ? "active1" : ""
                    }`}
                    // className="sidebar-link"
                    title="Types"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BiLabel
                        fill={
                          location.pathname === "/types" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Types</span>
                  </Link>
                </li>

                <li className="sidebar-dropdown-item">
                  <Link
                    to="/projects"
                    // className="sidebar-link"
                    title="Projects"
                    // onClick={() => {
                    //   setActive("project");
                    // }}
                    className={`sidebar-link ${
                      location.pathname === "/projects" ? "active1" : ""
                    }`}
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BsFillClipboard2Fill
                        fill={
                          location.pathname === "/projects" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Projects</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/tables"
                    // className="sidebar-link"
                    // onClick={() => {
                    //   setActive("career");
                    // }}
                    className={`sidebar-link ${
                      location.pathname === "/tables" ? "active1" : ""
                    }`}
                    title="Tables"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <GiGraduateCap
                        fill={
                          location.pathname === "/tables" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Career</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link
                    to="/contact"
                    // className="sidebar-link"
                    // onClick={() => {
                    //   setActive("contact");
                    // }}
                    className={`sidebar-link ${
                      location.pathname === "/contact" ? "active1" : ""
                    }`}
                    title="Tables"
                    onClick={() => {
                      // setActive("dashboard");
                      setOpenSidebar(false);
                    }}
                  >
                    <span className="nav-icon">
                      <BsFillTelephoneFill
                        fill={
                          location.pathname === "/contact" ? "white" : "black"
                        }
                      />
                    </span>
                    <span className="sidebar-txt">Contact</span>
                  </Link>
                </li>
                {/* <li className="sidebar-dropdown-item">
                  <a
                    href="https://development.pearl-developer.com/mern/klimart"
                    target="_blank"
                    className="sidebar-link site-view-btn"
                    style={{
                      color: "#fe5502",
                      boxShadow: "0px 0px 4px lightgray",
                    }}
                  >
                    <span className="nav-icon">
                      <FaGlobe style={{ color: "#fe5502", fontSize: "18px" }} />
                    </span>
                    <span className="sidebar-txt">View Website</span>
                  </a>
                </li> */}
              </ul>
            </li>

            {/* <li className="help-center">
              <h3>Help Center</h3>
              <p>We are an award-winning, forward thinking</p>
              <Link
                to="https://www.pearlorganisation.com/"
                target="_blank"
                className="btn btn-sm btn-light"
              >
                Go to Help Center
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
