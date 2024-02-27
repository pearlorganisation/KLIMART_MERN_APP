import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { instance } from "../services/axiosInstance";




function HomeModal({homeData , onUpdateData}) {
  const [updateData, setUpdateData] = useState(homeData);
  const [imageFile, setImageFile] = useState(); 
  const [imagePreview, setImagePreview] = useState();
 
  
  const closeUpdateBtnRef = useRef(null)
  const imageFieldRef = useRef(null)


 
  

  useEffect(()=>{
    setUpdateData(homeData)
    setImagePreview(homeData?.Image[0])
    
    
  },[homeData])
 
  const handleUpdate = async()=>{
    try{
      closeUpdateBtnRef.current.click()


      const formData = new FormData()
      formData.append("header", updateData?.header);
      formData.append("Desc", updateData?.Desc);
      formData.append("images", imageFile )
      console.log("props?.updateData?._id" , homeData?._id)
  
      const {data} = await instance.put(`/homepage/${homeData?._id}` , formData , {withCredentials:true})   
     
      console.log("response %%",data)
      if(data.success){
  
        onUpdateData()
        toast.success("data is updated successfully")
      }

    }
    catch(err){
      toast.error(err)
      console.log("error" , err)
    }
     
  }

  const handleChange = (e)=>{
    setUpdateData({...updateData , [e.target.name] : e.target.value})
  }

  const handleEditImageClicked = (e)=>{
    e.preventDefault()
    imageFieldRef.current.click()
    
  }
  const handleImageFile = (e)=>{
    setImageFile(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
  

  return (
    <>
    <div>
    <div
      class="modal fade"
      id="EditModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit
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
           {updateData && updateData._id==="65252831918cbfd4f1956241" ? " ":
           <>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Header
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  name="header"
                  value={updateData?.header}
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
           </>}
           {updateData && updateData._id==="65262ae91e3553e2dfce821d" ? " ":
             <div class="mb-3">
             <label for="message-text" class="col-form-label">
               Description
             </label>
             <textarea
               class="form-control"
               id="message-text"
               name="Desc"
               value={updateData?.Desc}
               onChange={(e)=>{handleChange(e)}}
             ></textarea>
           </div>}
            
              <div class="mb-3">
                {updateData && updateData._id==="65252831918cbfd4f1956241" ||updateData._id=== "652e2edf2b52017bc754d105" ? " ":
                <>
                 <label for="recipient-name" class="col-form-label" >
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
                  name="Image"
                  onChange={(e)=>handleImageFile(e)}
                  ref={imageFieldRef}
                />
                </>}
               
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
            <button type="button" class="btn btn-primary" onClick={()=>handleUpdate()}>
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

export default HomeModal;
