import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import "../Tables/Career.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import "./tag.css"

function TagsList() {
  const [tagsData, setTagsData] = useState([]);
  const [IdForDelete, setIdForDelete] = useState();
  const [updateData, setUpdateData] = useState([]);
  const [IdForUpdate, setIdForUpdate] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const deleteCloseBtn = useRef();
  const updateCloseBtn = useRef();
  const { projectstate, setProjectState } = useContext(AppContext);

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    tagsList();
  }, []);

  useEffect(() => {
    if (projectstate === 1) {
      tagsList();
      setProjectState(0);
    }
  }, [projectstate]);

  const tagsList = async () => {
    try {
      setShowLoader(true);
      const response = await instance.get(
        "/tag",
        { withCredentials: true }
      );
      console.log("response", response);
      setShowLoader(false);
      setTagsData(response.data.Tags);
    } catch (err) {
      console.log("err", err);
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
              const res = await instance.delete(`/tag/${id}`, {
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
  // const handleConfirmDelete = async () => {
  //   console.log("IdForDelete", IdForDelete);
  //   const response = await instance.delete(`/tag/${IdForDelete}`, {
  //     withCredentials: true,
  //   });
  //   console.log("response delete ::::::::::::::::::", response);
  //   tagsList();
  //   deleteCloseBtn.current.click();
  //   toast.success("tag is deletd successfully");
  // };

  const handleUpdate = async (id) => {
    console.log(id, "id:");
    setIdForUpdate(id);
    const response = await instance.get(`/tag/${id}`, {
      withCredentials: true,
    });
    setUpdateData(response?.data?.data);
  };
  const handleUpdateData = async () => {
    const tagInUpperCase = updateData?.tags_name?.toUpperCase()
    console.log("tagInUpperCase %%" , tagInUpperCase)
    const obj = { tags_name: tagInUpperCase };
    const response = await instance.put(`/tag/${IdForUpdate}`, obj, {
      withCredentials: true,
    });
    console.log("response :::::::::::::::::::", response);
    tagsList();
    updateCloseBtn.current.click();
    toast.success("tags is updated successfully");
  };
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>  <strong>Tags</strong>
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
            {/* <h1>List of Tags</h1> */}
            <br />
            <div className="table-container Table-Box">
              <table class="table table-hover">
                <thead
                  className="table-heading"
                  style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
                >
                  <tr>
                    <th>S.No.</th>
                    {/* <th>Main Tag Name</th> */}
                    <th>Tag Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {tagsData?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">{`${index + 1}`}</td>
                          {/* <td>{item?.main_tag?.title}</td> */}
                          <td>{item?.tags_name}</td>
                          <td>
                            {/* <button type = 'button' className='btn'><i class="fa-solid fa-pen-to-square"></i></button> */}
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
                              class="btn"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                            {/* <button type="button" className="btn">
                      <i class="fa-solid fa-trash"></i>
                    </button> */}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Delete Modal  */}
      {/* <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5>Delete</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete the tag
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

      {/* Update Modal */}
      <div
        class="modal fade"
        id="updateModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel1"
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
                    Tag Name:
                  </label>
                  <input
                    type="text"
                    name="tags_name"
                    class="form-control"
                    id="recipient-name"
                    value={updateData?.tags_name}
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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TagsList;
