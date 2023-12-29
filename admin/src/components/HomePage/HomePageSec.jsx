import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import HomeModal from "../../common/HomeModal";
import './HomePage.css'

function HomePageSec() {
  const {id} = useParams()
  console.log("id###" , id)
  const {index} = useParams()
  console.log("index%%" , index)
  const [homeData, setHomeData] = useState();
  const [descData , setDescData] = useState(false)
  const [loading, setLoading] = useState(false);
  
  const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const handleHomeSection = async()=>{
    try{
      
      setDescData(false)
      setLoading(true)
      const response = await instance.get(`/homepage/${id}` ,  { withCredentials: true })
      setLoading(false)
      console.log("response @@" , response)
      setHomeData(response?.data?.data)
    }
    catch(error){
      console.log("error" , error)
    }
  }

  useEffect(() => {
    handleHomeSection()
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
      <div className="home_card">
      <strong>Home Page Section {index}</strong>
      <div class="card">
        <div class="card-body">
        <img
          src={homeData?.Image[0]}
          class="card-img-top"
          alt="..."
          style={{ height: "350px" }}
        />
          <h5 class="card-title">{homeData?.header}</h5>
          <p class="card-text">{descData ? homeData?.Desc  : homeData?.Desc?.slice(0,10)  }{"   "}
          
         {
          descData ? '' :  <span
          className="readmore"
           style={{color:'#fe5502' ,cursor:"pointer"}}
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
     
      <HomeModal homeData={homeData} onUpdateData = {handleHomeSection}/>
    </div>
      </>

    
   
  )
}

export default HomePageSec;
