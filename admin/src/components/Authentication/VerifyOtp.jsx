// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaRegUser, FaHome } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import AppContext from "../../features/ContextApi/ContextForProjects";
// import {
//   generateOtp,
//   verifyOtp,
// } from "../../features/actions/authenticationActions";
// import Logo from "../../assets/images/KlimArt Logo - Horizontal Lockup.png";
// import { useContext } from "react";

// const VerifyOtp = () => {
//   const {
//     isUserLoggedIn,
//     isLoading,
//     loggedInUserData,
//     isOtpVerified,
//     errorMessage,
//   } = useSelector((state) => state.authentication);

//   const { projectstate, setProjectState } = useContext(AppContext);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isResendButtonVisible, setIsResendButtonVisible] = useState(false);

//   const [timeLeft, setTimeLeft] = useState(1 * 20); // 3 minutes in seconds

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       otp: "",
//     },
//   });

//   const onSubmit = (data) => {
//     data.email = loggedInUserData.userDetails.email;
//     const { email, otp } = data;
//     if (email && otp) {
//       const payload = {
//         email,
//         otp,
//       };
//       dispatch(verifyOtp(payload));
//     }
//   };

//   useEffect(() => {
//     if (isOtpVerified && !errorMessage) {
//       toast.success("Otp Verified, Now You can change your password", {
//         position: "top-center",
//         autoClose: 1000,
//       });
//       navigate("/change-password");
//     }
//   }, [isOtpVerified, errorMessage, navigate]);





//   const timerFunction = () => {
//     if (timeLeft <= 0) {
//       setIsResendButtonVisible(true);
//     } else {
//       const timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   };

//   useEffect(() => {
//     timerFunction();
//   }, [timeLeft]);

//   const resendOtpFunction = () => {
//     const email = loggedInUserData.userDetails.email;
//     if (email) {
//       const payload = {
//         email,
//       };
//       dispatch(generateOtp(payload));
//       setProjectState(1);
//     }
// console.log(projectstate,"Checking project state:::::::::::::")
//     useEffect(() => {
//       if (projectstate === 1) {
//         navigate("/otp-verify");
//       }
//     }, [projectstate]);
//   };
//   return (
//     <div className="main-content login-panel">
//       <div className="login-body">
//         <div className="top d-flex justify-content-between align-items-center">
//           <div className="logo">
//             <img src={Logo} alt="Logo" />
//           </div>
//           <Link to={isUserLoggedIn ? "/dashboard" : "/"}>
//             <FaHome />
//           </Link>
//         </div>
//         <div className="bottom">
//           <h3 className="panel-title">Verify Otp</h3>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* ... (input field) */}
//             <div className="input-group mb-30">
//               <span className="input-group-text">
//                 <FaRegUser />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your otp sent on email"
//                 {...register("otp", {
//                   required: true,
//                 })}
//               />
//             </div>
//             {errors?.otp?.type === "required" && (
//               <p className="form-error-msg text-danger text-small">
//                 Otp is required
//               </p>
//             )}
//             <div className="my-2 w-100 d-flex justify-content-end align-items-center">
//               <div className="p-1 text-primary">
//                 <span>
//                   {isResendButtonVisible ? (
//                     <>
//                       <span
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
                          
//                           resendOtpFunction();
//                         }}
//                       >
//                         Resend Otp
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       Time Left: {Math.floor(timeLeft / 60)}:
//                       {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
//                     </>
//                   )}
//                 </span>
//               </div>
//             </div>
//             {/* ... (submit button) */}
//             <button
//               className="btn btn-primary w-100 login-btn"
//               disabled={isLoading}
//               type="submit"
//             >
//               Verify
//             </button>
//           </form>
//         </div>
//       </div>
//       {/* ... (footer) */}
//       <div className="footer">
//         <p>
//           Copyright© All Rights Reserved By{" "}
//           <span className="text-primary">Pearl Organisation</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;
