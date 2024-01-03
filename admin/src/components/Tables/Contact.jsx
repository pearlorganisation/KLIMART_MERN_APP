import React from "react";
import Table from "react-bootstrap/Table";
import "./Career.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import { toast } from "react-toastify";
import { instance } from "../../services/axiosInstance";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Contact = () => {
  const [contactdata, setContactData] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [message, setMessage] = useState();
  const [isloading, setIsloading] = useState(false);
  const { projectstate, setProjectState } = useContext(AppContext);
  const [showLoader, setShowLoader] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: { isloading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getContactData();
    setModalIsVisible(false);
  }, []);

  const getContactData = async () => {
    setIsloading(true);
    try {
      const res = await instance.get("/contact");

      if (res.status) {
        setContactData(res.data.data);
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(true);
    }
  };


  const handleClose = () => {
    setModalIsVisible(false);
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
              const res = await instance.delete(`/contact/${id}`, {
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

  useEffect(() => {
    if (projectstate === 1) {
      getContactData();
      setProjectState(0);
    }
  });

  const handleChangeForDrop = async(e,id)=>{
    if (e.target.value === "") return;
 try{
  console.log("id",id)
  let currentStatus = e.target.value
  console.log("currentStatus",currentStatus)
  let obj = {
    statusDetails : currentStatus
  }
  const response = await instance.patch(`/contact/update/${id}` , obj ,{withCredentials:true})
  console.log("response",response)
  toast.success("data is updated successfully")
  getContactData()
 }
 catch(err){
console.log("err",err)
toast.error(err)
 }
  }

  return (
    <>
      <div className="table-container Table-Box">
        {!isloading ? (
          <>
          <strong>Contact</strong>
            <Table className="table table-hover my-2">
              <thead
                className="table-heading"
                style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
              >
                <tr>
                  <th>S.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Message</th>
                  <th>ORG</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Current Status</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <>
                <tbody className="text-center">
                  {contactdata &&
                    contactdata?.map((item, ind) => {
                      let Sno = ind + 1;
                      return (
                        <tr key={ind}>
                          <td>{Sno}</td>
                          <td>{item.fname}</td>
                          <td>{item.lname}</td>
                          <td>
                            {item.message.slice(0, 12)}
                            <span
                              onClick={() => {
                                setModalIsVisible(true);
                                setMessage(item.message);
                              }}
                              className="read-more-text text-primary"
                              style={{ cursor: "pointer" }}
                            >
                              ....Read More
                            </span>
                          </td>
                          <td>{item.org}</td>
                          <td>{item.subject}</td>
                          {/* <td><a className="btn btn-success" href={item.cv} target="_blank">Open CV</a></td> */}
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          {item?.statusDetails === "unseen" ? ( <td>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "seen" ? ( <td style={{background : '#FFBF00' , color : 'black'}}>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "contacted" ? ( <td  style={{background : 'green' , color : 'white'}}>
                            {item?.statusDetails}
                            </td>) : item?.statusDetails === "rejected" && ( <td style={{background : 'red' , color : 'white'}}>
                            {item?.statusDetails}
                            </td>) }

                            {/* <td>
                            {item?.statusDetails}
                            </td> */}
                         
                          <td>
                            <select onChange={(e)=>handleChangeForDrop(e,item._id)}>
                              <option value="">Select Status</option>
                              <option value="unseen">Unseen</option>
                              <option value="seen">Seen</option>
                              <option value="contacted" >Contacted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <button
                              // disabled={showLoader}
                              onClick={() => {
                                deleteData(item._id);
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
              </>
            </Table>
          </>
        ) : (
          <>
            <div className="h-100 d-flex justify-content-center align-items-center flex-column">
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

      <Modal show={modalIsVisible} onHide={handleClose}>
        <Modal.Header
          style={{ color: "black", background: "white" }}
          closeButton
        >
          <Modal.Title style={{ color: "black" }}>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black", background: "white" }}>
          {message}
        </Modal.Body>
        <Modal.Footer style={{ background: "white" }}>
          <Button
            onClick={handleClose}
            style={{ background: "gray", border: "none" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
