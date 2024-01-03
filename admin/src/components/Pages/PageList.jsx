import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";

const PageList = () => {
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

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
      .get("/pages", { withCredentials: true })
      .then((res) => {
        console.log("res blogTable", res);
        console.log("res.data.page blogTable", res.data.page);
        setShowLoader(false);
        setList(res.data.page);
      })
      .catch((err) => {
        toast.error(err.message);
        setShowLoader(false);
        console.log("err", err);
      });
  };

  const handleUpdate = (id) => {
    navigate("/update-page", { state: id });
  };
  const changePage = () => {
    navigate("/add-page");
  };

  return (
    <>
      {showLoader ? (
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
      ) : (
        <>
          <div
            className="container"
            style={{ padding: "10px", margin: "0 auto" }}
          >
            <div className="row">
              <div className="mt-4 mb-4 d-flex justify-content-between align-items-center border-bottom py-2">
                <div className="col-md-6">
                  <span className="fw-bold ">Pages</span>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-row-reverse">
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
                <table className="table table-hover">
                  <thead
                    className="table-heading"
                    style={{ backgroundColor: "#E9ECEF", color: "#071739" }}
                  >
                    <tr className="table-active">
                      <th scope="col">S.No.</th>
                      <th scope="col">Page Name</th>
                      <th scope="col">Content</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {[...list]?.reverse().map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{`${index + 1}`}</td>
                          <td>{item.page_name}</td>
                          <td>
                            <button
                              onClick={() => {
                                setContent(
                                  ReactHtmlParser(JSON.parse(item.content))
                                );
                              }}
                              className="btn"
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
                              onClick={() => {
                                handleUpdate(item._id);
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

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
                    <div
                      class="modal-content"
                      style={{ background: "#F4F5F7" }}
                    >
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
      )}
    </>
  );
};

export default PageList;
