import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AppContext from "../../features/ContextApi/ContextForProjects";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import { useContext } from "react";

function GetInTouchList() {
  const [list, setList] = useState([]);
  const [enquiryList, setEnquiryList] = useState([]);
  const [idForDelete, setIdForDelete] = useState();
  const [updateData, setUpdateData] = useState();
  const [idForUpdate, setIdForUpdate] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const { projectstate, setProjectState } = useContext(AppContext);
  const [dropDownValue, setDropDownValue] = useState();

  let navigate = useNavigate();
  const closeBtnForDelete = useRef();
  const closeBtnForUpdate = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setShowLoader(true);
      const response = await instance.get("/getInTouch", {
        withCredentials: true,
      });
      setShowLoader(false);
      setList(response.data.data);
      console.log((list, "list"));
    } catch (err) {
      setShowLoader(false);
      console.log("err", err);
      toast.error(err);
    }
  };

  const handleUpdate = async (id) => {
    console.log("id:::", id);
    setIdForUpdate(id);
    setShowLoader(true);
    await instance
      // .get(`${import.meta.env.VITE_API_BASE_URL}/getInTouch/${id}`)
      .get(`/getInTouch/${id}`, { withCredentials: true })

      .then((response) => {
        setShowLoader(false);

        setUpdateData(response.data.data);
        setProjectState(1);
      })
      .catch((err) => {
        console.log("err", err);
      });

    // navigate('/update-get-in-touch')
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmitForUpdate = async () => {
    try {
      // console.log()
      setShowLoader(true);
      console.log("This is the data t tbe updated", updateData);
      let newObj = {
        bhk: updateData.bhk,
        area: updateData.area,
        category: updateData.category,
        budget: updateData.budget,
        location: updateData.location,
        subCategory: updateData.subCategory,
      };
      let response = await instance.put(`/getInTouch/${idForUpdate}`, newObj, {
        withCredentials: true,
      });
      setShowLoader(false);
      closeBtnForUpdate.current.click();
      navigate("/get-in-touch");
      toast.success("get in touch updated successfully");
    } catch (error) {
      alert("error");
      toast.error(error?.message);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setShowLoader(true);

            try {
              const res = await instance.delete(`/getInTouch/${id}`, {
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
      getData();
      setProjectState(0);
    }
  }, [projectstate]);

  const handleEnquiry = async (id) => {
    console.log("id:%%%%%", id);
    const response = await instance.get(`/getInTouch/${id}`, {
      withCredentials: true,
    });
    console.log("response::::::::::", response);
    console.log("response.data.data", response.data.data);
    setEnquiryList([response?.data?.data]);
  };
  const handleChangeForDropDown = async (e, id) => {
    if (e.target.value === "") return;
    try {
      console.log("id drop", id);
      let  currentStatusData = e.target.value;
      let obj ={
        statusDetails : currentStatusData

      }
      console.log("currentStatusData", currentStatusData);
      const response = await instance.put(`/getInTouch/${id}`, obj, {
        withCredentials: true,
      });
      console.log("response drop", response);
      toast.success("data is updated successfully");
      getData()
    } catch (err) {
      console.log("err", err);
      toast.error(err ?? err.message);
    }
  };

  return (
    <>
      {showLoader ? (
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
      ) : (
        <>
          <div>
            <strong>Get In Touch</strong>
            <div className="scrollit" style={{overflow : "auto" , height : '500px' , width : '100%'}}>
             
            {/* <h3>Get In Touch</h3> */}
            <div className="table-container Table-Box my-2">
              <table className="table table-hover">
                <thead
                  className="table-heading"
                  style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
                >
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enquiry</th>
                    <th>Edit</th>
                    <th>Current Status</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {list?.map((item, index) => {
                    // { console.log("item", item) }
                    return (
                      <tr>
                        <td>{`${index + 1}`}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>

                        <td>
                          {/* <button type = "button" className='btn btn-warning' >Enquiry</button> */}
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                              handleEnquiry(item._id);
                            }}
                          >
                            <i class="fa-solid fa-file-circle-question"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                            onClick={() => {
                              handleUpdate(item._id);
                            }}
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                        {/* <button type='button' className='btn' onClick={() => { handleUpdate(item._id) }}><i class="fa-solid fa-pen-to-square"></i></button> */}
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
                          <select
                            onChange={(e) =>
                              handleChangeForDropDown(e, item._id)
                            }
                            
                          >
                            <option value="">Select Status</option>
                            <option value="unseen">Unseen</option>
                            <option value="seen">Seen</option>
                            <option value="contacted">Contacted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn"
                            onClick={() => {
                              handleDelete(item._id);
                              setProjectState(1);
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                          {/* <button type='button' className='btn' onClick={() => { handleDelete(item._id) }}><i class="fa-solid fa-trash"></i></button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
               </div>
            </div>
          </div>
        </>
      )}

      {/* Update Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Update Get In Touch </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="container">
                  <div className="row">
                    <div class="col">
                      <label for="recipient-name" class="col-form-label">
                        BHK:
                      </label>
                      <input
                        type="text"
                        name="bhk"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.bhk}
                        // value={
                        //   updateData.bhk.length > 0
                        //     ? updateData.bhk
                        //     : defaultValues.bhk
                        // }
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label for="recipient-name" class="col-form-label">
                        Area:
                      </label>
                      <input
                        type="text"
                        name="area"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.area}
                        // defaultValue={defaultValues.area}
                        // value={updateData.area || defaultValues.area}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label for="recipient-name" class="col-form-label">
                        Category:
                      </label>
                      <input
                        type="text"
                        name="category"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.category}
                        // defaultValue={defaultValues.category}
                        // value={updateData.category || defaultValues.category}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="message-text" class="col-form-label">
                        Budget:
                      </label>
                      <input
                        type="text"
                        name="budget"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.budget}
                        // defaultValue={defaultValues.budget}
                        // value={updateData.budget || defaultValues.budget}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label for="recipient-name" class="col-form-label">
                        Location:
                      </label>
                      <input
                        type="text"
                        name="location"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.location}
                        // defaultValue={defaultValues.location}
                        // value={updateData.location || defaultValues.location}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      <label for="recipient-name" class="col-form-label">
                        Sub Category:
                      </label>
                      <input
                        type="text"
                        name="subCategory"
                        class="form-control"
                        id="recipient-name"
                        style={{ border: "2px solid black" }}
                        value={updateData?.subCategory}
                        // defaultValue={defaultValues.subCategory}
                        // value={
                        //   updateData.subCategory || defaultValues.subCategory
                        // }
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                ref={closeBtnForUpdate}
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  handleSubmitForUpdate();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {/* <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure you want to delete it</div>
            <div class="modal-footer">
              <button
                ref={closeBtnForDelete}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  handleConfirmDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Enquiry Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ borderBottom: "2px solid gray", margin: "0 6px" }}
            >
              <h5
                class="modal-title"
                id="staticBackdropLabel"
                style={{ color: "black", textAlign: "center" }}
              >
                Enquiry
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  {enquiryList?.map((ele) => {
                    // console.log("ele", ele)
                    return (
                      <>
                        <div
                          style={{ display: "grid", gap: "10px" }}
                          class="col"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>BHK</span>
                            <span>{ele.bhk}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>Budget</span>
                            <span>{ele.budget}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>Area</span>
                            <span>{ele.area}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>Category</span>
                            <span>{ele.category}</span>
                          </div>
                          {/* <p> {ele.budget}</p>
                          <p>Area : {ele.area}</p>
                          <p>Category : {ele.category}</p> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>Contact</span>
                            <span>{ele.contact}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>Location</span>
                            <span>{ele.location}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              justifyItems: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              SubCategory
                            </span>
                            <span>{ele.subCategory}</span>
                          </div>
                        </div>

                        {/* <table className="table table-hover">
                          <thead>
                            <tr>
                             
                              <th scope="col">Budget</th>
                              <th scope="col">Area</th>
                              <th scope="col">Location</th>
                              <th scope="col">Contact</th>
                              <th scope="col">Category</th>
                              <th scope="col">Sub Category</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{ele.budget}</td>
                              <td>{ele.area}</td>
                              <td>{ele.location}</td>
                              <td>{ele.contact}</td>
                              <td>{ele.category}</td>
                              <td>{ele.subCategory}</td>
                            </tr>
                          
                          </tbody>
                        </table> */}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" class="btn btn-primary">Understood</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetInTouchList;
