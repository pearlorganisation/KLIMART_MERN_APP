import {
  FaRegUser,
  FaUnlockAlt,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaEyeSlash,
  FaHome,
} from "react-icons/fa";
import Logo from "../../assets/images/KlimArt Logo - Horizontal Lockup.png";
import { Link } from "react-router-dom";
import { login } from "../../features/actions/authenticationActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showLoginSuccessToast } from "../../features/slices/authenticationSlices";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auth: "",
      password: "",
    },
  });

  const iconStyle = {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoading,
    isSuccess,
    errorMessage,
    isUserLoggedIn,
    loggedInUserData,
  } = useSelector((state) => state.authentication);

  const [isLoginApiCalled, setIsLoginApiCalled] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleLogin = (data) => {
    const { auth, password } = data;
    if (auth && password) {
      const payload = {
        auth,
        password,
      };
      dispatch(login(payload));
      setIsLoginApiCalled(true);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  // useEffect(() => {
  //   if (isLoginApiCalled && isSuccess) {
  //     // dispatch(showLoginSuccessToast());
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 100);
  //   }
  // }, [navigate, loggedInUserData, isLoginApiCalled]);

  // useEffect(() => {
  //   errorMessage &&
  //     isLoginApiCalled &&
  //     toast.error("Username or password is incorrect", {
  //       position: "top-center",
  //     });
  // }, [errorMessage, isLoginApiCalled]);
  console.log(isLoading, "isLoading::::::::::");

  return (
    <>
      <div className="main-content login-panel">
        <div className="login-body">
          <div className="top1 d-flex justify-content-center align-items-center">
            <div className="logo text-center">
              <img src={Logo} alt="Logo" />
            </div>
            {/* <Link to="/">
              <FaHome />
            </Link> */}
          </div>
          <div className="bottom">
            <p className="panel-title">Login Here</p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="input-group mb-30">
                <span className="input-group-text">
                  {/* <i className="fa-regular fa-user" /> */}
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username or email address"
                  {...register("auth", { required: true })}
                />
              </div>
              {errors.auth?.type === "required" && (
                <p
                  className="text-danger"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  Username or email is Required
                </p>
              )}
              <div className="input-group mb-20">
                <span className="input-group-text">
                  {/* <i className="fa-regular fa-lock" /> */}
                  <FaUnlockAlt />
                </span>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="form-control rounded-end"
                  style={{ position: "relative" }}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {/* <img src={EyeOpen}/> */}
                <span className="input-group-text">
                  {passwordVisibility ? (
                    <AiOutlineEye
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                      style={iconStyle}
                    />
                  ) : (
                    <>
                      <AiOutlineEyeInvisible
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibility)
                        }
                        style={iconStyle}
                      />
                    </>
                  )}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p
                  className="text-danger "
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  Password required
                </p>
              )}

              {/* <div className="d-flex justify-content-between mb-30">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="loginCheckbox"
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="loginCheckbox"
                  >
                    Remember Me
                  </label>
                </div>
                <Link
                  href="dashboard-reset-password.html"
                  className="text-dark fs-14"
                  to="/reset-password"
                >
                  Forgot Password?
                </Link>
              </div> */}
              {isLoading ? (
                ""
              ) : (
                <>
                  <div className="w-100 d-flex justify-content-center py-4">
                    <Link
                      href="dashboard-reset-password.html"
                      className="forgot-text mb-30"
                      to="/reset-password"
                    >
                      Have you forgot your password ?
                    </Link>
                  </div>
                </>
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
                Continue
              </button>
            </form>
            {/* <div className="other-option">
              <p className="text-dark">Or continue with</p>
              <div className="social-box d-flex justify-content-center gap-20">
                <Link href="#">
                  <FaFacebookF />
                </Link>
                <Link href="#">
                  <FaTwitter />
                </Link>
                <Link href="#">
                  <FaGoogle />
                </Link>
                <Link href="#">
                  <FaInstagram />
                </Link>
              </div>
            </div> */}
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

export default Login;
