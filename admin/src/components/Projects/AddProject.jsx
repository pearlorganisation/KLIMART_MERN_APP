import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm ,Controller} from "react-hook-form";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useContext } from "react";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { instance } from "../../services/axiosInstance";
import { Country, State, City }  from 'country-state-city';


const AddProject = () => {
  const [showLoader, setShowLoader] = useState(false);
  const closeBtnRef = useRef();
  const [tagdata, setTags] = useState([]);
  const [stateAllName , setStateAllName] = useState([])
  const { isLoadingTag, setIsLoadingTag, setProjectState } =
    useContext(AppContext);

  const [propertyGalleryImages, setPropertyGalleryImages] = useState("");
  const [selectedImagesLength, setSelectedImagesLength] = useState("");
  const [selectedtags, setSelectedOptions] = useState();
  const [createtag, setCreateTag] = useState([]);
  const [loading, setLoading] = useState();
  const [isTag, setIsTag] = useState(false);
  // const [heroImage , setHeroImage] = useState()
  // const [heroImage , setHeroImage] = useState()
  // const [heroImage , setHeroImage] = useState()


  // const [isloadingTag, setIsLoadingTag] = useState();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data, e) => {
    // console.log(data, "Checking data");
    e.preventDefault();
    try{setShowLoader(true);
      const { city, state, country } = data;
      const location = { city, country, state };
      const formdata = new FormData();
      // const pictureTwoFile = new File([data.bannerTwo[0]], "picTwo.jpg");
      // const pictureOneFile = new File([data.bannerOne[0]], "picOne.jpg");
      // const heroImage = new File([data.heroImg[0]], "heroImg.jpg");
      delete data.city;
      delete data.state;
      delete data.country;
      delete data.bannerOne;
      delete data.bannerOne;
      // delete data.types;
      console.log(selectedtags,"Checking selected tag");
      let type = selectedtags.value;
      console.log("type $$$$$$$$project" , type)
      console.log("type  33" , type?.type_name)
      delete data.propertyGallery;
      let allData = {
        sustainableAccreditation : data?.sustainableAccreditation,
        name : data?.name,
        buildUpArea : data?.buildUpArea,
        client : data?.client,
        status : data?.status,
        description : data?.description,
        concept : data?.concept,

      }
       data?.startingDate && (allData.startingDate=data?.startingDate)
       data?.completionDate && (allData.completionDate=data?.completionDate)
   
      // console.log("allData" , allData)
      const pData = JSON.stringify({ ...allData, location, type });
      // console.log("pData" , pData)
      // let arr = [];
      // // formdata.append("types", JSON.stringify(selectedtags.value));
      // Array.from(propertyGalleryImages).forEach((photo) => {
      //   arr.push(photo);
      // });
      // let images = [pictureOneFile, pictureTwoFile, heroImage, ...arr];
      // Array.from(images).forEach((photo) => {
      //   formdata.append("images", photo);
      // });
      // console.log("data.heroImg[0]",data.heroImg[0])
      for (let i = 0; i < propertyGalleryImages.length; i++) {
        // console.log(
        //   "propertyGalleryImages[i]::::::::::::",
        //   propertyGalleryImages[i]
        // );
  
        formdata.append("images", propertyGalleryImages[i]);
      }
      formdata.append("heroImg", data.heroImg[0]);
    formdata.append("picOne", data.picOne[0]);
    formdata.append("picTwo", data.picTwo[0]);
      formdata.append("pData", pData);
      
  
      await instance
        .post("/projects", formdata,
        //  {
        //   // headers: { "Content-Type": "multipart/form-data" },
        //   withCredentials: true,
        // }
        { withCredentials: true }
        )
        .then((res) => {
          toast.success("Project created successfully");
          setShowLoader(false);
          closeBtnRef?.current?.click();
          setProjectState(1);
          reset();
        })
        .catch((err) => {
          toast.error(err.message, { position: "top-center" });
          console.log("error", err);
          setShowLoader(false);
        });
      }
    catch(err){
      toast.error(err.message,{
        position:"top-center"
      })
      setShowLoader(false);
    }
  };

  const handlePropertyGalleryChange = (e) => {
    let selectedImages = e.target.files;
    setSelectedImagesLength(selectedImages.length);
    if (selectedImages.length <= 10) {
      setPropertyGalleryImages(selectedImages);
    } else {
      toast.error("pls select less than equal to 6 images");
    }
  };

  const getAllTags = async () => {
    try {
      const res = await instance.get("/types");
      if (res.status === 200) {
        // setTags(res.data.Tags);
        const dataList = res.data.data;
        let arr = [];
        dataList?.map((e1) => {
          // console.log("e1", e1);
          arr.push({ value: e1._id, label: e1.type_name });
        });
        setTags(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(tagdata, "Hello types::::::::::::");
  const handleSelect = (data) => {
    // console.log("data selected", data);
    setSelectedOptions(data);
  };
  const handleStates = ()=>{
    setShowLoader(true)
    let statee = State.getStatesOfCountry('IN')
    // console.log("stateee" , statee)
    let stateArr =[]
    statee?.forEach((stateName)=>{
      stateArr.push(stateName?.name)
      // console.log("stateArr Inner" , stateArr)
      
    })
    // console.log("stateArr Outer" , stateArr)
    setStateAllName(stateArr)
    setShowLoader(false)
  }

  useEffect(() => {
    getAllTags();
    handleStates()
    // console.log(Country.getAllCountries() , "country")
    // console.log(State.getAllStates() , "state")
  
  }, []);
  // console.log("stateAllName" ,stateAllName)


  useEffect(() => {
    if (isLoadingTag === 1) {
      getAllTags();
      setIsLoadingTag(0);
    }
  }, [isLoadingTag]);

  const handleInputChange = (inputvalue) => {
    if (inputvalue.length > 0) {
      const objData = { type_name: inputvalue };
      setCreateTag(objData);
      setIsTag(true);
    } else {
      setIsTag(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      // console.log(createtag, "Passing value");
      // console.log("type@@" ,createtag?.type_name?.toUpperCase())
      try {
        let convertTypeUpperCase = createtag?.type_name?.toUpperCase()
        let obj = {type_name:convertTypeUpperCase}
        // console.log("obj" , obj)
        // console.log(convertTypeUpperCase , "convertTypeUpperCase")
        const res = await instance.post("/types", obj, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoadingTag(1);
          toast.success(
            "Type is  Created successfully please select from dropdown",
           
          );
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message, {
          position: "top-center",
        });
      }
    }
  };
  // const handleChangeHeroImages = (e)=>{
  //   let file = e.target.files[0]
  //   setHeroImage(file)
  // }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
          Add Project
        </h1>
        <button
          ref={closeBtnRef}
          onClick={() => reset()}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>

      <>
        <div className="col-6">
          <label htmlFor="inputWriter" className="form-label">
            Type
          </label>
          {loading ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            <>
              <div className="dropdown-container">
                <Select
                  options={tagdata}
                  placeholder="Select a type"
                  value={selectedtags}
                  onChange={handleSelect}
                  isSearchable={true}
                  onInputChange={handleInputChange}
                  onKeyDown={isTag ? handleKeyDown : ""}
                />
                {/* {errors?.tag && (
                  <p style={{ color: "red" }}>Tag is required.</p>
                )} */}
              </div>
            </>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              Name is required
            </p>
          )}
        </div>
        <div className="col-md-6">
          <div>
            <label htmlFor="formFile" className="form-label">
              Hero Image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
             
              // multiple = "false"
              // onChange = {(e)=>{handleChangeHeroImages(e)}}
              name="heroImg"
              {...register("heroImg", { required: true })}
            />
            {errors.heroImg?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                Image is required
              </p>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <label htmlFor="formFile" className="form-label">
              Banner One
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              // multiple = "false"
              name="picOne"
              {...register("picOne", { required: true })}
            />
            {errors.bannerOne?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                Image is required
              </p>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <label htmlFor="formFile" className="form-label">
              Banner Two
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              // multiple = "false"
              name="picTwo"
              {...register("picTwo", { required: true })}
            />
            {errors.bannerTwo?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                Image is required
              </p>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <label htmlFor="formFile" className="form-label">
              Gallery
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              multiple
              name="propertyGallery"
              {...register("propertyGallery", {
                onChange: (e) => {
                  handlePropertyGalleryChange(e);
                },
                required: true,
              })}
            />
            {errors.propertyGallery?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                Image is required
              </p>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="buildUpArea" className="form-label">
            BuildUpArea
          </label>
          <input
            type="buildUpArea"
            className="form-control"
            id="buildUpArea"
            name="buildUpArea"
            {...register("buildUpArea")}
          />
          {/* {errors.buildUpArea?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              BuildUpArea is required
            </p>
          )} */}
        </div>
        <div className="col-md-6">
          <label htmlFor="client" className="form-label">
            Client
          </label>
          <input
            type="text"
            
            className="form-control"
            id="client"
            name="client"
            {...register("client")}
          />
          {/* {errors.client?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              Client is required
            </p>
          )} */}
        </div>
        {/* <div className="col-md-6">
          <label htmlFor="client" className="form-label">
            Sources
          </label>
          <input
            type="client"
            className="form-control"
            id="client"
            name="sources"
            {...register("sources", { required: true })}
          />
          {errors.sources?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              sources is required
            </p>
          )}
        </div> */}
        <div className="col-md-12">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            
            id="status"
            name="status"
            {...register("status")}
          />
          {/* {errors.status?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              Status is required
            </p>
          )} */}
        </div>
        <div className="col-12">
          <label for="exampleFormControlTextarea1" class="form-label">
            SustainableAccreditation
          </label>
          <input
            class="form-control"
            type="text"
            id="exampleFormControlTextarea1"
            rows="3"
            name="sustainableAccreditation"
            {...register("sustainableAccreditation")}
          />
          {/* {errors.sustainableAccreditation?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              SustainableAccreditation is required
            </p>
          )} */}
        </div>
        <div className="col-6">
          <label for="exampleFormControlTextarea1" class="form-label">
            Starting Date 
          </label>
          <input
           type="date"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="startingDate"
            {...register("startingDate")}
          />
          {/* {errors.sustainableAccreditation?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              SustainableAccreditation is required
            </p>
          )} */}
        </div>
        <div className="col-6">
          <label for="exampleFormControlTextarea1" class="form-label">
            Completion Date 
          </label>
          <input
            class="form-control"
            type="date"
            id="exampleFormControlTextarea1"
            rows="3"
            name="completionDate"
            {...register("completionDate")}
          />
          {/* {errors.sustainableAccreditation?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              SustainableAccreditation is required
            </p>
          )} */}
        </div>
        <div className="col-12">
          <label for="exampleFormControlTextarea1" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            type="text"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              Description is required
            </p>
          )}
        </div>
        <div className="col-12">
          <label for="concept" class="form-label">
            Concept
          </label>
          <textarea
            class="form-control"
            type="text"
            id="concept"
            rows="3"
            name="concept"
            {...register("concept", { required: true })}
          ></textarea>
          {errors.concept?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              Concept is required
            </p>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            name="city"
            {...register("city")}
          />
          {/* {errors.city?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              City is required
            </p>
          )} */}
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <input
            {...register("state")}
            type="text"
            className="form-control"
            id="state"
            // name="state"
          />
          {/* <select
            name="state"
            id="inputState"
            {...register("state", { required: true })}
            className="form-select"
          >
            <option selected>Choose...</option>
            {stateAllName?.map((stateData)=>{
              // console.log("stateData",stateData)
              return(
                <>
                <option>{stateData}</option>

                </>
              )

            })}
          </select> */}
          {/* {errors.state?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">
              State is required
            </p>
          )} */}
        </div>
        <div className="col-md-2">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            {...register("country")}
            type="text"
            className="form-control"
            id="country"
            name="country"
          />
          {/* {errors.country?.type === "required" && (
            <p className="small pt-1 lh-1 fw-normal text-danger">Country is required</p>
          )} */}
        </div>
      </>

      <div className="col-12">
        {showLoader ? (
          "Loading..."
        ) : (
          <button
            disabled={showLoader}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProject;