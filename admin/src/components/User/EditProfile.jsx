import { useState } from "react";
import Avatar from "../../assets/images/man.png";
import axios from "axios";
import {
  FaRegUser,
  FaFacebookF,
  FaTwitter,
  FaGoogle ,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRegEnvelope,
  FaRegCheckCircle,
  FaPhoneAlt,
  FaGlobe,
  FaCamera,
  FaUnlockAlt,
} from "react-icons/fa";
import { instance } from "../../services/axiosInstance";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [updateProfile, setUpdateProfile] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // handleProfileUpdate()
    handleDefaultProfile();
    
  }, []);
  const handleProfileUpdate = async (e) => {
    try{
      e.preventDefault();
      console.log("updateProfile", updateProfile);
      const response = await instance.put(
        "/auth/updatedetails",
        updateProfile,
        { withCredentials: true }
      );
      console.log("response updateDetails ::::::::: ", response.data.data);
      
      toast.success("profile is updated successfully");
      
     navigate("/users");
      // setUpdateProfile(response.data.data)
    }
    catch(err){
      toast.error(err)
      console.log("err",err)
    }

  };
  const handleDefaultProfile = async () => {
    try{
      const response = await axios.get("https://klimart-jl1e.onrender.com/api/v1/auth/me", { withCredentials: true });
      console.log("response default profile", response.data.data);
      setUpdateProfile(response.data.data);
    }
    catch(err){
      toast.error(err)
      console.log(err)
    }
    
  };
  // console.log("updateProfile:::::::::::::::::",updateProfile)
  const handleChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };
  // console.log("updateProfile:::::::::::::::::", updateProfile);
  return (
    <>
      <div className="main-content">
        <div className="dashboard-breadcrumb mb-30">
          <h2 className="text-dark">Edit Profile</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="panel">
              <div className="panel-header">
                <nav>
                  <div
                    className="btn-box d-flex flex-wrap gap-1"
                    id="nav-tab"
                    role="tablist"
                  >
                    {/* <button
                      className="btn btn-sm btn-outline-primary active"
                      id="nav-edit-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-edit-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-edit-profile"
                      aria-selected="true"
                    >
                      Edit Profile
                    </button> */}
                    {/* <button
                      className="btn btn-sm btn-outline-primary"
                      id="nav-change-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-change-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-change-password"
                      aria-selected="false"
                    >
                      Change Password
                    </button> */}
                  </div>
                </nav>
              </div>
              <div className="panel-body">
                <div
                  className="tab-content profile-edit-tab"
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="nav-edit-profile"
                    role="tabpanel"
                    aria-labelledby="nav-edit-profile-tab"
                  >
                    <form>
                      <div className="profile-edit-tab-title">
                        <h6>Public Information</h6>
                      </div>
                      <div className="public-information mb-30">
                        <div className="row g-4">
                          <div className="col-md-3">
                            <div className="admin-profile">
                              <div className="image-wrap">
                                <div className="part-img rounded-circle overflow-hidden">
                                  <img src={Avatar} alt="admin" />
                                </div>
                                <button className="image-change">
                                  <FaCamera
                                    type="file"
                                    style={{ color: "white" }}
                                  />
                                </button>
                              </div>
                              {[updateProfile]?.map((item)=>{
                                // console.log("item@@@",item)
                                return(
                                  <>
                                    <span className="admin-name text-dark">
                                {item.name}
                              </span>
                              <span className="admin-role">
                                {item.role}
                              </span>
                                  </>
                                )
                              })}
                            
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="row g-3">
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    {/* <i className="fa-light fa-user" /> */}
                                    <FaRegUser />
                                  </span>
                                  <input
                                    type="text"
                                    name="name"
                                    value={updateProfile?.name}
                                    className="form-control"
                                    placeholder="Full Name"
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    // defaultValue="Mitchell C. Shay"
                                  />
                                </div>
                              </div>
                              {/* <div className="col-sm-6">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="fa-light fa-at" />
                                    <FaRegEnvelope />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    defaultValue="@mitchellc"
                                  />
                                </div>
                              </div> */}
                              <div className="col-12">
                                <textarea
                                  className="form-control h-150-p"
                                  placeholder="Description"
                                  name="description"
                                  value={updateProfile?.description}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  // defaultValue={
                                  //   "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
                                  // }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile-edit-tab-title">
                        <h6>Private Information</h6>
                      </div>
                      <div className="private-information mb-30">
                        <div className="row g-3">
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-user" /> */}
                                <FaRegUser />
                              </span>
                              <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                value={updateProfile?.username}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                // defaultValue="1D233"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-user" /> */}
                                <FaRegUser />
                              </span>
                              <input
                                type="text"
                                name="role"
                                className="form-control"
                                placeholder="Role"
                                value={updateProfile?.role}
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}
                                // defaultValue="1D233"
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-4 col-sm-6">
                            <div className="input-group flex-nowrap">
                              <span className="input-group-text">
                                <i className="fa-light fa-user-tie" />
                                <FaRegUser />
                              </span>
                              <select
                                className="form-control select-search"
                                data-placeholder="Role"
                              >
                                <option value>Role</option>
                                <option value={0}>Admin</option>
                                <option value={1}>Manager</option>
                                <option value={2}>Project Manager</option>
                                <option value={3}>Managing Director</option>
                                <option value={4}>Chairman</option>
                                <option value={5} selected>
                                  Graphic Designer
                                </option>
                              </select>
                            </div>
                          </div> */}
                          {/* <div className="col-md-4 col-sm-6">
                            <div className="input-group flex-nowrap">
                              <span className="input-group-text">
                                <i className="fa-light fa-circle-check" />
                                <FaRegCheckCircle />
                              </span>
                              <select
                                className="form-control"
                                data-placeholder="Status"
                              >
                                <option value>Status</option>
                                <option value={0} selected>
                                  Enable
                                </option>
                                <option value={1}>Disable</option>
                              </select>
                            </div>
                          </div> */}
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-envelope" /> */}
                                <FaRegEnvelope />
                              </span>
                              <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={updateProfile?.email}
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}

                                // defaultValue="example@mail.com"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-phone" /> */}
                                <FaPhoneAlt />
                              </span>
                              <input
                                type="tel"
                                name="mobile"
                                className="form-control"
                                placeholder="Phone"
                                // defaultValue="+0 123 456 789"
                                value={updateProfile?.mobile}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-light fa-globe" />
                                <FaGlobe />
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Website"
                                defaultValue="https://themeforest.net/"
                              />
                            </div>
                          </div> */}
                          <div className="col-12">
                            <textarea
                              className="form-control h-100-p"
                              name="address"
                              placeholder="Address"
                              value={updateProfile?.address}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              // defaultValue={"California, United States"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="profile-edit-tab-title">
                        <h6>Social Information</h6>
                      </div>
                      <div className="social-information">
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-facebook-f" />
                                 */}
                                <FaFacebookF />
                              </span>
                              <input
                                type="text"
                                name="fb"
                                className="form-control"
                                placeholder="Facebook"
                                value={updateProfile?.fb}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                // defaultValue="https://www.facebook.com/"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-twitter" /> */}
                                <FaTwitter />
                              </span>
                              <input
                                type="text"
                                name="twitter"
                                className="form-control"
                                placeholder="Twitter"
                                // defaultValue="https://twitter.com/"
                                value={updateProfile.twitter}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-brands fa-linkedin-in" />
                                <FaLinkedinIn />
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Linkedin"
                                defaultValue="https://www.linkedin.com/"
                              />
                            </div>
                          </div> */}
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-instagram" /> */}
                                <FaInstagram />
                              </span>
                              <input
                                type="text"
                                name="insta"
                                className="form-control"
                                placeholder="Instagram"
                                // defaultValue="https://www.instagram.com/"
                                value={updateProfile?.insta}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          {/* <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-brands fa-youtube" />
                                <FaYoutube />
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Youtube"
                                defaultValue="https://www.youtube.com/"
                              />
                            </div>
                          </div> */}
                          <div className="col-12">
                            <button
                              className="btn btn-primary"
                              onClick={handleProfileUpdate}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-change-password"
                    role="tabpanel"
                    aria-labelledby="nav-change-password-tab"
                  >
                    {/* <form>
                      <div className="profile-edit-tab-title">
                        <h6>Change Password</h6>
                      </div>
                      <div className="social-information">
                        <div className="row g-3">
                          <div className="col-12">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-light fa-lock" />
                                <FaUnlockAlt/>
                              </span>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Current Password"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-light fa-lock" />
                                <FaUnlockAlt/>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="New Password"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-light fa-lock" />
                                <FaUnlockAlt/>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary" onClick={handleProfileUpdate}>
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form> */}
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

export default EditProfile;