import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import { instance } from "../../services/axiosInstance";

function Branch() {
  const [branchAllData, setBranchAllData] = useState([]);
  const [branchData, setBranchData] = useState();
  const [branch, setBranch] = useState({});
  const [branchValue, setBranchValue] = useState();
  const [deleteIdValue, setDeleteIdValue] = useState();
  const [updateIdValue, setUpdateIdValue] = useState();
  const [loading, setLoading] = useState();
  const closeAddBtnRef = useRef(null);
  const closeUpdateBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const getAllBranchData = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/branch" , {withCredentials:true});
      setLoading(false);
      console.log("response", response);
      setBranchAllData(response?.data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleChange = (e) => {
    setBranchData({ ...branchData, [e.target.name]: e.target.value });
  };
  const handleAddBranch = async () => {
    try {
      closeAddBtnRef.current.click();
      setLoading(true);
      const response = await instance.post(
        "/branch",
        branchData,
        {withCredentials:true}
      );
      console.log("response", response);

      setLoading(false);
      getAllBranchData();
      toast.success("branch is updated successfully");
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleGetDeleteId = (id) => {
    console.log("id delete", id);
    setDeleteIdValue(id);
  };
 
  const handleUpdate = async () => {
    try {
        setLoading(true);
        closeUpdateBtnRef.current.click();
        const response = await instance.put(
            `/branch/${branchValue?._id}`,
            branchValue,
            {withCredentials:true}
            );
            setLoading(false);
            console.log("response update", response);
            
        
            toast.success("branch is updated successfully");
            getAllBranchData();

     
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDelete = async () => {
    try {
      closeDeleteBtnRef.current.click();
      const response = await instance.delete(
        `/branch/${deleteIdValue}`,
        {withCredentials:true}
      );
      toast.success("data is deleted successfully");
      console.log("response", response);
      getAllBranchData();
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleChangeValue = (e) => {
    setBranchValue({ ...branchValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getAllBranchData();
  }, []);
  console.log("branchValue", branchValue);
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Lottie
            options={defaultOptions}
            height={120}
            width={120}
            // style={{background:"gray", stroke:"blue" }}
          />
          <p style={{ marginTop: "10px" }}>Please wait...</p>
        </div>
      ) : (
        <div className="container border">
          <h4>
            <strong>Branch</strong>
          </h4>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
              data-bs-whatever="@mdo"
            >
              Add
            </button>
          </div>
          <div
            class="scrollit"
            style={{
              overflow: "auto",
              height: "500px",
              width: "1200px",
            }}
          >
            <table   class="table table-hover">
              <thead style={{border:'1px solid gray'}} className="">
                <tr >
                  <th  scope="col">S.No</th>
                  <th scope="col">OfficeName</th>
                  <th scope="col">Address1</th>
                  <th scope="col">Address2</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {branchAllData?.map((item, index) => {
                  return (
                    <>
                      <tr style={{border:'1px solid gray'}}>
                        <td>{`${index + 1}`}</td>
                        <td>{item?.OfficeName}</td>
                        <td>{item?.Address1}</td>
                        <td>{item?.Address2}</td>
                        <td>{item?.City}</td>
                        <td>{item?.State}</td>
                        <td>{item?.Pincode}</td>
                        <td>{item?.Email}</td>
                        <td>
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#updateModal"
                            data-bs-whatever="@mdo"
                             onClick={() => setBranchValue(item)}
                          >
                            <i
                              class="fa-solid fa-pen-to-square"
                             
                            ></i>
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            data-bs-whatever="@mdo"
                            onClick={() => handleGetDeleteId(item._id)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Update Modal  */}
          <div
            class="modal fade"
            id="updateModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="updateModal">
                    Update Branch
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={closeUpdateBtnRef}
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div className="d-flex">
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          OfficeName
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="OfficeName"
                          value={branchValue?.OfficeName}
                          onChange={(e) => handleChangeValue(e)}
                        />
                      </div>
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="Email"
                          value={branchValue?.Email}
                          onChange={(e) => handleChangeValue(e)}
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">
                        Address1
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                        name="Address1"
                        value={branchValue?.Address1}
                        onChange={(e) => handleChangeValue(e)}
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">
                        Address2
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                        name="Address2"
                        value={branchValue?.Address2}
                        onChange={(e) => handleChangeValue(e)}
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="recipient-name"
                        name="City"
                        value={branchValue?.City}
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                    <div className="d-flex">
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          State
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="State"
                          value={branchValue?.State}
                          onChange={(e) => handleChangeValue(e)}
                        />
                      </div>
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          Pincode
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="Pincode"
                          value={branchValue?.Pincode}
                          onChange={(e) => handleChangeValue(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleUpdate()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Delete Modal --> */}
          <div
            class="modal fade"
            id="deleteModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteModal">
                    Delete Branch Record
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={closeDeleteBtnRef}
                  ></button>
                </div>
                <div class="modal-body">Are you sure you want to delete</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add Modal */}
          <div
            class="modal fade"
            id="addModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Create Branch
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={closeAddBtnRef}
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div className="d-flex">
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          OfficeName
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="OfficeName"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="Email"
                          onChange={(e) => handleChange(e)}
                          
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">
                        Address1
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                        name="Address1"
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">
                        Address2
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                        name="Address2"
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="recipient-name"
                        name="City"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="d-flex">
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          State
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="State"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="col-md-6 mb-3 px-1">
                        <label for="recipient-name" class="col-form-label">
                          Pincode
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          name="Pincode"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleAddBranch()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Branch;
