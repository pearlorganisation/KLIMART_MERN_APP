import Avatar from "../../assets/images/man.png";
import {
  FaRegUser,
  FaFacebookF,
  FaTwitter,
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

const EditProfile = () => {
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
                    <button
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
                    </button>
                    <button
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
                    </button>
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
                              <span className="admin-name text-dark">
                                Mitchell C. Shay
                              </span>
                              <span className="admin-role">
                                Graphic Designer
                              </span>
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
                                    className="form-control"
                                    placeholder="Full Name"
                                    defaultValue="Mitchell C. Shay"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    {/* <i className="fa-light fa-at" /> */}
                                    <FaRegEnvelope />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    defaultValue="@mitchellc"
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <textarea
                                  className="form-control h-150-p"
                                  placeholder="Biography"
                                  defaultValue={
                                    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
                                  }
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
                                className="form-control"
                                placeholder="Unique ID"
                                defaultValue="1D233"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group flex-nowrap">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-user-tie" /> */}
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
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group flex-nowrap">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-circle-check" /> */}
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
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-envelope" /> */}
                                <FaRegEnvelope />
                              </span>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                defaultValue="example@mail.com"
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
                                className="form-control"
                                placeholder="Phone"
                                defaultValue="+0 123 456 789"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-globe" /> */}
                                <FaGlobe />
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Website"
                                defaultValue="https://themeforest.net/"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <textarea
                              className="form-control h-100-p"
                              placeholder="Address"
                              defaultValue={"California, United States"}
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
                                type="url"
                                className="form-control"
                                placeholder="Facebook"
                                defaultValue="https://www.facebook.com/"
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
                                type="url"
                                className="form-control"
                                placeholder="Twitter"
                                defaultValue="https://twitter.com/"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-linkedin-in" /> */}
                                <FaLinkedinIn />
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Linkedin"
                                defaultValue="https://www.linkedin.com/"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-instagram" /> */}
                                <FaInstagram />
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Instagram"
                                defaultValue="https://www.instagram.com/"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-brands fa-youtube" /> */}
                                <FaYoutube />
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Youtube"
                                defaultValue="https://www.youtube.com/"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary">
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
                    <form>
                      <div className="profile-edit-tab-title">
                        <h6>Change Password</h6>
                      </div>
                      <div className="social-information">
                        <div className="row g-3">
                          <div className="col-12">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-lock" /> */}
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
                                {/* <i className="fa-light fa-lock" /> */}
                                <FaUnlockAlt/>
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="New Password"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <i className="fa-light fa-lock" /> */}
                                <FaUnlockAlt/>
                              </span>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Confirm Password"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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
