import "../Layout.css";
import Logo from "../../../assets/images/KlimArt Logo - Horizontal Lockup.png"
import { FaBarsStaggered, FaGear } from "react-icons/fa6";
import { FaSearch, FaGlobe } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  FaRegCommentDots,
  FaRegBell,
  FaRegUserCircle,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Avatar from "../../../assets/images/man.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../../features/actions/authenticationActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Hamburger from "hamburger-react";
import AppContext from "../../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import { clearReduxStoreData } from "../../../features/slices/authenticationSlices";
import { confirmAlert } from "react-confirm-alert";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    isUserLoggedIn,
    loggedInUserData,
    logoutSuccessMessage,
    isSuccess,
    isLoading,
    errorMessage,
  } = useSelector((state) => state.authentication);

  const { opensidebar, setOpenSidebar } = useContext(AppContext);
  // const { pathname } = useLocation();

  // This method is used to handle Logout.
  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to Logout?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            dispatch(logout());
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if the user chooses not to delete
          },
        },
      ],
    });
    // dispatch(logout());
  };


  useEffect(() => {
    if (errorMessage && !isUserLoggedIn) {
      dispatch(clearReduxStoreData());
      // toast.success("Logout Successfully", { autoClose: 500 });
    }
  }, [errorMessage, isUserLoggedIn]);

  return (
    <>
      <section className="body-padding body-p-top">
        <div className="header">
          <div className="containe px-2">
            <div className="row g-0 align-items-center">
              <div className="col-xxl-6 col-xl-5 col-lg-4 col-md-6 col-4 d-md-none  d-lg-block d-sm-block d-flex align-items-center gap-20">
                <div className="nav-close-btn">
                  <Hamburger toggled={opensidebar} toggle={setOpenSidebar} />
                </div>
                <div className="main-logo d-lg-block d-none">
                  <div style={{}} className="logo-big">
                    <Link to="/">
                      <img src={Logo} alt="Logo" />
                    </Link>
                  </div>
                  {/* <div className="logo-small">
                  <Link to="!#">
                    <img src={Logo} alt="Logo" />
                  </Link>
                </div> */}
                </div>
              </div>
              <div className="col-md-6 col-4 d-lg-none">
                <div className="mobile-logo">
                  <Link to="/dashboard" className="mobile-logo-link">
                    <img src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
              {/* <div className="col-4 d-lg-none">
                <div className="mobile-logo">
                  <Link to="!#">
                    <img src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div> */}
              <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-6 col-4">
                <div className="header-right-btns d-flex justify-content-end align-items-center">
                  {/* <div className="header-collapse-group">
                    <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                      <form className="header-form">
                        <input
                          type="search"
                          name="search"
                          placeholder="Search..."
                          required
                        />
                        <button type="submit">
                          <FaSearch />
                        </button>
                      </form>
                      <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                        <div className="header-btn-box">
                          <button
                            className="header-btn"
                            id="messageDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FaRegCommentDots />
                            <span className="badge bg-danger">3</span>
                          </button>
                          <ul
                            className="message-dropdown dropdown-menu"
                            aria-labelledby="messageDropdown"
                          >
                            <li>
                              <Link to="#" className="d-flex">
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="msg-txt">
                                  <span className="name">Archer Cowie</span>
                                  <span className="msg-short">
                                    There are many variations of passages of
                                    Lorem Ipsum.
                                  </span>
                                  <span className="time">2 Hours ago</span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="d-flex">
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="msg-txt">
                                  <span className="name">Cody Rodway</span>
                                  <span className="msg-short">
                                    There are many variations of passages of
                                    Lorem Ipsum.
                                  </span>
                                  <span className="time">2 Hours ago</span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="d-flex">
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="msg-txt">
                                  <span className="name">Zane Bain</span>
                                  <span className="msg-short">
                                    There are many variations of passages of
                                    Lorem Ipsum.
                                  </span>
                                  <span className="time">2 Hours ago</span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="show-all-btn">
                                Show all message
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="header-btn-box">
                          <button
                            className="header-btn"
                            id="notificationDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FaRegBell />
                            <span className="badge bg-danger">9+</span>
                          </button>
                          <ul
                            className="notification-dropdown dropdown-menu"
                            aria-labelledby="notificationDropdown"
                          >
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon text-primary">
                                  </span>{" "}
                                  <span className="fw-bold">Archer</span> Likes
                                  your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon text-success">
                                    <i className="fa-solid fa-comment-dots" />
                                  </span>{" "}
                                  <span className="fw-bold">Cody</span>{" "}
                                  Commented on your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon">
                                    <i className="fa-solid fa-share" />
                                  </span>{" "}
                                  <span className="fw-bold">Zane</span> Shared
                                  your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon text-primary">
                                    <i className="fa-solid fa-thumbs-up" />
                                  </span>{" "}
                                  <span className="fw-bold">Christopher</span>{" "}
                                  Likes your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon text-success">
                                    <i className="fa-solid fa-comment-dots" />
                                  </span>{" "}
                                  <span className="fw-bold">Charlie</span>{" "}
                                  Commented on your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="d-flex align-items-center"
                              >
                                <div className="avatar">
                                  <img src={Avatar} alt="image" />
                                </div>
                                <div className="notification-txt">
                                  <span className="notification-icon">
                                    <i className="fa-solid fa-share" />
                                  </span>{" "}
                                  <span className="fw-bold">Jayden</span> Shared
                                  your post
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="show-all-btn">
                                Show all message
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="header-btn fullscreen-btn"
                          id="btnFullscreen"
                        >
                        </button>
                      </div>
                    </div>
                  </div> */}
                  {/* <button className="header-btn header-collapse-group-btn d-lg-none">
                    <HiMiniEllipsisVertical />
                  </button> */}
                  <div className="header-btn-box">
                    <button
                      className="profile-btn"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={Avatar} alt="image" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="profileDropdown"
                    >
                      {/* <li>
                        <div className="dropdown-txt text-center">
                          <p className="mb-0">{loggedInUserData.userDetails.name}</p>
                          <span className="d-block">{loggedInUserData.userDetails.role}</span>
                        </div>
                      </li> */}
                      {/* <li>
                        <Link
                          className="dropdown-item"
                          to="/users"
                        >
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-circle-user" />
                            <FaRegUserCircle />
                          </span>{" "}
                          Profile
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link className="dropdown-item" to="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-circle-question" />
                            <FaQuestionCircle />
                          </span>{" "}
                          Help
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          className="dropdown-item"
                          to="dashboard-edit-profile.html"
                        >
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-gear" />
                            <FaGear />
                          </span>{" "}
                          Settings
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/reset-password"
                          className="dropdown-item"
                          title="Reset Password"
                        >
                          <span className="dropdown-icon">
                            <FaUserCog />
                          </span>
                          Reset Password
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          className="dropdown-item"
                          // to="dashboard-login.html"
                          onClick={() => handleLogout()}
                        >
                          <span className="dropdown-icon">
                            {/* <i className="fa-regular fa-arrow-right-from-bracket" /> */}
                            <FaSignOutAlt />
                          </span>{" "}
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
