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
import { signUp } from "../../features/actions/authenticationActions";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify'

const Register = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const { isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.authentication
  );
  const [isRegistrationApiCalled, setIsRegistrationApiCalled] = useState(false);
  // const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmit = (data) => {
    console.log(data, "Consoling data before dispacth");
    const { name, username, email, password } = data;
    if (name && username && email && password) {
      const payload = {
        name,
        username,
        email,
        password,
      };
      dispatch(signUp(payload));
      setIsRegistrationApiCalled(true);
    }
  };
  console.log(isSuccess,"Issuccess");
  useEffect(() => {
    if (isSuccess && !errorMessage && isRegistrationApiCalled) {
      toast.success("User's registration completed. Now you can login");
      navigate("/login");
    }
  }, [navigate, errorMessage, isSuccess, isRegistrationApiCalled]);
  useEffect(() => {
    errorMessage &&
      isRegistrationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isRegistrationApiCalled]);

  return (
    <>
      <div className="main-content login-panel">
        <div className="login-body">
          <div className="top d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
            <Link to="/">
              <FaHome />
            </Link>
          </div>
          <div className="bottom">
            <h3 className="panel-title">Registration</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-30">
                <span className="input-group-text">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name?.type === "required" && (
                <p className="text-danger">Name is Required</p>
              )}
              <div className="input-group mb-30">
                <span className="input-group-text">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
              </div>
              {errors.username?.type === "required" && (
                <p className="text-danger">Username is Required</p>
              )}
              <div className="input-group mb-30">
                <span className="input-group-text">
                  {/* <i className="fa-regular fa-envelope" /> */}
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-danger">Email is Required</p>
              )}
              <div className="input-group mb-20">
                <span className="input-group-text">
                  <FaUnlockAlt />
                </span>
                <input
                  type="password"
                  className="form-control rounded-end"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern:
                      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
                  })}
                />
                <Link role="button" className="password-show">
                  <FaEyeSlash />
                </Link>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-danger">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-danger">
                  Minimum eight characters, at least one letter, one number and
                  one special character
                </p>
              )}
              <div className="d-flex justify-content-between mb-30">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="loginCheckbox"
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="loginCheckbox"
                  >
                    I agree
                    <Link
                      href="#"
                      className="text-dark text-decoration-underline"
                    >
                      Terms &amp; Policy
                    </Link>
                  </label>
                </div>
              </div>
              <button className="btn btn-primary w-100 login-btn" type="submit">
                Sign up
              </button>
            </form>
            <div className="other-option">
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
            </div>
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

export default Register;
