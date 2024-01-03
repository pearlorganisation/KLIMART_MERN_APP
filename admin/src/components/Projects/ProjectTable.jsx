import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import axios from "axios";
import { toast } from "react-toastify";
import "./Project.css";
import EditProject from "./EditProject";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const ProjectTable = () => {
  // const [addModal, setAddModal] = useState(false);
  const [concept, setConcept] = useState("");
  const [description, setDescription] = useState("");

  const [showLoader, setShowLoader] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [EditableData, setEitableData] = useState([]);
  const [selectedid, setSelectedId] = useState();
 

  const { projectstate, setProjectState } = useContext(AppContext);

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getData = async () => {
    try {
      setShowLoader(true);
      const {
        data: { Project },
        status,
      } = await instance.get("/projects", { withCredentials: true });
      if (status === 200) {
        console.log("Project ###" , Project)

        setShowLoader(false);
        setProjectData(Project);
        //(Project,"Project:::::::::::::");
      }
    } catch (error) {
      setShowLoader(false);
      //(error.message);
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
            // setShowLoader(true);
            try {
              setShowLoader(true);

              const { data, status } = await instance.delete(
                `/projects/${id}`,
                { withCredentials: true }
              );
              if (status === 200) {
                setShowLoader(false);
                toast.success(data.Msg);
                const response = await instance.get("/projects", {
                  withCredentials: true,
                });
                if (response?.data?.status === "SUCCESS") {

                  setProjectData(response.data.Project);
                }
              }
            } catch (error) {
              setShowLoader(false);
              toast.error(error.message, { position: "bottom-center" });
              //(error.message);
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
  // //(projectData,"Checking project data");
  const getSingleProject = async (id) => {
    //(id, "Check id ");
    try {
      const res = await instance.get(`/projects/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data) {
        setEitableData(res.data.data);
        setSelectedId(id);
      }
    } catch (err) {
      //(err);
    }
  };
  //(EditableData, "Hello::::::::::::::::::::");
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (projectstate === 1) {
      getData();
      setProjectState(0);
    }
    
  }, [projectstate]);

  return (
    <>
      {showLoader ? (
        <>
          <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <Lottie
              options={defaultOptions}
              height={120}
              width={120}
              style={{ stroke: "orangered" }}
              className="loader-prog"
            />
            <p>Loading...</p>
          </div>
        </>
      ) : (
        <>
          <div className="Project-table">
            <div
              className="container "
              // style={{ overflow: "scroll" }}
            >
              <div className="mt-4 mb-4 d-flex justify-content-between align-items-center border-bottom py-2">
                {" "}
                <span className="fw-bold">Projects</span>{" "}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add
                </button>{" "}
              </div>
              <div className="scrollit"  style={{overflow : 'auto' , height : '500px' , width : '100%'}}>

           

              <table class="table table-hover">
                <thead
                  style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
                  className=""
                >
                  <tr>
                    <th className="text-center fw-bold" scope="col">
                      #
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Type
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Name
                    </th>

                    <th className="text-center fw-bold" scope="col">
                      Images
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      BuildUp Area
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      SustainableAccreditation
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Starting Date
                    </th>
                    <th className="text-center fw-bold" scope="col">
                    Completion Date
                    </th>



                    <th className="text-center fw-bold" scope="col">
                      Client
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Status
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Location
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Description
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Concept
                    </th>
                    {/* <th className="text-center fw-bold" scope="col">
                      Sources
                    </th> */}
                    <th className="text-center fw-bold" scope="col">
                      Edit
                    </th>
                    <th className="text-center fw-bold" scope="col">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {projectData?.map((item, index) => {
                    return (
                      <tr>
                        <td>{++index}</td>
                        <td>{item?.type?.type_name}</td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            style={{ width: "3rem", height: "3rem" }}
                            src={`${item.heroImg[0]}`}
                            alt=""
                          />
                        </td>
                        <td>{item?.buildUpArea}</td>
                        <td>{item?.sustainableAccreditation}</td>
                        <td>{item?.startingDate}</td>
                        <td>{item?.completionDate}</td>
                        
                        <td>{item?.client}</td>
                        <td>{item?.status}</td>
                        
                        <td
                          style={{ width: "12rem" }}
                        >{`${item?.location?.city} ${item?.location?.state} ${item?.location?.country}`}</td>
                        <td style={{ width: "10rem" }} className="">
                          {item?.description?.slice(0, 10)}{" "}
                          <span
                            className="readmore"
                            data-bs-toggle="modal"
                            data-bs-target={`#descriptionModal`}
                            onClick={() => {
                              setDescription(item?.description);
                            }}
                          >
                            Read More...
                          </span>
                        </td>
                        <td style={{ width: "12rem" }} className="">
                          {item?.concept?.slice(0, 10)}{" "}
                          <span
                            onClick={() => {
                              setConcept(item?.concept);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target={`#conceptModal`}
                            className="readmore"
                          >
                            Read More...
                          </span>
                        </td>
                        {/* <td>{item.sources}</td> */}
                        <td>
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                            onClick={() => getSingleProject(item._id)}
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            disabled={showLoader}
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
              </table>

              {/* descripton modal */}
              <div
                class="modal fade"
                id={`descriptionModal`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content" style={{ background: "#F4F5F7" }}>
                    <div
                      class="modal-header"
                      style={{ borderBottom: "2px solid #B2BCD1" }}
                    >
                      <h1
                        class="modal-title fs-5"
                        id="exampleModalLabel"
                        style={{ color: "black" }}
                      >
                        Description
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">{description}</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* concept modal */}
              <div
                class="modal fade"
                id={`conceptModal`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content" style={{ background: "#F4F5F7" }}>
                    <div
                      class="modal-header"
                      style={{ borderBottom: "2px solid #B2BCD1" }}
                    >
                      <h1
                        class="modal-title fs-5"
                        id="exampleModalLabel"
                        style={{ color: "black" }}
                      >
                        Concept
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">{concept}</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* add project modal */}
              <div className="project_form">
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      {/* <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-dark"
                    id="exampleModalLabel"
                  >
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div> */}
                      {/* add project form */}
                      <div className="modal-body">
                        <AddProject />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project_form">
                <div
                  className="modal fade"
                  id="exampleModal1"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body">
                        <EditProject
                          data={EditableData}
                          selectedId={selectedid}
                          // Refresh={refresh}
                          // modal={modal}
                          // closeModal={() => setModal(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectTable;