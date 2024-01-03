import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";

import CommonContentModal from "../../common/CommonContentModal";
// import './BlogPageSec.css'

function KlimART() {
  const { id } = useParams();
  //console.log("id###" , id)
  const { index } = useParams();
  //console.log("index%%" , index)
  const [getData, setGetData] = useState([]);
  const [idValue, setIdValue] = useState();

  const [loading, setLoading] = useState(false);
  const [descData, setDescData] = useState([]);
  //   const [IdValue , setIdValue] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSection = async () => {
    setLoading(true);
    const response = await instance.get(`/klimART`, { withCredentials: true });
    setLoading(false);
    //console.log("response @@" , response)
    setGetData(response?.data?.data);
  };

  useEffect(() => {
    handleSection();
  }, []);

  return loading ? (
    <>
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
    </>
  ) : (
    <>
      <strong> KlimART</strong>
      <div className="about_card d-flex justify-content-start my-5 ">
        {getData?.map((item, index) => {
          return (
            <div className="mx-5">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{item?.header}</h5>
                  {/* <p class="card-text"> {descData ? item?.Desc  : item?.Desc?.slice(0,10)  }{"   "} */}
                  <p class="card-text">
                    {" "}
                    {descData.includes(index)
                      ? item?.Desc
                      : item?.Desc?.slice(0, 10)}
                    {"   "}
                    {/* {//console.log("descData**" , descData)} */}
                    {descData.includes(index) ? (
                      ""
                    ) : (
                      <span
                        className="readmore"
                        style={{ color: "#fe5502", cursor: "pointer" }}
                        onClick={() => {
                          setDescData([index]);
                        }}
                      >
                        Read more...
                      </span>
                    )}
                  </p>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#EditModal"
                    data-bs-whatever="@mdo"
                    onClick={() => setIdValue(item._id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <CommonContentModal
          idValue={idValue}
          onUpdateData={handleSection}
          pathUrl="klimART"
        />
      </div>
    </>
  );
}

export default KlimART;
