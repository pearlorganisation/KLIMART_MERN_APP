import { Link, Navigate } from "react-router-dom";
import Logo from "../../assets/images/KlimArt Logo - Horizontal Lockup.png";
import { FaRegUser, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  generateOtp,
  verifyOtp,
} from "../../features/actions/authenticationActions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResendOtpTimer from "./ResendOtpTimer";
import { clearSendVerifyOtpData } from "../../features/slices/authenticationSlices";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import { BsArrowLeft } from "react-icons/bs";
// import "./ResendOtpTimer.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const {
    isLoading,
    isSuccess,
    errorMessage,
    isOtpVerified,
    loggedInUserData,
  } = useSelector((state) => state.authentication);

  const defaultOptions = {
    loop: true,
    autoplay: { isLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [showOtpField, setShowOtpField] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enableResendOtp, setEnableResendOtp] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  // This method is used to send or verify otp.
  const handleSendVerifyOtp = (data) => {
    if (!showOtpField) handleSendOtp("sendOtp", data);
    else handleVerifyOtp(data);
  };

  // This method is used to call send otp api
  const handleSendOtp = (comesFrom, data) => {
    if (data?.length > 0 || data?.email?.length > 0) {
      console.log(data, "Checking data when sending otp");
      setEmail(comesFrom === "resendOtp" ? data : data?.email);
      dispatch(
        generateOtp({ email: comesFrom === "resendOtp" ? data : data?.email })
      );
    } else {
      toast.error("email is not registered", {
        position: "top-center",
      });
    }
  };

  // This method is used to call verify otp api
  const handleVerifyOtp = (data) => {
    if (data?.otp?.length === 6) {
      setOtp(data?.otp);
      dispatch(verifyOtp({ otp: data?.otp }));
    } else return;
  };

  const showResendOtpField = (value) =>
    value ? setEnableResendOtp(true) : setEnableResendOtp(false);

  // Used to enable show otp field
  useEffect(() => {
    if (isSuccess && !isOtpVerified && errorMessage?.length === 0)
      setShowOtpField(true);
  }, [isSuccess, errorMessage, isOtpVerified]);

  // Used to redirect user to change password page
  useEffect(() => {
    if (isOtpVerified) {
      toast.success(
        "OTP Verified Successfully. Now you can change your password.",
        {
          position: "bottom-center",
        }
      );
      setTimeout(() => {
        navigate("/change-password", { state: { otp, email }, replace: true });
      }, 1000);
    }
  }, [isOtpVerified]);

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage]);

  useEffect(() => {
    dispatch(clearSendVerifyOtpData());
    return () => dispatch(clearSendVerifyOtpData());
  }, []);

  useEffect(() => {
    setShowOtpField(false);
  }, []);
  return (
    <>
      {/* {Object.keys(loggedInUserData).length > 0 && ( */}
      <div className="main-content login-panel">
        <div className="login-body">
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
            <h3 className="panel-title fs-16">Reset Password</h3>

            <form onSubmit={handleSubmit(handleSendVerifyOtp)} className="form">
              <div className="input-group mb-30">
                <span className="input-group-text">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Id is required",
                    },
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p
                  className="form-error-msg text-danger"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  {errors?.email?.message}
                </p>
              )}
              {showOtpField && (
                <>
                  <div className=" mb-30">
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your otp sent on email"
                      {...register("otp", {
                        required: true,
                      })}
                    /> */}

                    <input
                      className="form-control w-100"
                      type="number"
                      placeholder=""
                      {...register("otp", {
                        required: { value: true, message: "OTP is required" },
                        minLength: {
                          value: 6,
                          message: "OTP cannot be less than 6 digits",
                        },
                        maxLength: {
                          value: 6,
                          message: "OTP cannot contains more than 6 digits",
                        },
                      })}
                    />
                    {/* <label className="did-floating-label">OTP</label> */}
                    {errors?.otp && (
                      <p
                        className="form-error-msg text-danger"
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          marginTop: "6px",
                        }}
                      >
                        {errors?.otp?.message}
                      </p>
                    )}
                    <section className="mt-2 d-flex w-100 px-2 justify-content-between">
                      {!isLoading && (
                        <>
                          <ResendOtpTimer
                            minutes={minutes}
                            setMinutes={setMinutes}
                            seconds={seconds}
                            setSeconds={setSeconds}
                            showResendOtpField={showResendOtpField}
                          />
                          <p
                            className="redirect-to-login "
                            style={{
                              color: enableResendOtp ? "#fe5502" : "gray",
                              cursor: enableResendOtp ? "pointer" : "default",
                            }}
                            onClick={() => {
                              if (
                                enableResendOtp &&
                                getValues()?.email?.length > 0
                              ) {
                                setMinutes(1);
                                setSeconds(0);
                                handleSendOtp("resendOtp", getValues()?.email);
                              } else return;
                            }}
                          >
                            Resend Otp
                          </p>
                        </>
                      )}
                    </section>
                  </div>
                </>
              )}

              {/* Spinner Section  */}
              {isLoading && (
                <section className="w-100 d-flex justify-content-center align-items-center py-4">
                  <div class="custom-loader"></div>
                </section>
              )}
              {!showOtpField ? (
                <button
                  className="btn btn-primary w-100 login-btn"
                  disabled={isLoading}
                  type="submit"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  className="btn btn-primary w-100 login-btn"
                  disabled={isLoading}
                  type="submit"
                >
                  Verify OTP
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ResetPassword;
