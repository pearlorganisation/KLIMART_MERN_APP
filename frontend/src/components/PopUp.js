import React, { useEffect, useState } from "react";
import "./PopUp.css";
import LikeSvg from "../svgs/like.svg";
import buildingSvg from "../svgs/building.svg";

import {
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { fetchGetTouchForm } from "./features/actions/getintouchActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const PopUp = (props) => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state?.getTouch
  );

  const [completeFormData, setCompleteFormData] = useState({
    name: "",
    email: "",
    contact: null,
    bhk: "",
    budget: "",
    area: "",
    location: "",
    category: "",
    subCategory: "",
  });

  const updateData = (childData) => {
    setCompleteFormData({ ...completeFormData, childData });
  };

  const [currIdx, setCurrIdx] = useState(0);
  const [category, setCategory] = useState("");

  const handleWorkType = (val) => {
    if (val === 1) {
      setCategory("ARCHITECTURAL");
    } else {
      setCategory("INTERIORS");
    }
  };

  useEffect(() => {
    category && setCompleteFormData({ ...completeFormData, category });
  }, [category]);

  useEffect(() => {
  }, [completeFormData]);

  const handleNextPopUp = (nextidx) => {
    if (nextidx < 0) return;
    setCurrIdx(nextidx);
  };

  const handleFormSubmission = (data) => {
    const {
      name,
      email,
      contact,
      bhk,
      budget,
      area,
      location,
      category,
      subCategory,
      selected,
    } = data;

    const payload = {
      name,
      email,
      contact,
      bhk,
      budget,
      area,
      location,
      category,
      subCategory,
      selected,
    };
    dispatch(fetchGetTouchForm(payload));


  };

  useEffect(() => {
    category && console.log("workType=", category);
  }, [category]);

  const popups = [
    {
      title: "How can we help?",
      component: (
        <PopUp1 handleNextPopUp={handleNextPopUp} updateData={updateData} />
      ),
    },
    {
      title: "What are you looking to get designed?",
      component: (
        <PopUp2
          handleNextPopUp={handleNextPopUp}
          completeFormData={completeFormData}
          updateData={updateData}
          handleWorkType={handleWorkType}
          setCompleteFormData={setCompleteFormData}
        />
      ),
    },
    {
      title: "What type of interiors are you looking to design?",
      component: (
        <PopUpBtns
          handleNextPopUp={handleNextPopUp}
          completeFormData={completeFormData}
          updateData={updateData}
          setCompleteFormData={setCompleteFormData}
        />
      ),
    },

    {
      title: "Tell us some specifics of your Interior project",
      component: (
        <PopUp3
          handleNextPopUp={handleNextPopUp}
          completeFormData={completeFormData}
          updateData={updateData}
          setCompleteFormData={setCompleteFormData}
        />
      ),
    },
    {
      title: "Please fill in the information below",
      component: (
        <PopUp4
          handleNextPopUp={handleNextPopUp}
          completeFormData={completeFormData}
          updateData={updateData}
          setCompleteFormData={setCompleteFormData}
          handleFormSubmission={handleFormSubmission}
        />
      ),
    },
  ];

  return (
    <div id="popup" className={props.trigger === true ? "popUp_selected" : ""}>
      <>
        {currIdx < 5 ? (
          <div className="popup_container">
            <div className="popup_heading">
              <div>
                <div
                  onClick={() => handleNextPopUp(currIdx - 1)}
                  className="popup_backbtn"
                  // style={{ display : {currIdx == 0 ? 'none' : ""}}}
                  style={{
                    display: currIdx === 0 ? "none" : "",
                    cursor: "pointer",
                  }}
                >
                  <AiOutlineArrowLeft
                    fill="black"
                    style={{
                      background: "transparent",
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </div>
                <span
                  style={{ marginLeft: currIdx === 0 ? "10rem" : "" }}
                ></span>
                {popups[currIdx].title}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => props.PopUp(false)}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div
              className={currIdx === 0 ? "progress_bar center" : "progress_bar"}
            >
              {currIdx === 0 ? (
                <div className="progress_dot"></div>
              ) : (
                <>
                  <div className="progress_status">
                    {currIdx} / {4}
                  </div>
                  <div className="progress_dot_container">
                    <div
                      className="progress_dot_bar"
                      style={{
                        height: (currIdx / 4) * 100 + "%",
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
            <div className="progress_container">
              {/* <div
                className={
                  currIdx === 0 ? "progress_bar center" : "progress_bar"
                }
              >
                {currIdx === 0 ? (
                  <div className="progress_dot"></div>
                ) : (
                  <>
                    <div className="progress_status">
                      {currIdx} / {4}
                    </div>
                    <div className="progress_dot_container">
                      <div
                        className="progress_dot_bar"
                        style={{
                          height: (currIdx / 4) * 100 + "%",
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div> */}
              <div className="variable_component">
                {popups[currIdx].component}
              </div>
            </div>
          </div>
        ) : (
          <>
          <ThankPage
            handleNextPopUp={handleNextPopUp}
            PopUp={props.PopUp}
            isSuccess={isSuccess}
            setCurrIdx={setCurrIdx}
          />
          </>
          
        )}
      </>

      {/* <ThankPage /> */}
    </div>
  );
};

const PopUp1 = (props) => {
  console.log("props: =>" , props)
  return (
    <div className="variable_component_content">
      <div>
        KlimArt has offices across India, including in Bengaluru (HQ), New
        Delhi, Raipur, Kollam, and Guwahati. We create efficient workflows for
        better project starts and accessible client interactions. If you are
        keen on working with us on a project, Hit the button right away.
      </div>
      <div
        onClick={() => props.handleNextPopUp(1)}
        className="variable_component_content_btn"
      >
        <div>DESIGN A PROJECT</div>
        <AiOutlineArrowRight
          fill="white"
          style={{ background: "transparent", width: "2rem", height: "2rem" }}
        />
      </div>
    </div>
  );
};

const PopUp2 = (props) => {
  const [btnWrapperClass, setBtnWrapperClass] = useState("outline_wrapper");
  const [btnTextClass, setBtnTextClass] = useState("outline_btn_text");

  return (
    <div className="variable_component_content">
      <div>SELECT THE TYPE OF WORK</div>
      <div className="outline_wrapper popUpbtnHover">
        <div
          style={{ cursor: "pointer" }}
          className="outline_btn_text"
          onClick={() => {
            props.handleWorkType(1);
            props.handleNextPopUp(2);
          }}
        >
          ARCHITECTURAL WORK
        </div>
      </div>
      <div className="outline_wrapper popUpbtnHover">
        <div
          style={{ cursor: "pointer" }}
          className="outline_btn_text"
          onClick={() => {
            props.handleWorkType(2);
            props.handleNextPopUp(2);
          }}
        >
          INTERIORS
        </div>
      </div>
    </div>
  );
};

const PopUpBtns = (props) => {
  const btndata = [
    "RESIDENCE",
    "OFFICE",
    "SCHOOLS",
    "HOTEL",
    "HOSPITAL",
    "INSTITUTE",
  ];

  // const [selected, setSelected] = useState("");

  const [subCategory, setSubCategory] = useState("");
  const [selectFromButtons, setSelectFromButtons] = useState(false);

  const handleChange = (e) => {
    setSelectFromButtons(false);
    setSubCategory(e.target.value);
  };

  const handleclick = (item) => {
    setSelectFromButtons(true);
    setSubCategory(item);
  };

  const handleSubmit = () => {
    if (subCategory !== "") {
      const completeData = { ...props.completeFormData, subCategory };
      props.setCompleteFormData(completeData);
      props.handleNextPopUp(3);
    } else {
      props.handleNextPopUp(2);
    }
  };

  useEffect(() => {
  }, [props.completeFormData]);

  return (
    <div className="variable_component_content all_btn_var_comp">
      <div>SELECT THE TYPE OF WORK</div>
      <div className="all_btns">
        {btndata.map((d, i) => (
          <div
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => handleclick(d)}
            className={
              selectFromButtons && subCategory === d
                ? "outline_wrapper all_btns_btn selected"
                : "outline_wrapper all_btns_btn"
            }
          >
            <div className="outline_btn_text all_text">{d}</div>
          </div>
        ))}
      </div>

      <div className="all_btn_input">
        <div>OTHER</div>
        <div className="input_container">
          <input
            onChange={handleChange}
            value={selectFromButtons ? "" : subCategory}
            type="text"
            placeholder="Type..."
          />
          <div
            onClick={() => {
              handleSubmit();
            }}
            className="variable_component_content_btn"
          >
            <div>SUBMIT</div>
            <AiOutlineArrowRight
              fill="white"
              style={{
                background: "transparent",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PopUp3 = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handlePop3 = (formdata) => {
    console.log("formdata***" , formdata)
    props.handleNextPopUp(4);
    props.setCompleteFormData({ ...props.completeFormData, ...formdata });

  };

  return (
    <div className="input_form_container">
      <form
        noValidate
        className="inputs_wrapper"
        onSubmit={handleSubmit(handlePop3)}
      >
        <div className="input_container">
          <p className="input_label">No. of BHK</p>
          <input
            type="number"
            name="bhk"
            autoFocus
            {...register("bhk", {
              
              pattern: {
                value: /^([1-9]*|[1-9]*\.[1-9]{1}?[1-9]*)$/,
                message: "BHK cannot be start with zero",
              },
            })}
          />
          {errors.bhk && <p className="reg_label_err">{errors.bhk.message}</p>}
        </div>
        <div className="input_container position-relative">
          <p className="input_label">Budget</p>
          <div className="budget-div">
            <input
              type="number"
              id="budgetinput"
              name="budget"
              {...register("budget", {
              
                // pattern: {
                //   value: /^([1-9]*|[1-9]*\.[1-9]{1}?[1-9]*)$/,
                //   message: "Budget cannot be start with zero",
                // },
                pattern: {
                  value:    /^((?!(0))[0-9]+)$/,
                  message: "Budget cannot be start with zero",
                },
             
              })}
            />
            {errors.budget && (
              <p className="reg_label_err">{errors.budget.message}</p>
            )}
            <label for="youridhere" className="static-value">
              ₹
            </label>
          </div>
        </div>
        <div className="input_container">
          <p className="input_label">Built-Up area of project</p>
          <input
            type="text"
            name="area"
            {...register("area", {
             
              minLength: {
                value: 2,
                message: "Location cannot be less than 2 characters",
              },
              maxLength: {
                value: 40,
                message: "Location cannot be more than 40 characters",
              },
            })}
          />
          {errors.area && (
            <p className="reg_label_err">{errors.area.message}</p>
          )}
        </div>
        <div className="input_container">
          <p className="input_label">Location</p>
          <input
            type="text"
            name="location"
            {...register("location", {
            
              minLength: {
                value: 2,
                message: "Location cannot be less than 2 characters",
              },
              maxLength: {
                value: 40,
                message: "Location cannot be more than 40 characters",
              },
            })}
          />
          {errors.location && (
            <p className="reg_label_err">{errors.location.message}</p>
          )}
        </div>
        <button className="form_button">
          Submit
          <AiOutlineArrowRight
            fill="white"
            style={{
              background: "transparent",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
            }}
          />
        </button>
      </form>
    </div>
  );
};

const PopUp4 = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handlePop4 = (formdata) => {
    console.log("formdata$$" , formdata)
    props.handleNextPopUp(5);
    props.handleFormSubmission({ ...props.completeFormData, ...formdata });
    reset()
    // PopUp1()
  };

  return (
    <div className="input_form_container">
      <form
        className="inputs_wrapper"
        onSubmit={handleSubmit(handlePop4)}
        noValidate
      >
        <div className="input_container">
          <p className="input_label">Name</p>
          <input
            type="text"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 2,
                message: "Name cannot be less than 2 characters",
              },
              maxLength: {
                value: 40,
                message: "Name cannot be more than 40 characters",
              },
            })}
          />
          {errors.name && (
            <p className="reg_label_err">{errors.name.message}</p>
          )}
        </div>
        <div className="input_container">
          <p className="input_label">phone number</p>
          <input
            type="text"
            name="contact"
            {...register("contact", {
              required: {
                value: true,
                message: "Contact is required",
              },
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "Please Enter valid number",
              },
            })}
          />
          {errors.contact && (
            <p className="reg_label_err">{errors.contact.message}</p>
          )}
        </div>
        <div className="input_container">
          <p className="input_label">email</p>
          <input
            type="text"
            name="email"
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
        <button className="form_button" type="submit">
          Submit
          <AiOutlineArrowRight
            fill="white"
            style={{
              background: "transparent",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export const ThankPage = (props) => {
  return props.isSuccess ? (
    <div id="Thank">
      <div className="ThanksImg">
        <img src={buildingSvg} alt="" />
        <img src={LikeSvg} alt="" />
      </div>
      <div className="thank_content">
        <div className="tankHeading">Thank you for reaching out to us.</div>
        <div className="thank_para">
          Our team will contact you at the earliest to provide you with the best
          of our services.
        </div>
      </div>
      <AiOutlineClose
        style={{ cursor: "pointer" }}
        className="thank_cross"
        onClick={() => {
          props.setCurrIdx(0)

          props.PopUp(false)
        }       
       }
      />
      
    </div>
  ) : (
    <></>
  );
};

export default PopUp;
