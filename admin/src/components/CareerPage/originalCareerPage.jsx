import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";
import { instance } from "../../services/axiosInstance";
import './CareerPageSec.css'

function CareerPageSec1() {
  const [careerData, setCareerData] = useState([]);
  const [careerPageData, setCareerPageData] = useState();
  const [imagePreview, setImagePreview] = useState();
   const [imageFile, setImageFile] = useState();
   
   const [idValue , setIdValue]  = useState()
   const [loading, setLoading] = useState(false);
   const [descData , setDescData] = useState(false)
   const closeUpdateBtnRef = useRef()
   const closeBtnRef = useRef()


   const defaultOptions = {
    loop: true,
    autoplay: { setLoading },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getAllCareerSec1 = async () => {
    const response = await instance.get("/careerpage" ,  { withCredentials: true });
    console.log("response", response);
    setCareerData(response?.data?.data);
  };
  const handleGetId = (id) => {
    console.log("id", id);
    setIdValue(id)
    try{
      const getCareerPageDataById = async () => {
        const response = await instance.get(
          `/careerpage/${id}`,
          { withCredentials: true }
        );
        setDescData(false)
        console.log("response $$", response);
        setCareerPageData(response?.data?.data);
        setImagePreview(response?.data?.data?.propertyGallery[0]);
      };
      getCareerPageDataById();
    }
    catch(err){
      console.log("err" , err)
    }
  };
  const handleUpdate = async()=>{
    try{
      closeBtnRef.current.click()
      const formData = new FormData()
      formData.append("header", careerPageData?.header);
      formData.append("Desc", careerPageData?.Desc);
      formData.append("images", imageFile )
      const response = await instance.put(`/careerpage/${idValue}` , formData ,  { withCredentials: true } )
      console.log("response", response)
      toast.success("data is updated successfully")
      getAllCareerSec1()
    }
    catch(err){
      console.log("err" , err)
    }

  }
  const handleImageFile = (e)=>{
    setImageFile(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
  const handleChange  = (e)=>{
    setCareerPageData({...careerPageData , [e.target.name]:e.target.value})
  }
  const handleEditImageClicked = (e)=>{
    e.preventDefault()
    closeUpdateBtnRef.current.click()
    
  }
  useEffect(() => {
    getAllCareerSec1();

    // setImagePreview(careerPageData?.propertyGallery)
  }, []);
  console.log("careerPageData", careerPageData);
  // console.log("careerPageData?.propertyGallery",careerPageData?.propertyGallery)
  console.log("imagePreview", imagePreview);
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
    <div className="career_card">
    <strong>Career Page Section 1</strong>
    <div class="card">
      {careerData?.map((item) => {
        console.log("item ***" , item?.Desc)
        return (
          <>
            <div class="card-body">
            <img
              src={item?.propertyGallery}
              class="card-img-top"
              alt="Image"
              style={{ height: "350px"}}

            />
              <h5 class="card-title">{item?.header}</h5>
              <p class="card-text">{descData ? item?.Desc : item?.Desc?.slice(0,10)}{" "}
           {descData? '' : 
           <span className="readmore" onClick={()=>{setDescData(!descData)}}>
            Read more...
            </span>}              
              </p>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#careerPageSection1"
                data-bs-whatever="@mdo"
                onClick={() => handleGetId(item._id)}
              >
                Edit
              </button>
            </div>
          </>
        );
      })}
    </div>
    <div
      class="modal fade"
      id="careerPageSection1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Career Career Page Section 1
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref= {closeBtnRef}
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Header
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  name="header"
                  value={careerPageData?.header}
                  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  id="message-text"
                  rows="8"
                  name="Desc"
                  value={careerPageData?.Desc}
                  onChange={(e)=>handleChange(e)}
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  <span style={{ marginRight: "458px" }}>Image</span>
                </label>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleEditImageClicked(e);
                  }}
                >
                  <i class="fa-sharp fa-solid fa-pencil fa-beat fa-lg"></i>
                </button>
                <img
                  src={imagePreview}
                  style={{ width: "25rem", height: "15rem" }}
                />
                <input
                  type="file"
                  class="file-input"
                  style={{ display: "none" }}
                  id="recipient-name"
                  name="propertyGallery"
                  onChange={(e)=>handleImageFile(e)}
                  ref={closeUpdateBtnRef}
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
    </>
  )
   
  
}

export default CareerPageSec1;
