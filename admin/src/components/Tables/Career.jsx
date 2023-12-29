import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Career.css";
import Footer from "../Layout/Footer/Footer";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import { instance } from "../../services/axiosInstance";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Career = () => {
  const navigate = useNavigate();
  const [careerdata, setCareerData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { projectstate, setProjectState } = useContext(AppContext);
  const [showLoader, setShowLoader] = useState(false);
  const [formatedDate, setFormatedDate] = useState();
  const [unformatedDate, setUnformatedDate] = useState();

  // const

  const defaultOptions = {
    loop: true,
    autoplay: { isLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getCareerData();
  }, []);

  const getCareerData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/career");
      // console.log(res.data.data[0].date,"Checking for date in response:::::::::");
      if (res.status) {
        setCareerData(res.data.data);
        setIsLoading(false);
        // setUnformatedDate(res.data.data.date);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setShowLoader(true);
            try {
              const res = await instance.delete(`/career/${id}`, {
                withCredentials: true,
              });
              if (res.status === 200) {
                toast.success("Deleted successfully");
                setShowLoader(false);
                setProjectState(1);
              } else {
                // console.log(err);
              }
            } catch (err) {
              console.log(err);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if the user chooses not to delete
          },
        },
      ],
    });
  };

  // const deleteData = async (id) => {
  //   // setShowLoader(true);
  //   confirmAlert({
  //     title: "Confirm Deletion",
  //     message: "Are you sure you want to delete this data?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           // setShowLoader(true);
  //           try {
  //             const res = await axios.delete(`http://localhost:8081/api/v1/career/${id}`, {
  //               withCredentials: true,
  //             });
  //             if (res.status === 200) {
  //               toast.success("Deleted successfully", {
  //                 position: "top-center",
  //                 autoClose: 500,
  //               });
  //               setShowLoader(false);
  //             } else {
  //               console.log(err);
  //             }
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         },
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {
  //           // Do nothing if the user chooses not to delete
  //         },
  //       },
  //     ],
  //   });
  // };

  useEffect(() => {
    if (projectstate === 1) {
      getCareerData();
      setProjectState(0);
    }
  },[projectstate]);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US");
    return formattedDate;
  };

  const handleChangeForDropDown = async(e,id)=>{
    try{
      console.log("id",id)
      let currentStatus = e.target.value
      console.log("currentStatus career" , currentStatus)
      let obj = {
        statusDetails:currentStatus
      }
      const response = await instance.patch(`/career/update/${id}` , obj , {withCredentials:true})
      console.log("response" , response)
      toast.success("data is updated successfully")
      getCareerData()

    }
    catch(err){
      console.log("err",err)

    }
  }

  return (
    <>
      <div className="table-container Table-Box">
        {!isLoading ? (
          <>
           <strong>Career</strong>
            <Table className="table table-hover">
              <thead
                className="table-heading"
                style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
              >
                <tr>
                  <th>S.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Experience</th>
                  <th>Email</th>
                  <th>Education</th>
                  <th>CV</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Date of Applying</th>
                  <th>City</th>
                  <th>Current Status</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {careerdata &&
                  careerdata.map((item, ind) => {
                    let Sno = ind + 1;
                    return (
                      <tr key={ind}>
                        <td>{Sno}</td>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.experience}</td>
                        <td>{item.email}</td>
                        <td>{item.education}</td>
                        <td>
                          <a
                            className="btn"
                            href={item.cv}
                            target="_blank"
                          >
                            <i class="fa-solid fa-file-circle-check"></i>   
                          </a>
                        </td>

                        <td>{item?.contact}</td>
                        <td>{item?.role}</td>
                        <td>{item?.date}</td>
                        <td>{item?.city}</td>
                        {/* <td>{item?.statusDetails}</td> */}
                        {item?.statusDetails === "unseen" ? ( <td>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "seen" ? ( <td style={{background : '#FFBF00' , color : 'black'}}>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "contacted" ? ( <td  style={{background : 'green' , color : 'white'}}>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "rejected" && ( <td style={{background : 'red' , color : 'white'}}>
                            {item?.statusDetails}
                            </td>) }
                        <td>
                          <select onChange={(e)=>handleChangeForDropDown(e,item._id)}>
                            <option value="">Select Status</option> 
                            <option value="unseen">Unseen</option>
                            <option value="seen">Seen</option>
                            <option value="contacted">Contacted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td>
                          <button
                            // disabled={showLoader}
                            onClick={() => {
                              deleteData(item._id);
                              setProjectState(1);
                            }}
                            type="button"
                            class="btn"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <div className="d-flex h-100 justify-content-center align-items-center flex-column">
              <Lottie
                options={defaultOptions}
                height={120}
                width={120}
                // style={{background:"gray", stroke:"blue" }}
              />
              <p>Loading...</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Career;
