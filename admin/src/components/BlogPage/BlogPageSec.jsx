import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import CommonModal from "../../common/CommonModal";
import './BlogPageSec.css'


function BlogPageSec() {
  const {id} = useParams()
  console.log("id###" , id)
  const {index} = useParams()
  console.log("index%%" , index)
  const [getData, setGetData] = useState();
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
  
  const handleSection = async()=>{
    setDescData(false)
    setLoading(true)
    const response = await instance.get(`/blogpage/${id}` ,  { withCredentials: true })
    setLoading(false)
   console.log("response @@" , response)
   setGetData(response?.data?.data)
  }

  useEffect(() => {
    handleSection()
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
      <strong>Blog Page Section {index}</strong>
      <div class="card">
        <div class="card-body">
        <img
          src={getData?.Image[0]}
          class="card-img-top"
          alt="..."
          style={{ height: "250px" }}
        />
          <h5 class="card-title">{getData?.header}</h5>
          <p class="card-text"> {descData ? getData?.Desc  : getData?.Desc?.slice(0,10)  }{"   "}
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
      <CommonModal getData={getData} onUpdateData = {handleSection} pathUrl= "blogpage"/>
    </div>
      </>

    
   
  )
}

export default BlogPageSec;
