import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import { useForm } from 'react-hook-form';

function Employee() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDt, setEmployeeDt] = useState();
  const [updateIdValue, setUpdateIdValue] = useState();
  const [deleteIdValue, setDeleteIdValue] = useState();
  const [employee, setEmployee] = useState();
  const [imageFile, setImageFile] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [imageView, setImageView] = useState(
    "https://w7.pngwing.com/pngs/45/421/png-transparent-computer-icons-laborer-employee-icon-employment-black-and-white-user-account.png"
  );
  const [imgFile, setImgFile] = useState();
  const closeUpdateBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const closeAddBtnRef = useRef(null);
  const imageBtnRef = useRef(null);
  const imgBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { register, handleSubmit , reset,
    formState: { errors } } = useForm();

  const getEmployeeAllData = async () => {
    try {
      setLoading(true)
      const response = await instance.get("/employee" , {withCredentials:true});
      console.log("response", response);
      setLoading(false)
      setEmployeeData(response?.data?.data);
    } catch (err) {
      console.log("err", err);
      toast.error(err);
    }
  };
  // const handleGetUpdateId = (id) => {
  //   console.log("id employee", id);
  //   setUpdateIdValue(id);
  //   const getEmployeeDataById = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await axios.get(
  //         `http://localhost:8081/api/v1/employee/${id}`
  //       );
  //       setLoading(false)
  //       console.log("response id ", response);
  //       setEmployee(response?.data?.data);
  //       setImagePreview(response?.data?.data?.propertyGallery[0]);
  //     } catch (err) {
  //       console.log("err", err);
  //       toast.error(err);
  //     }
  //   };
  //   getEmployeeDataById();
  // };
  const handleUpdate = async () => {
    try {
      closeUpdateBtnRef.current.click();
      setLoading(true)

      const formData = new FormData();
      formData.append("Name", employee?.Name);
      formData.append("EmployeeId", employee?.EmployeeId);
      formData.append("Address", employee?.Address);
      formData.append("images", imageFile);
      const response = await instance.put(
        `/employee/${employee._id}`,
        formData,
        {withCredentials:true}
      );
      setLoading(false)

      console.log("response update employee", response);
      getEmployeeAllData();
      
      toast.success("data is updated successfully");
    } catch (err) {
      console.log("err", err);
      toast.error(err);
    }
  };

  const handleAddEmployee = async (data) => {
    console.log("data######" , data)
    try {
      setLoading(true)
      closeAddBtnRef.current.click();
      const formData = new FormData();
      formData.append("Name", data?.Name);
      formData.append("EmployeeId", data?.EmployeeId);
      formData.append("Address", data?.Address);
      formData.append("images", imgFile);
      const response = await instance.post(
        "/employee",
        formData,
        {withCredentials:true}

      );
      setLoading(false)
      reset()
      // setEmployeeDt({});
      setImageView(  "https://w7.pngwing.com/pngs/45/421/png-transparent-computer-icons-laborer-employee-icon-employment-black-and-white-user-account.png")

      console.log("response add employee", response);
      getEmployeeAllData();

      toast.success("data is added successfully");
    } catch (err) {
      setLoading(false)
      console.log("err", err);
      toast.error(err);
    }
  };
  const handleGetDeleteId = (id) => {
    console.log("id delete ", id);
    setDeleteIdValue(id);
  };
  const handleDelete = async () => {
    try {
      closeDeleteBtnRef.current.click();
      setLoading(true)
      const response = await instance.delete(
        `/employee/${deleteIdValue}`,
        {withCredentials:true}
      );
      setLoading(false)

      console.log("response delete employee", response);
      getEmployeeAllData();
      toast.success("data is deleted successfully");
      
    } catch (err) {
      console.log("err", err);
      toast.error(err);
    }
  };
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);

    setImageFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleFileChnge = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);

    setImgFile(e.target.files[0]);
    setImageView(URL.createObjectURL(e.target.files[0]));
  };
  const handleEditImageClick = (e) => {
    e.preventDefault();
    imageBtnRef.current.click();
  };
  const handleEditImageClicked = (e) => {
    e.preventDefault();
    imgBtnRef.current.click();
  };
  const handleChangeValue = (e) => {
    setEmployeeDt({ ...employeeDt, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getEmployeeAllData();
  
  }, []);


  console.log("employee" , employee)


  return loading ? (
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
      <div className="d-flex justify-content-between align-items-center h-100 my-2">
      <strong>Employee</strong>
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
              width: "100%",
            }}
            >
            
      <table class="table table-hover table-bordered m-2">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">EmployeeId</th>
            <th scope="col">Address</th>
            <th scope="col">propertyGallery</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{`${index + 1}`}</td>
                  <td>{item?.Name}</td>
                  <td>{item?.EmployeeId}</td>
                  <td>{item?.Address}</td>
                  <td>
                    <img
                      src={item?.propertyGallery[0]}
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50rem",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      data-bs-whatever="@mdo"
                      onClick={() => {
                        setEmployee(item)
                        setImagePreview(item.propertyGallery[0])
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn"></button>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
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
                Add Employee
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
              <form onSubmit={handleSubmit(handleAddEmployee)}>
                <div className="d-flex">
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      id="recipient-name"
                      name="Name"
                      {...register("Name", { required: true })}
                      
                      // value={employeeDt?.Name}
                      // onChange={(e) => handleChangeValue(e)}
                    />
                     {errors.Name && (
                          <p style={{ color: "red" }}>
                            Name is required.
                          </p>
                        )}
                  </div>
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label">
                      EmployeeId
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="recipient-name"
                      name="EmployeeId"
                      {...register("EmployeeId", { required: true })}
                      // value={employeeDt?.EmployeeId}
                      // onChange={(e) => handleChangeValue(e)}
                    />
                     {errors.EmployeeId && (
                          <p style={{ color: "red" }}>
                            EmployeeId is required.
                          </p>
                        )}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Address:
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    name="Address"
                    {...register("Address", { required: true })}
                    // value={employeeDt?.Address}
                    // onChange={(e) => handleChangeValue(e)}
                  ></textarea>
                   {errors.Address && (
                          <p style={{ color: "red" }}>
                            Address is required.
                          </p>
                        )}
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    <span style={{ marginRight: "458px" }}>Employee Image</span>
                  </label>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      handleEditImageClicked(e);
                    }}
                  >
                    <i class="fa-solid fa-plus fa-beat fa-2xl"></i>
                  </button>
                  <img
                    src={imageView}
                    style={{ width: "25rem", height: "15rem" }}
                  />
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    name="propertyGallery"
                    // value={employeeDt?.propertyGallery[0]}
                    onChange={(e) => handleFileChnge(e)}
                    ref={imgBtnRef}
                  />
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
                type="submit"
                class="btn btn-primary"
                // onClick={() => handleAddEmployee()}
              >
                Submit
              </button>
            </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>

      {/* <!--Delete  Modal --> */}
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
              <h5 class="modal-title" id="exampleModalLabel">
                delete Employee Record
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

      {/* update Modal */}
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
              <h5 class="modal-title" id="exampleModalLabel">
                Update Employee
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
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      id="recipient-name"
                      name="Name"
                      value={employee?.Name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label">
                      EmployeeId
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="recipient-name"
                      name="EmployeeId"
                      value={employee?.EmployeeId}
                      onChange={(e) => handleChange(e)}
                      //   value={headQuarter.Email}
                      //   onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Address:
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    name="Address"
                    value={employee?.Address}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    <span style={{ marginRight: "458px" }}>Employee Image</span>
                  </label>
                  <button
                    className="btn"
                    onClick={(e) => {
                      handleEditImageClick(e);
                    }}
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <img
                    src={imagePreview}
                    style={{ width: "25rem", height: "15rem" }}
                  />
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    name="propertyGallery"
                    // value={employee.propertyGallery[0]}
                    onChange={(e) => handleFileChange(e)}
                    ref={imageBtnRef}
                  />
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
    </div>
  );
}

export default Employee;
