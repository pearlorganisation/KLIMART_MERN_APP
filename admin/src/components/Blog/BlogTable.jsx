import React, { useEffect, useRef, useState, useTransition } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import './Blog.css'

const BlogTable = () => {
  const closeBtn = useRef();
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [blogId, setBlogId] = useState();
  const [sourcesData , setSourcesData] = useState()
  const [subTopicData , setSubtopicData] = useState()
  
  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  let navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    setShowLoader(true);
    await instance
      .get("/blog", { withCredentials: true })
      .then((res) => {
        console.log("res blogTable", res);
        console.log("res.data blogTable", res.data.blog);
        setShowLoader(false);
        setList(res.data.blog);
      })
      .catch((err) => {
        toast.error(err.message);
        setShowLoader(false);
        console.log("err", err);
      });
  };

  const handleUpdate = (id) => {
    navigate("/update-blog", { state: id });
  };
  const changePage = () => {
    navigate("/add-blog");
  };
  const handleDelete = () => {
    console.log("blogId::::::::::", blogId);
    if (blogId) {
      instance
        .delete(`/blog/${blogId}`, { withCredentials: true })
        .then((res) => {
          // alert("data is deleted successfully")
          // toast.success('blog is deleted successfully', { position: "top-center" })
          setData(list);
          closeBtn.current.click();
          toast.success("blog is deleted successfully", {
            position: "top-center",
          });
          console.log("res blogTable delete", res);
          console.log("res.data blogTable delete", res.data);
        })
        .catch((err) => {
          toast.error(err.message, { position: "top-center" });
          console.log("err", err);
        });
    }
  };
  const handleSetIdForDelete = (id) => {
    setBlogId(id);
  };
  console.log("sources:::::::::::::::::::::",sourcesData)
  console.log("list" , list)
  // console.log("...list" , [...list])
  return (
    <>
      <div className="container" style={{ padding: "10px", margin: "0 auto" }}>
        <div className="row">
          <div className="mt-4 mb-4 d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="row col-md-12">
              <span className="fw-bold col-md-6">Blogs</span>
              <div className="col-12 col-md-6 d-flex flex-row-reverse">
                <button
                  className="btn btn-primary float-right"
                  onClick={changePage}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div
            class="scrollit"
            style={{
              overflow: "auto",
              height: "500px",
              width: "1330px",
            }}
          >
            {showLoader ? (
              // <div>Loading....</div>
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
              <table className="table table-hover">
                <thead className="table-light">
                  <tr className="table-active">
                    <th scope="col">S.No.</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Topic</th>
                    <th scope="col">Subtopic</th>
                    <th scope="col">Writer</th>
                    <th scope="col">Sources</th>
                    <th scope="col">Images</th>
                    <th scope="col">Content</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {list?.reverse().map((item, index) => {
                 
                    

                    // setBlogId(item._id)
                    // let contentValue = JSON.parse(JSON.stringify(item.content))
                    // console.log("contentValue" , contentValue)
                    // const contentData = ReactHtmlParser(contentValue);
                    // console.log("contentData",contentData)
                    return (
                      <tr key={index}>
                        <td>{`${index + 1}`}</td>
                        <td>
                          {item?.tags?.map((tagName, i) => {
                            return (
                              <>
                                {console.log("tagName::::::::", tagName)}

                                {`${tagName.tags_name} ${
                                  i == item.tags.length - 1 ? "" : ","
                                } `}
                                {/* {`${tagName.replace(/,\s*$/, "")}`} */}
                                {/* {console.log("tagName.length::::::::::::::::" , tagName.tags_name.length)}
                                                                {console.log("index1::::::::::::::::" , index1)} */}

                                {/* {tagName.tags_name.length > index1 ? `${tagName.tags_name}  , ` : `${tagName.tags_name}`} */}
                              </>
                            );
                          })}
                        </td>
                       

                        <td>{item.topic}</td>
                        <td>{item.subTopic?.slice(0,10)}{"  "}
                        
                        <span
                          className="readmore"
                            data-bs-toggle="modal"
                            data-bs-target="#subTopicModal"
                            onClick={()=>{setSubtopicData(item?.subTopic)}}
                          
                          >
                               Read more...
                          </span>
                        </td>
                        <td>{item.writer}</td>
                        {/* <td>{item.sources}</td> */}
                        <td>
                        {item?.sources?.slice(0,5)}{"   "}
                          <span
                          className="readmore"
                            data-bs-toggle="modal"
                            data-bs-target="#sourcesModal"
                            onClick={()=>{setSourcesData(item?.sources)}}
                          >
                            Read more...
                          </span>

                        </td>

                        <td>
                          {" "}
                          <img
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "50px",
                            }}
                            src={item.propertyGallery}
                            alt=""
                          />
                        </td>
                        {/* <td className="col-md-2" >
                                                {contentData}
                                            </td> */}
                        <td>
                          <button
                            style={{ fontSize: "15px" }}
                            onClick={() => {
                              setContent(
                                ReactHtmlParser(JSON.parse(item.content))
                              );
                            }}
                            className="btn "
                            data-bs-toggle="modal"
                            data-bs-target=".bd-example-modal-xl"
                            type="button"
                          >
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => handleUpdate(item._id)}
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                        {/* <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        <i class="fa-solid fa-trash"></i>
                                                    </button> */}
                        <td>
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              handleSetIdForDelete(item._id);
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* delette */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-top">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      id="exampleModalLabel"
                      style={{ color: "black" }}
                    >
                      Delete Record
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <h3>Are you sure you want to delete this blog</h3>
                  </div>
                  <div class="modal-footer">
                    <button
                      ref={closeBtn}
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
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Sources --> */}
            <div
              class="modal fade"
              id="sourcesModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5>
                     Sources
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">{sourcesData}</div>
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


            {/* sub topic  */}

            <div
              class="modal fade"
              id="subTopicModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5>
                     Subtopic 
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">{subTopicData}</div>
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

            {/* content modals */}
            <div
              class="modal fade bd-example-modal-xl"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-xl modal-dialog-centered"
                style={{ minWidth: "90%", margin: "0 auto" }}
              >
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
                      Content
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body"> {content} </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTable;