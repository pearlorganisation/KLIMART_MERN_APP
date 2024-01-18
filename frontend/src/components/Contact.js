import React, { useState, useEffect } from "react";
import "./Contact.css";
import "../grid.css";
import { Link, useOutletContext } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import contactheroimg from "../assets/Contacthero.png";
import gmaps from "../assets/gmaps.png";
import Linebreakright from "./Linebreakright";
import BuildProject from "./common/BuildProject";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsList, getBranchData, getHeadquaterData } from "./features/actions/contactActions";
import {  getCareerPageData } from "./features/actions/careerActions";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {

const [msgValue, setMsgValue]= useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm();

  const [showPopup, setShowPopUp] = useOutletContext();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess,branches,headquater } = useSelector(
    (state) => state.contact
  );
  const {careerData} = useSelector(state => state.career)

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getHeadquaterData())
    dispatch(getBranchData())
    dispatch(getCareerPageData())
  }, [])


  const handleUserContact = (data) => {
    const { fname, lname, email, phone, org, subject, message } = data;
    if (fname && lname && email && phone && org && subject && message) {
      const payload = {
        fname,
        lname,
        email,
        phone,
        org,
        subject,
        message,
      };
      dispatch(fetchContactsList(payload));
    }
  };


  return (
    <>
      <div className="contact_home">
        <div id="Contact">
          <div id="contacthero">
            <img src={careerData[2]?.Image} alt="" id="contactheroimg" />
          </div>
          <div className="contactaddressmobile">
            <div className="col span-1-of-4 addresscardmobile">
              <h4>Design HQ - Bangalore</h4>
              <p>
                21, 24th Main, 8th Cross, 2nd Phase JP Nagar, Bangalore-560 078
                <br />
                Email : bd@klimart.in
              </p>
            </div>
          </div>
          <div id="contactlocation">
            <div id="contactmap">
              <a href="https://www.google.com/maps/place/klimArt+Private+Limited/@12.9114843,77.5843821,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae150d6bac95fb:0xe5ff6898b405409d!8m2!3d12.9114843!4d77.5865708" target="black">
                <img src={gmaps} alt="" id="mapsicon" />
              </a>
            </div>

            <div id="contactaddress">
              <div id="contacttoptext">Base Hq</div>
              <div id="hqaddress">
                <h3>{(Array.isArray(headquater) && headquater?.length > 0  && (`${headquater[0]?.OfficeName} - ${headquater[0]?.City}`))}</h3>
                <p>
                {(Array.isArray(headquater) && headquater?.length > 0  && (`${headquater[0]?.Address1} - ${headquater[0]?.Address2}`))} 
                  <br />
                  Email : 
                  {(Array.isArray(headquater) && headquater?.length > 0  && (`${headquater[0]?.Email}`))} 
                </p>
              </div>
            </div>
          </div>
          <div id="officelocations" className="row">
           {
            Array.isArray(branches) && branches?.length > 0 && branches?.map((item)=>{
              return  <div className="col span-1-of-4 addresscard">
              <h4>{item?.OfficeName}</h4>
              <p>
               {item?.Address1} {item?.Address2} <br />
                Email : {item?.Email}
              </p>
            </div>
            })
           }
            {/* <div className="col span-1-of-4 addresscard">
              <h4>Raipur Project Office, klimArt Pvt Ltd</h4>
              <p>
                B-12, Ashoka Millennium, Ring road No.1, Rajendra Nagar, Raipur,
                Chhattisgarh - 492001
                <br /> Email : bd@klimart.in
              </p>
            </div>
            <div className="col span-1-of-4 addresscard">
              <h4>Kerala Operations, klimArt Pvt Ltd</h4>
              <p>
                Raliyil House, Mathilil, Perinad, Kollam, Kerala 691 601
                <br /> E-mail : bd@klimart.in
              </p>
            </div>
            <div className="col span-1-of-4 addresscard">
              <h4>Guwahati Project Office, klimArt Pvt Ltd</h4>
              <p>
                Adj Rai Saheb Estate, Ananda Nagar, GS Road, GHY 7810005 E-mail
                : bd@klimart.in
              </p>
            </div> */}
          </div>
          <div id="careersbutton">
            <div id="careersbuttonleft">
              <h3>
                Are you looking to work with us? You can check out our&nbsp;
                <Link to="/Careers">
                  <span>Careers</span>
                </Link>
                &nbsp;Page for vacancies.
                <Link to="/Careers">
                  <AiOutlineArrowRight />
                </Link>
              </h3>
            </div>
            <Link to="/Careers">
            <div id="careersbuttonright">
              
                <AiOutlineArrowRight />
               
       
            </div>
            </Link>
          </div>
          <div id="contactform">
            <h4>
              If you’ve got something to say or ask, we’d love to hear from you.
              Just fill in the form below and write away:
            </h4>
            <form onSubmit={handleSubmit(handleUserContact)}>
              <div className="contactleft">
                <br />
                <label for="fname">First name *</label>
                <br />
                <br />
                <input
                  type="text"
                  name="fname"
                  id="fname"
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
                  <p className="reg_label_err">{errors?.fname?.message}</p>
                )}
              </div>
              <div className="contactright">
                <br />
                <label for="lname">Last name *</label>
                <br />
                <br />
                <input
                  type="text"
                  name="lname"
                  id="lname"
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
                  <p className="reg_label_err">{errors?.lname?.message}</p>
                )}
              </div>
              <div className="contactleft">
                <br />
                <label for="email">Email *</label>
                <br />
                <br />
                <input
                  type="email"
                  name="email"
                  id="contactemail"
                  placeholder=""
                  {...register("email", {
                    required: { value: true, message: "Email Id is required" },
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="reg_label_err">{errors?.email?.message}</p>
                )}
              </div>
              <div className="contactright">
                <br />
                <label for="lname">Phone * </label>
                <br />
                <br/>
                <input
                  type="number"
                  name="phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                ></input>
                {errors.phone && (
                  <p className="reg_label_err">{errors?.phone?.message}</p>
                )}
              </div>
              <br />
              <div className="contactleft">
                <br />
                <label for="org">Organization</label>
                <br />
                <br />
                <input
                  type="text"
                  id="org"
                  name="org"
                  {...register("org", {
                    required: {
                      value: true,
                      message: "Organisation is required",
                    },
                    minLength: {
                      value: 2,
                      message: "Organisation cannot be less than 2 characters",
                    },
                    maxLength: {
                      value: 40,
                      message: "Organisation cannot be more than 40 characters",
                    },
                  })}
                />
                {errors.org && (
                  <p className="reg_label_err">{errors?.org?.message}</p>
                )}
              </div>
              <div className="contactright">
                <br />
                <label for="subjet">Subject *</label>
                <br />
                <br />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  {...register("subject", {
                    required: {
                      value: true,
                      message: "Subject is required",
                    },
                    minLength: {
                      value: 2,
                      message: "Subject cannot be less than 2 characters",
                    },
                    maxLength: {
                      value: 40,
                      message: "Subject cannot be more than 40 characters",
                    },
                  })}
                />
                {errors.subject && (
                  <p className="reg_label_err">{errors?.subject?.message}</p>
                )}
              </div>
              <div id="contactmessage">
                <br />
                <label for="message">Message *</label>
                <br />
                <br />
                <input
                  type="text"
                  id="message"
                  name="message"
                 
                  
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is required",
                    },
                    minLength: {
                      value: 300,
                      message: "Message cannot be less than 300 characters",
                    },
                    
                  })}
                  onChange={(e)=>setMsgValue(e.target.value)}
                />
                <p>{msgValue.length} <span style={{color:"red"}}>characters</span></p>
                {errors.message && (
                  <p className="reg_label_err">{errors?.message?.message}</p>
                )}
              </div>
              <input
                type="Submit"
                value="Submit"
                className="button"
                id="contactsubmitbtn"
              />
                 <ToastContainer />

            </form>
          </div>
        </div>
        <Linebreakright />
        <section className="buildProjects">
          <BuildProject PopUp={setShowPopUp} />
        </section>
      </div>
    </>
  );
}

export default Contact;
