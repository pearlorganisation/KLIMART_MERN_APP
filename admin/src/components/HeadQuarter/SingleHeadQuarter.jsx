import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import { instance } from "../../services/axiosInstance";
function SingleHeadQuarter() {
  const [headQuarterData, setHeadQuarterData] = useState([]);
  const [headQuarter, setHeadQuarter] = useState([]);
  const [idValue, setIdValue] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const closeBtnRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getHeadQuarterData = async () => {
    try {
      const response = await instance.get(
        "/headqaurter",
        {withCredentials:true}
      );

      console.log("response headquarter", response);
      setHeadQuarterData(response.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleGetId = (id) => {
    setIdValue(id);
    const getHeadQuarterDataById = async () => {
      try {
        const response = await instance.get(
          `/headqaurter/${id}`,
          {withCredentials:true}
        );
        console.log("response headquarter", response);
        setHeadQuarter(response.data.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    getHeadQuarterDataById();
  };
  const handleChange = (e) => {
    setHeadQuarter({ ...headQuarter, [e.target.name]: e.target.value });
  };
  const handleUpdate = async () => {
    try {
      closeBtnRef.current.click();
      setShowLoader(true);
      const response = await instance.put(
        `/headqaurter/${idValue}`,
        headQuarter,
        {withCredentials:true}
      );
      setShowLoader(false);
      // console.log("response update",response)

      toast.success("headquarter is updated successfully");
      getHeadQuarterData();

      // if(response.data.status==="SUCCESS"){
      // }
    } catch (err) {
      setShowLoader(false)
      toast.error(err)
      console.log("err", err);
    }
  };
  useEffect(() => {
    getHeadQuarterData();
  }, []);
  console.log("headQuarter", headQuarter);
  // console.log("headQuarter name",headQuarter?.OfficeName)
  console.log("idValue", idValue);
  return (
    <div>
      <div class="row">
        <div class="col-sm-6 mt-4">
          <div class="card">
            <div class="headquad">
              <strong>Headquarter</strong>
              {headQuarterData?.map((item) => {
                return (
                  <>
                    <p>
                      {" "}
                      {item?.OfficeName} - {item?.City}
                    </p>
                    <p>
                      {item?.Address1}, {item?.Address2} , {item?.City}{" "}
                      {item?.State}- {item?.Pincode}
                    </p>
                    <p>{item?.Email}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                      onClick={() => handleGetId(item._id)}
                    >
                      Update Headquarter
                    </button>
                  </>
                );
              })}
              {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
            </div>
          </div>
        </div>
      </div>
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
          
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Head Qurater
                  </h5>
                  <button
                    type="button"
                    ref={closeBtnRef}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3 px-1">
                        <label for="recipient-name" className="col-form-label ">
                          OfficeName
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          id="recipient-name"
                          name="OfficeName"
                          value={headQuarter.OfficeName}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="col-md-6 mb-3 px-1">
                        <label for="recipient-name" className="col-form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="Email"
                          value={headQuarter.Email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="message-text" className="col-form-label">
                        Address1
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        name="Address1"
                        value={headQuarter.Address1}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label for="message-text" className="col-form-label">
                        Address2
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        name="Address2"
                        value={headQuarter.Address2}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="City"
                        value={headQuarter.City}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3 px-1">
                        <label for="recipient-name" className="col-form-label">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="State"
                          value={headQuarter.State}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="col-md-6 mb-3 px-1">
                        <label for="recipient-name" className="col-form-label">
                          Pincode
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="recipient-name"
                          name="Pincode"
                          value={headQuarter.Pincode}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleUpdate()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleHeadQuarter;
