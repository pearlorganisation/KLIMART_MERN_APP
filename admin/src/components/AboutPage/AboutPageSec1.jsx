import React from "react";
import Modal from "../../common/Modal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import './AboutPageSec.css'

function AboutPageSec1() {
  const {id} = useParams()
  console.log("id###" , id)
  const {index} = useParams()
  console.log("index%%" , index)
  const [aboutData, setAboutData] = useState();
  const [loading, setLoading] = useState(false);
  const [descData , setDescData] = useState(false)
  
  const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const handleAboutSection = async()=>{
    setDescData(false)
    setLoading(true)
    const response = await instance.get(`/aboutpage/${id}` ,  { withCredentials: true })
    setLoading(false)
   console.log("response @@" , response)
    setAboutData(response?.data?.data)
  }

  useEffect(() => {
    handleAboutSection()
  }, [id , index])


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

    ):(
      <>
      <div className="about_card">
      <strong>About Page Section {index}</strong>
      <div class="card">
        <div class="card-body">
        <img
          src={aboutData?.Image[0]}
          class="card-img-top"
          alt="..."
          style={{ height: "250px" }}
        />
          <h5 class="card-title">{aboutData?.header}</h5>
          <p class="card-text"> {descData ? aboutData?.Desc  : aboutData?.Desc?.slice(0,10)  }{"   "}
          {/* {console.log("descData**" , descData)} */}
          {
          descData ? '' :  <span
          className="readmore"
           style={{color:'#fe5502',cursor:"pointer"}}
           onClick={()=>{setDescData(!descData)}}
          
          >   
          
               Read more...
          </span>
         }
          </p>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#EditModal"
            data-bs-whatever="@mdo"
        
          >
            Edit
          </button>
        </div>
      </div>
      <Modal aboutData={aboutData} onUpdateData = {handleAboutSection}/>
    </div>
      </>

    
   
  )
}

export default AboutPageSec1;
