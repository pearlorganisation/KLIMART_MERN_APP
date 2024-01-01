import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import { useForm } from 'react-hook-form';

function CurrentVacancies() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDt, setEmployeeDt] = useState();

  const [deleteIdValue, setDeleteIdValue] = useState();
  const [employee, setEmployee] = useState();
 
  const closeUpdateBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const closeAddBtnRef = useRef(null);
 const [descriptions , setDescriptions] = useState('')
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
      const response = await instance.get("/currentVacancies" , {withCredentials:true});
      console.log("response", response);
      setLoading(false)
      setEmployeeData(response?.data?.data);
    } catch (err) {
      console.log("err", err);
      toast.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      closeUpdateBtnRef.current.click();
      setLoading(true)
      const response = await instance.put(
        `/currentVacancies/${employee._id}`,
        employee,
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
    
      const response = await instance.post(
        "/currentVacancies",
        data,
        {withCredentials:true}

      );
      setLoading(false)
      reset()
      
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
        `/currentVacancies/${deleteIdValue}`,
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
      <strong>Current Vacancies</strong>
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
            <th scope="col">Role</th>
            <th scope="col">Experience</th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>

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
                  <td>{item?.role}</td>
                  <td>{item?.experience} YEARS EXPERIENCE</td>
                  <td>{item?.location}</td>
                  <td>
                    {console.log("descriptions" , descriptions)}
                  {descriptions.includes(index) ? item?.description :  item?.description?.slice(0,10)}

                {descriptions.includes(index) ? ("") : <span onClick={()=>setDescriptions([index])} style={{color : "red"}}>  Read more</span>}
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
                Add Current Vacancies
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
                    <label  className="col-form-label ">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      
                      name="role"
                      {...register("role", { required: true })}
                      
                      // value={employeeDt?.Name}
                      // onChange={(e) => handleChangeValue(e)}
                    />
                     {errors.role && (
                          <p style={{ color: "red" }}>
                            Role is required.
                          </p>
                        )}
                  </div>
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label">
                      Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="experience"
                      {...register("experience", { required: true })}
                      // value={employeeDt?.EmployeeId}
                      // onChange={(e) => handleChangeValue(e)}
                    />
                     {errors.experience && (
                          <p style={{ color: "red" }}>
                            Experience is required.
                          </p>
                        )}
                  </div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">
                    Location
                  </label>
                      <textarea
                    type="text"
                    className="form-control"
                   
                    name="location"
                    {...register("location", { required: true })}
                  ></textarea>
                   {errors.location && (
                          <p style={{ color: "red" }}>
                            Location is required.
                          </p>
                        )}
                </div>
                  <div class="mb-3">
                  <label class="col-form-label">
                    Description
                  </label>
                      <textarea
                      rows={"5"}
                    type="text"
                    className="form-control"
                   
                    name="description"
                    {...register("description", { required: true })}
                  ></textarea>
                   {errors.description && (
                          <p style={{ color: "red" }}>
                            Description is required.
                          </p>
                        )}
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
                delete Current Vacancies Record
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
                Update Current Vacancies
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
                    <label className="col-form-label ">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      
                      name="role"
                      value={employee?.role}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6 mb-3 px-1">
                    <label for="recipient-name" className="col-form-label">
                      Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                     
                      name="experience"
                      value={employee?.experience}
                      onChange={(e) => handleChange(e)}
                      //   value={headQuarter.Email}
                      //   onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label  class="col-form-label">
                    Location
                  </label>
                  <textarea
                    class="form-control"
                    name="location"
                    value={employee?.location}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label  class="col-form-label">
                    Description
                  </label>
                  <textarea
                   rows={"5"}
                    class="form-control"
                    name="description"
                    value={employee?.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
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

export default CurrentVacancies;
