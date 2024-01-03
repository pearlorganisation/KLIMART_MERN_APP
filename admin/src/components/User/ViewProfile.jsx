import { Link } from "react-router-dom";
import Avatar from "../../assets/images/man.png";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaRegEdit,
  FaCamera,
} from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { instance } from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    ProfileFun();
  }, []);

  const { isUserLoggedIn, loggedInUserData, isOtpGenerated } = useSelector(
    (state) => state.authentication
  );

  // const { loggedInUserData } = useselector((state) => state.authentication);

  console.log(loggedInUserData);

  const ProfileFun = async () => {
    try {
      let id = loggedInUserData.userDetails._id;

      const res = await axios.get(`https://klimart-jl1e.onrender.com/api/v1/auth/me/${id}`);

      setGetData([...getData, res.data.data]);
    } catch (err) {
      console.log("err", err);
    }
  };
  console.log("getData:::::::::::::", getData);

  return (
    <>
      <div className="main-content">
        <div className="dashboard-breadcrumb mb-30">
          <h2 className="text-dark">View Profile</h2>
        </div>
        <div className="row g-4">
          <div className="col-md-12">
            <div className="panel">
              <div className="panel-body">
                <div className="profile-sidebar">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="profile-sidebar-title">User Information</h5>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-icon btn-outline-primary"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <HiOutlineDotsHorizontal />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-sm dropdown-menu-sm-end">
                        <li>
                          <Link className="dropdown-item" to="/edit-user">
                            <FaRegEdit />
                            Edit Information
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="top">
                    <div className="image-wrap">
                      <div className="part-img rounded-circle overflow-hidden">
                        <img src={Avatar} alt="admin" />
                      </div>
                      <button className="image-change">
                        <FaCamera type="file" style={{ color: "white" }} />
                      </button>
                    </div>
                    <div className="part-txt">
                      {getData?.map((item) => {
                        return (
                          <>
                            <h4 className="admin-name">{item.name}</h4>
                            <span className="admin-role">{item.role}</span>

                            <div className="admin-social">
                              <a href={item.fb} target="_blank">
                                <FaFacebookF />
                              </a>
                              <a href={item.twitter} target="_blank">
                                <FaTwitter />
                              </a>
                              <a href={item.insta} target="_blank">
                                <FaInstagram />
                              </a>
                            </div>
                            {/* <span className="admin-role">Graphic Designer</span> */}
                          </>
                        );
                      })}
                      {/* <h4 className="admin-name">Mitchell C. Shay</h4>*/}
                      {/* <span className="admin-role">Graphic Designer</span>  */}
                      {/* <div className="admin-social">
                        <Link to="#">
                          <FaFacebookF />
                        </Link>
                        <Link to="#">
                          <FaTwitter />
                        </Link>
                        <Link to="#">
                          <FaGoogle />
                        </Link>
                        <Link to="#">
                          <FaInstagram />
                        </Link>
                      </div> */}
                    </div>
                  </div>
                  <div className="bottom">
                    <h6 className="profile-sidebar-subtitle">
                      Communication Info
                    </h6>
                    <ul>
                      {getData?.map((item) => {
                        console.log("item", item);
                        return (
                          <>
                            <li>
                              <span>Full Name:</span>
                              {item.name}
                            </li>
                            <li>
                              <span>Mobile:</span>
                              {item.mobile}
                            </li>
                            <li>
                              <span>Mail:</span>
                              {item.email}
                            </li>
                            <li>
                              <span>Address:</span>
                              {item.address}
                            </li>
                            <li>
                              <span>Joining Date:</span>
                              {item.createdAt}
                            </li>
                            <h6 className="profile-sidebar-subtitle">
                              About Me
                            </h6>
                            <p>{item.description}</p>
                          </>
                        );
                      })}
                      {/* <li>
                        <span>Full Name:</span>Anna Adame
                      </li>
                      <li>
                        <span>Mobile:</span>+(1) 987 65433
                      </li>
                      <li>
                        <span>Mail:</span>example@mail.com
                      </li>
                      <li>
                        <span>Address:</span>California, United States
                      </li> */}
                      {/* <li>
                        <span>Joining Date:</span>24 Nov 2022
                      </li> */}
                    </ul>
                    {/* <h6 className="profile-sidebar-subtitle">About Me</h6> */}
                    {/* <p>
                      It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
