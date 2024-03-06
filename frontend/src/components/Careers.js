import React, { useEffect, useState } from "react";
import "./Careers.css";

import {
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { ThankPage } from "./PopUp";
import Vacancies from "./Vacancies";
import careershero from "../assets/Careershero.png";
import line from "../assets/Line 1.png";
import careermainimg from "../assets/careermainimg.png";
import Linebreakleft from "./Linebreakleft";
import Newsletter from "./Newsletter";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCareerList,
  getCareerPageData,
  getCurrentVacancies,
} from "./features/actions/careerActions";
import { array } from "yup";
// ==========================================================================================================

function Careers() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleData, setRoleData] = useState("");
  const dispatch = useDispatch();
  const { careerData } = useSelector((state) => state.career);
  console.log(careerData);

  useEffect(() => {
    dispatch(getCareerPageData());
  }, []);

  return (
    <>
      <div className="career_home">
        <div id="careerhero">
          <img src={careerData[1]?.Image} alt="" id="careersheroimg" />
        </div>
        <div id="careermain">
          <div id="careermaintop">
            <span>{careerData[0]?.header}</span>
            <img src={line} id="selpro" alt="linedecor" />
          </div>
          <div id="careercontent">
            <div className="careermaintext">
              <p>{careerData[0]?.Desc}</p>
            </div>
            <img
              src={careerData[0]?.Image}
              alt="careersimg"
              id="careermainimg"
            />
          </div>
        </div>
        <div className="vacancies">
          <div className="vacanciestop">
            <span>Current Vacancies</span>
            <div className="viewmorebtnline"></div>
          </div>
          <Vacancies setRoleData={setRoleData} setIsOpen={setIsOpen} />
        </div>
        <div id="cantfind">
          <div id="cantfindtop">
            <span>Can't find your career role?</span>
          </div>
          <div id="cantfindcontent">
            <p>
              klimArt has a pan India presence with offices in 5 cities
              including New Delhi, Raipur, Kollam, Guwahati and our headquarters
              in Bengaluru. If you haven't found the job vacancy on our site
              today, you can submit your details prospectively with us and one
              of our team will get in touch with you.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="button"
              id="submitdetails"
            >
              Submit your details
            </button>
          </div>
        </div>
        <Linebreakleft />
        {/* <section className="newsletter">
        <Newsletter />
      </section> */}
      </div>
      {isOpen ? (
        <CareersPopUp
          popUpRoleData={roleData}
          roleProp="role"
          setIsOpen={setIsOpen}
          setRoleData={setRoleData}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Careers;

// ==========================================================================================================
const CareersPopUp = (props) => {
  const [isDone, setIsDone] = useState(false);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const { popUpRoleData, setRoleData } = props;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  const handleUserCareer = (data) => {
    const {
      fname,
      lname,
      education,
      role,
      experience,
      contact,
      city,
      email,
      cv,
    } = data;
    // setIsDone(true)

    if (
      fname &&
      lname &&
      education &&
      role &&
      experience &&
      contact &&
      city &&
      email &&
      cv
    ) {
      const payload = {
        fname,
        lname,
        education,
        role,
        experience,
        contact,
        city,
        email,
        cv,
      };

      dispatch(fetchCareerList(payload));
      reset();
    }
  };

  let res = popUpRoleData ? {value:popUpRoleData} : {defaultValue:role}

  useEffect(() => {}, [getValues]);

  return (
    <>
      <div className="career_popup_container">
        {isDone ? (
          <ThankPage PopUp={() => props.setIsOpen(false)} />
        ) : (
          <form onSubmit={handleSubmit(handleUserCareer)} autoComplete="off">
            <div className="input_form_container">
              <div className="career_popup_head_wrapper">
                <div className="career_popup_head">Apply here</div>
                <AiOutlineClose
                  onClick={() => {
                    props.setIsOpen(false);
                    setRoleData("");
                  }}
                  className="formbtn"
                />
              </div>
              <div className="inputs_wrapper">
                <div className="input_container">
                  <p className="input_label">FIRST NAME</p>
                  <input
                    type="text"
                    name="fname"
                    {...register("fname", {
                      required: {
                        value: true,
                        message: "First Name is required",
                      },
                      minLength: {
                        value: 2,
                        message: "First Name cannot be less than 2 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "First Name cannot be more than 40 characters",
                      },
                    })}
                  />
                  {errors.fname && (
                    <p className="reg_label_err">{errors.fname.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">LAST NAME</p>
                  <input
                    type="text"
                    name="lname"
                    {...register("lname", {
                      required: {
                        value: true,
                        message: "Last Name is required",
                      },
                      minLength: {
                        value: 2,
                        message: "Last Name cannot be less than 2 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "Last Name cannot be more than 40 characters",
                      },
                    })}
                  />
                  {errors.lname && (
                    <p className="reg_label_err">{errors.lname.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">EDUCATIONAL QUALIFICATION</p>
                  <input
              
                    type="text"
                    name="education"
                    {...register("education", {
                      required: {
                        value: true,
                        message: "Education is required",
                      },
                      minLength: {
                        value: 2,
                        message: "Education cannot be less than 2 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "Education cannot be more than 40 characters",
                      },
                    })}
                  />
                  {errors.education && (
                    <p className="reg_label_err">{errors.education.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">Role</p>
                  <input
                    onchange={(event) => setRole(event.target.value)}
                    type="text"
                    name="role"
                    {...res}
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Role is required",
                      },
                    })}
                  />
                  {errors.role && (
                    <p className="reg_label_err">{errors.role.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">YEARS OF EXPERIENCE</p>
                  <input
                    type="number"
                    name="experience"
                    {...register("experience", {
                      required: {
                        value: true,
                        message: "experience is required",
                      },
                    })}
                  />
                </div>
                <div className="input_container">
                  <p className="input_label">CONTACT NUMBER</p>
                  <input
                    type="number"
                    name="contact"
                    {...register("contact", {
                      required: {
                        value: true,
                        message: "Contact number is required",
                      },
                      maxLength: {
                        value: 10,
                        message: "Contact number must be 10 digits",
                      },
                    })}
                  />
                  {errors.contact && (
                    <p className="reg_label_err">{errors.contact.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">CURRENT CITY</p>
                  <input
                    type="text"
                    name="city"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "City is required",
                      },
                      minLength: {
                        value: 2,
                        message: "City cannot be less than 2 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "City cannot be more than 40 characters",
                      },
                    })}
                  />
                  {errors.city && (
                    <p className="reg_label_err">{errors.city.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">EMAIL</p>
                  <input
                   
                   type="text"
                    name="email"
                    placeholder=""
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
                  {errors.email && (
                    <p className="reg_label_err">{errors.email.message}</p>
                  )}
                </div>
                <div className="input_container">
                  <p className="input_label">ATTACH PORTFOLIO</p>
                  <input
                    type="file"
                    name="cv"
                    {...register("cv", {
                      // validate: {
                      //   lessThan10MB: (files) =>
                      //     files[0]?.size > 10000000 || "Max 10MB",
                      // },
                    })}
                  />
                  <p style={{color:"red"}} className="sizeLimit">max size limit: 10Mb</p>
                  {errors.cv && (
                    <p className="reg_label_err">{errors.cv.message}</p>
                  )}
                </div>
              </div>
              <button type="submit" className="form_button">
                Submit
              </button>
              <ToastContainer />
            </div>
          </form>
        )}
      </div>
    </>
  );
};