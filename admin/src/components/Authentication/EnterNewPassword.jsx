import { Link } from "react-router-dom";
import Logo from "../../assets/images/KlimArt Logo - Horizontal Lockup.png";
import {
  FaRegUser,
  FaUnlockAlt,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaEyeSlash,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, signUp } from "../../features/actions/authenticationActions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updatePassword } from "../../features/actions/authenticationActions";
import { error } from "jquery";
import { clearReduxStoreData } from "../../features/slices/authenticationSlices";
import { clearSendVerifyOtpData } from "../../features/slices/authenticationSlices";
import { useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isPasswordChanged, errorMessage } = useSelector(
    (state) => state.authentication
  );

  const location = useLocation();
  const [isRegistrationApiCalled, setIsRegistrationApiCalled] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isResetPasswordApiCalled, setIsResetPasswordApiCalled] = useState();
  const [toggleViewPassword, setToggleViewPassword] = useState(false);

  console.log(location.state.email, "Checking for state in location");

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const iconStyle = {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  };

  const onSubmit = (data) => {
    const email = location.state.email;
    const { confirmNewPassword, newPassword } = data;
    const payload = {
      email,
      newPassword,
      confirmNewPassword,
    };
    if (payload) {
      dispatch(updatePassword(payload));
      setIsResetPasswordApiCalled(true);
    }
  };

  useEffect(() => {
    if (isPasswordChanged && !errorMessage && isResetPasswordApiCalled) {
      // dispatch(clearReduxStoreData());
      toast.success("Password changed Successfully");
      // dispatch(logout());
      // dispatch
      navigate("/login");
    }
  }, [isResetPasswordApiCalled, errorMessage, isSuccess, isPasswordChanged]);

  const validatePassword = (value) => {
    const password = getValues("newPassword");
    return value === password || "Passwords does not match";
  };

  return (
    <>
      <div className="main-content login-panel">
        <div className="login-body">
          {/* <div className="top d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
          </div> */}
          <div className="top d-flex justify-content-between align-items-center">
            {/* <div className="logo"> */}
            {/* <img src={Logo} alt="Logo" /> */}
            <BsArrowLeft
              className="arrow-back"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            {/* </div> */}
            {/* <Link to="/dashboard">
              <FaHome />
            </Link> */}
          </div>
          <div className="bottom">
            <h3 className="panel-title">Change Password</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="input-group mb-30">
                <span className="input-group-text">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-danger">Please enter your email</p>
              )} */}
              <div className="input-group mb-30">
                <span className="input-group-text">
                  <FaUnlockAlt />{" "}
                </span>
                <input
                  type={toggleViewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  {...register("newPassword", { required: true })}
                />
                <span className="input-group-text">
                  {toggleViewPassword ? (
                    <AiOutlineEye
                      onClick={() => setToggleViewPassword(!toggleViewPassword)}
                      style={iconStyle}
                    />
                  ) : (
                    <>
                      <AiOutlineEyeInvisible
                        onClick={() =>
                          setToggleViewPassword(!toggleViewPassword)
                        }
                        style={iconStyle}
                      />
                    </>
                  )}
                </span>
              </div>
              {errors?.newPassword?.type === "required" && (
                <p
                  className="text-danger"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  Please enter password
                </p>
              )}

              <div className="input-group mb-20">
                <span className="input-group-text">
                  <FaUnlockAlt />
                </span>
                <input
                  type={toggleViewPassword ? "text" : "password"}
                  className="form-control rounded-end"
                  placeholder="Confirm password"
                  {...register("confirmNewPassword", {
                    required: "Please enter confirm password",
                    validate: validatePassword,
                  })}
                />
                {/* <Link role="button" className="password-show">
                  <FaEyeSlash />
                </Link> */}
                <span className="input-group-text">
                  {toggleViewPassword ? (
                    <AiOutlineEye
                      onClick={() => setToggleViewPassword(!toggleViewPassword)}
                      style={iconStyle}
                    />
                  ) : (
                    <>
                      <AiOutlineEyeInvisible
                        onClick={() =>
                          setToggleViewPassword(!toggleViewPassword)
                        }
                        style={iconStyle}
                      />
                    </>
                  )}
                </span>
              </div>

              {errors.confirmNewPassword && (
                <p
                  className="text-danger"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  {errors.confirmNewPassword.message}
                </p>
              )}
              {isLoading && (
                <>
                  <div className="w-100 d-flex justify-content-center py-2">
                    <div class="custom-loader"></div>
                  </div>
                </>
              )}

              <button
                className="btn btn-primary w-100 login-btn"
                disabled={isLoading}
                type="submit"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
        {/* footer start */}
        <div className="footer">
          <p>
            Copyright© All Rights Reserved By{" "}
            <span className="text-primary">Pearl Organisation</span>
          </p>
        </div>
        {/* footer end */}
      </div>
    </>
  );
};

export default EnterNewPassword;
