import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import animation from "../../Lottie/Loader.json";
import "../Tables/Career.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Lottie from "react-lottie";
import { confirmAlert } from "react-confirm-alert";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";

function TypesList() {
  const { projectstate, setProjectState } = useContext(AppContext);

  const [list, setList] = useState([]);
  const [IdForDelete, setIdForDelete] = useState([]);
  const [IdForUpdate, setIdForUpdate] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  // const [isloading,setIsloading] = useState(false);
  const deleteCloseBtn = useRef();
  const updateCloseBtn = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getTypesList();
  }, []);

  useEffect(() => {
    if (projectstate === 1) getTypesList();
    setProjectState(0);
  }, [projectstate]);

  const getTypesList = async () => {
    try {
      setShowLoader(true);
      const response = await instance.get(
        "/types"
      );
      console.log("response", response);
      setShowLoader(false);
      setList(response.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleDelete = (id) => {
    // setIdForDelete(id);

    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setShowLoader(true);
            try {
              const res = await instance.delete(`/types/${id}`, {
                withCredentials: true,
              });
              if (res.status === 200) {
                toast.success("Deleted successfully");
                setShowLoader(false);
                setProjectState(1);
              } else {
                console.log(res.err);
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
  // const handleConfirmDelete = async () => {
  //   try {
  //     const response = await instance.delete(`/types/${IdForDelete}`);
  //     console.log("response", response);
  //     getTypesList();
  //     deleteCloseBtn.current.click();
  //     toast.success("types is deleted successfully");
  //   } catch (err) {
  //     toast.error(err);
  //     console.log("err", err);
  //   }
  // };

  const handleUpdate = async (id) => {
    try {
      setIdForUpdate(id);
      const response = await instance.get(`/types/${id}`, {
        withCredentials: true,
      });
      console.log("response", response);
      setUpdateData(response.data.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleUpdateData = async () => {
    try {
      const typeInUpperCase = updateData?.type_name?.toUpperCase()
      console.log("typeInUpperCase %%" , typeInUpperCase)
      const obj = {
        type_name: typeInUpperCase,
      };
      const response = await instance.put(`/types/${IdForUpdate}`, obj, {
        withCredentials: true,
      });
      console.log("response", response);
      getTypesList();
      updateCloseBtn.current.click();
      toast.success("types data updated successfully");

      // setUpdateData(response.data.data)
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showLoader ? (
        <>
          <div className="d-flex h-100 justify-content-center align-items-center flex-column">
            <Lottie options={defaultOptions} height={120} width={120} />
            <p>Loading...</p>
          </div>
        </>
      ) : (
        <div>
          {/* <h1>List of Type</h1> */}
          {/* <br /> */}
          <strong>Type</strong>

          <table class="table table-hover my-2">
            <thead
              className="table-heading"
              style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
            >
              <tr>
                <th>S.No.</th>
                <th>Type Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {list?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td scope="row">{`${index + 1}`}</td>
                      <td>{item.type_name}</td>
                      <td>
                        {/* <button type="button" className="btn">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button> */}
                        <button
                          type="button"
                          class="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#updateModal"
                          onClick={() => {
                            handleUpdate(item._id);
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn "
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        {/* <button type="button" className="btn" onClick = {()=>{handleDelete(item._id)}}>
                     
                    </button> */}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {/* <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Delete Record</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h4>Are you sure you want to delete types</h4>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={deleteCloseBtn}
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

      {/* update Modal */}
      <div
        class="modal fade"
        id="updateModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Update</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Type Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    name="type_name"
                    value={updateData?.type_name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    style={{ border: "2px solid black" }}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={updateCloseBtn}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  handleUpdateData();
                }}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TypesList;