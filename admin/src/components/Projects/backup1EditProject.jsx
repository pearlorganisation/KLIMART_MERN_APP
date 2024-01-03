import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef } from "react";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";
import Select from "react-select";
import { instance } from "../../services/axiosInstance";
import "./Project.css";
import { Country, State, City } from "country-state-city";

const EditProject = (props) => {
  console.log("props?.data ***" , props?.data)
  const formData = new FormData();
  const bannerOneField = useRef(null);
  const heroField = useRef(null);
  const bannerTwoField = useRef(null);
  const Galleryfield = useRef(null);
  const closeBtnRef = useRef();

  const { isLoadingTag, setIsLoadingTag, setProjectState } =
    useContext(AppContext);
  const [editabledata, setEditableData] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [id, setId] = useState();
  const [modal1, setModal1] = useState();
  const [DefaultGallery, setDefaultGallery] = useState("");
  const [propertyGalleryImages, setPropertyGalleryImages] = useState("");
  const [selectedImagesLength, setSelectedImagesLength] = useState("");
  const [tagsdata, setTags] = useState();
  const [defaultTag, setDefaultTag] = useState();
  const [selectedtags, setSelectedOptions] = useState();
  const [isLoading, setLoading] = useState(false);
  const [heroImagePreview, setHeroImagePreview] = useState();
  const [heroImageFile, setHeroImageFile] = useState({});
  const [banner1ImagePreview, setBanner1ImagePreview] = useState();
  const [banner1ImageFile, setBanner1ImageFile] = useState();
  const [banner2ImagePreview, setBanner2ImagePreview] = useState();

  const [banner2ImageFile, setBanner2ImageFile] = useState();
  const [galleryImagesPreview, setGalleryImagesPreview] = useState([]);
  const [flagForBanner1, setFlagForBanner1] = useState(false);
  const [flagForBanner2, setFlagForBanner2] = useState(false);
  const [flagForHeroImg, setFlagForHeroImg] = useState(false);
  const [flagForGalleryImg, setFlagForGalleryImg] = useState(false);
  const [isType, setIsType] = useState("");
  const [createType, setCreateType] = useState([]);
  const [stateAllName, setStateAllName] = useState([]);
  const [deleteImgFromGalleryflag , setDeleteImgFromGalleryflag] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    reset();
    setEditableData(props?.data);
    setBanner1ImagePreview(props?.data?.picOne);
    setHeroImagePreview(props?.data?.heroImg);
    setBanner2ImagePreview(props?.data?.picTwo);
    setBanner1ImageFile(props?.data?.picOne);
    setHeroImageFile(props?.data?.heroImg);
    setBanner2ImageFile(props?.data?.picTwo);

    // setImagePreview(props.data.heroImg);
    setId(props.selectedId);
    setModal1(props.modal);
    getAllTags();
  }, [props.data]);
  const handleGetAllStates = () => {
    let statee = State.getStatesOfCountry("IN");
    let stateArr = [];
    statee?.forEach((stateName) => {
      stateArr.push(stateName?.name);
      // //("stateArr Inner" , stateArr)
    });
    // //("stateArr Outer" , stateArr)
    setStateAllName(stateArr);
  };

  useEffect(() => {
    handleDefaultGalleryImages();
    handleGetAllStates();
  }, [editabledata]);
  //("stateAllName" , stateAllName)
  const handleDefaultGalleryImages = () => {
    let imagePaths = [];
    let imagePathss = [];

    let imagePath;

    // //("default shivi");
    let ArrayOfImg = editabledata?.propertyGallery;
    //("ArrayOfImg",ArrayOfImg)

    for (let i = 0; i < ArrayOfImg?.length; i++) {
      imagePaths.push(ArrayOfImg[i]);
    }

    setGalleryImagesPreview(imagePaths);
    setPropertyGalleryImages(imagePaths);
    setDefaultGallery(imagePaths);
  };

  useEffect(() => {
    if (tagsdata && tagsdata?.length > 0 && editabledata?.type) {
      const defaultTag = tagsdata.find(
        (tag) => tag.value === editabledata.type._id
      );
      setDefaultTag(defaultTag);
    }
  }, [tagsdata, editabledata]);

  // //(editabledata, "Abhishek jaguri:::::::::::");

  const onSubmit = async (data) => {
    // //("hello world");
    // //("data ###################", data);
    setLoading(true);
    // //(data, "Checking for data$$$$$***(((())))::::::::::::");
    const { city, state, country } = data;
    const location = { city, country, state };
    const formdata = new FormData();

    const type = defaultTag ? defaultTag.value : selectedtags.value;

    delete data.city;
    delete data.state;
    delete data.country;
    

    let changeArr = [];
    let defaultArr = [];
    if (flagForHeroImg && flagForHeroImg === true) {
      //("heroImageFile",heroImageFile)
      formdata.append("heroImg", heroImageFile);
      // changeArr.push(heroImageFile)
      // //("changeArr",changeArr)
    } else {
      //("heroImageFile[0]",heroImageFile[0])
      formdata.append("heroImg", heroImageFile[0]);
      // defaultArr.push(heroImageFile[0])
      // //("defaultArr",defaultArr)
    }
    if (flagForBanner1 && flagForBanner1 === true) {
      //("banner1ImageFile",banner1ImageFile)
      formdata.append("picOne", banner1ImageFile);
      changeArr.push(banner1ImageFile);
      //("changeArr",changeArr)
    } else {
      //("banner1ImageFile[0]",banner1ImageFile[0])
      formdata.append("picOne", banner1ImageFile[0]);
      defaultArr.push(banner1ImageFile[0]);
      //("defaultArr",defaultArr)
    }
    if (flagForBanner2 && flagForBanner2 === true) {
      //("banner2ImageFile",banner2ImageFile)
      formdata.append("picTwo", banner2ImageFile);
      changeArr.push(banner2ImageFile);
      //("changeArr",changeArr)
    } else {
      //("banner2ImageFile[0]",banner2ImageFile[0])
      formdata.append("picTwo", banner2ImageFile[0]);
      defaultArr.push(banner2ImageFile[0]);
      //("defaultArr",defaultArr)
    }
    console.log("propertyGalleryImages$$" , propertyGalleryImages)
   
    for (let i = 0; i < propertyGalleryImages.length; i++) {
      if (flagForGalleryImg && flagForGalleryImg === true) {
        changeArr.push(propertyGalleryImages[i]);
        //("changeArr %%" , changeArr)
      } 
      // else {
      //   defaultArr.push(propertyGalleryImages[i]);
      //   //("defaultArr %%" , defaultArr)
      // }
    }
    let defaultArrays;
    console.log("galleryImagesPreview" , galleryImagesPreview)
    if(deleteImgFromGalleryflag === true){
      let filterBlob = galleryImagesPreview.filter(url => !url.startsWith('blob'));
      defaultArrays = filterBlob;
      
    }
    else{

      defaultArrays = [...DefaultGallery];
    }

    console.log("defaultArrays**" , defaultArrays)
    //("DefaultGallery%%" , DefaultGallery)
    //("defaultArr%%" , defaultArr)
    //("defaultArrays%%" , defaultArrays)

    const pData = JSON.stringify({ ...data, location, type, defaultArrays });
    //("pData ^^6" , pData)
    formdata.append("pData", pData);
    // let allImagesInGallery = [changeArr]
    //("changeArr#" , changeArr)
    //("changeArr# " , changeArr?.length)
    for (let i = 0; i < changeArr?.length; i++) {
      //("changeArr$$" , changeArr[i])
      formdata.append("images", changeArr[i]);
    }

    try {
      const res = await instance.put(
        `/projects/${id}`,

        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      // //("res%%%::::::::::::", res);

      toast.success("Successfully Updated", { position: "top-center" });
      reset();

      // //("res.data.data.heroImg", res.data.data.heroImg);
      // setImagePreview(res.data.data.heroImg)
      closeBtnRef?.current?.click();
      setProjectState(1);

      setLoading(false);
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
      // //("error", err);
      setLoading(false);
    }
  };

  const getAllTags = async () => {
    try {
      const res = await instance.get("/types");
      if (res.status === 200) {
        // setTags(res.data.Tags);
        const dataList = res.data.data;
        // //(res.data, "res.data types");
        // //(res.data.data, "res.data.data types ");

        let arr = [];
        dataList?.map((e1) => {
          // //("e1",e1)
          arr.push({ value: e1._id, label: e1.type_name });
        });
        setTags(arr);
      }
    } catch (err) {
      //(err);
    }
  };

  // //(tagsdata, "Checking types:::::::::::::::::::::");

  const handlePropertyGalleryChange = (e) => {
    let selectedImages = e.target.files;
    // //("selectedImages@@@@@@@", selectedImages);
    let ImageFiles = [];
    // //(selectedImages, "selectedImages:::::::::::");
    setSelectedImagesLength(selectedImages.length);
    if (selectedImages.length <= 6) {
      for (let i = 0; i < selectedImages.length; i++) {
        const imageFile = URL.createObjectURL(selectedImages[i]);
        ImageFiles.push(imageFile);
      }
      //("ImageFiles", ImageFiles);
      //("selectedImages:::::::::::", selectedImages);
      //("DefaultGallery",DefaultGallery)
      let imageFiless = [...DefaultGallery, ...ImageFiles];
      //("imageFiless" , imageFiless)
      setGalleryImagesPreview(imageFiless);
      setPropertyGalleryImages(selectedImages);
      setFlagForGalleryImg(true);
    } else {
      toast.error("pls select less than equal to 6 images");
    }
  };

  const handleSelect = (data) => {
    setDefaultTag("");
    // //("data selected******************", data);
    setSelectedOptions(data);
    // setImagePreview(data.heroImage)
  };

  const handleBanner1EditButtonClick = () => {
    // inputField.current.click();
    // //("bannerOneField", bannerOneField);
    if (bannerOneField.current) {
      bannerOneField.current.click();
    } else {
      // console.error("bannerOneField is null");
    }
  };

  const handleHeroEditButtonClick = () => {
    // inputField.current.click();
    // //("heroField", heroField);
    if (heroField.current) {
      heroField.current.click();
    } else {
      // console.error("heroField is null");
    }
  };

  const handleHeroImageSelected = (e) => {
    const file = e.target.files[0];

    // const combineData = {
    //   imageData: file,
    //   imageComesFrom: uniqueName,
    // };
    // //("combineData *************** ", combineData);
    setHeroImagePreview(URL.createObjectURL(file));
    setHeroImageFile(file);
    setFlagForHeroImg(true);
  };

  useEffect(() => {
    // //("heroImageFile =============== ", heroImageFile);
    // //("banner1ImageFile =============== ", banner1ImageFile);
    // //("banner2ImageFile =============== ", banner2ImageFile);
  }, [heroImageFile, banner1ImageFile, banner2ImageFile]);

  const handleBanner1ImageSelected = (e) => {
    const file = e.target.files[0];
    // //("file>>> picOne", file);
    // const combineData = {
    //   imageData: file,
    //   imageComesFrom: uniqueName,
    // };
    // //("combineData *************** ", combineData);
    setBanner1ImagePreview(URL.createObjectURL(file));
    setBanner1ImageFile(file);
    setFlagForBanner1(true);
  };
  const handleBanner2EditButtonClick = () => {
    // bannerTwoField.current.click();
    // //("bannerTwoField", bannerTwoField);
    if (bannerTwoField.current) {
      bannerTwoField.current.click();
    } else {
      console.error("bannerTwoField is null");
    }
  };
  const handleBanner2ImageSelected = (e) => {
    const file = e.target.files[0];
    // const combineData = {
    //   imageData: file,
    //   imageComesFrom: uniqueName,
    // };
    // //("file banner Two &&&&&&&&&&&&******", file);

    setBanner2ImagePreview(URL.createObjectURL(file));
    setBanner2ImageFile(file);
    setFlagForBanner2(true);
  };
  // //("heroImageFile", heroImageFile);
  // //("banner1ImageFile", banner1ImageFile);
  const handleChange = (e) => {
    // //("editing>>>>>>>>>>$$$$***");
    // //("e.target.value", e.target.value);

    setEditableData({ ...editabledata, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    Galleryfield.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let allImagesPreview = [];
    const ImageFile = e.dataTransfer.files;
    // //("files ImagesFiles Gallery Drag and drop::::::::::", ImageFile);
    for (let i = 0; i < ImageFile.length; i++) {
      const ImageFilePreview = URL.createObjectURL(ImageFile[i]);
      allImagesPreview.push(ImageFilePreview);
    }
    // //(
    //   "allImagesPreview Gallery Drag and drop::::::::::",
    //   allImagesPreview
    // );

    setGalleryImagesPreview(allImagesPreview);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  console.log(
    editabledata?.startingDate,
    "S",
    editabledata?.completionDate,
    "E"
  );
  const handleInputChange = (inputvalue) => {
    if (inputvalue.length > 0) {
      const objData = { type_name: inputvalue };
      setCreateType(objData);
      setIsType(true);
    } else {
      setIsType(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      // console.log(createtag, "Passing value");
      // console.log("type@@" ,createtag?.type_name?.toUpperCase())
      try {
        let convertTypeUpperCase = createType?.type_name?.toUpperCase();
        let obj = { type_name: convertTypeUpperCase };
        // console.log("obj" , obj)
        // console.log(convertTypeUpperCase , "convertTypeUpperCase")
        const res = await instance.post("/types", obj, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoadingTag(1);
          toast.success(
            "Type is  Created successfully please select from dropdown"
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
  useEffect(() => {
    if (isLoadingTag === 1) {
      getAllTags();
      setIsLoadingTag(0);
    }
  }, [isLoadingTag]);
  useEffect(()=>{

  },[galleryImagesPreview])
  const handleDeleteGalleryImg = (viewImg)=>{
    console.log("viewImg" , viewImg)
    console.log("galleryImagesPreview" , galleryImagesPreview)
    // console.log("galleryImagesPreview.length" , galleryImagesPreview?.length)
    let arr = galleryImagesPreview?.filter(imgPath=>imgPath!==viewImg)

    console.log("arr" , arr)
    setGalleryImagesPreview(arr)
    // setPropertyGalleryImages(arr);
    setFlagForGalleryImg(true);
    setDeleteImgFromGalleryflag(true)
    // console.log("arr.length" , arr?.length)
    
    // galleryImagesPreview?.forEach((item)=>{
    //      console.log("item" , item)
    //      if(item===viewImg){

    //      }
    // })
    
    // alert("hello image")
  }
  console.log("galleryImagesPreview****" , galleryImagesPreview)
  console.log("propertyGalleryImages**" , propertyGalleryImages)
  return (
    <>
      {editabledata && props && (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
              Edit Project
            </h1>
            <button
              type="button"
              ref={closeBtnRef}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                reset();
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputWriter" className="form-label">
              Type
            </label>
            <div className="dropdown-container">
              <Select
                // defaultValue={defaultTag}
                options={tagsdata}
                placeholder="Select a type"
                value={defaultTag ? defaultTag : selectedtags}
                onChange={handleSelect}
                isSearchable={true}
                onInputChange={handleInputChange}
                onKeyDown={isType ? handleKeyDown : ""}
                name="types"
                // {...register("types",{required:true})}
              />
              {errors?.tags && <p style={{ color: "red" }}>Tag is required.</p>}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editabledata?.name}
              className="form-control"
              {...register("name", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.name,
              })}
            />
            {errors?.name?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                Name is required
              </p>
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="formFile" className="form-label">
                <span style={{ marginRight: "258px" }}>Hero Image</span>
                <button
                  type="button"
                  className="btn"
                  onClick={handleHeroEditButtonClick}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </label>
              {/* {heroImagePreview?.map((imgHero)=>{
                //("imgHero",imgHero)
                //("imgHero.path",imgHero.path)
                return(
                  <img
                    src={imgHero.path}
                    // alt="Image"
                    // className="image"
                    style={{ width: "25rem", height: "10rem" }}
                  />

                )

              })} */}

              {flagForHeroImg && flagForHeroImg === true ? (
                <img
                  src={heroImagePreview}
                  // alt="Image"
                  // className="image"
                  style={{ width: "25rem", height: "10rem" }}
                />
              ) : (
                heroImagePreview?.map((imghero) => {
                  // //("imghero", imghero);
                  // //("imghero.path", imghero.path);
                  return (
                    <img
                      src={imghero}
                      // alt="Image"
                      // className="image"
                      style={{ width: "25rem", height: "10rem" }}
                    />
                  );
                })
              )}

              <input
                className="form-control"
                type="file"
                id="file-input"
                style={{ display: "none" }}
                // multiple
                // value="edit"

                name="heroImg"
                onChange={(e) => {
                  // handleHeroImageSelected(e, "heroImg");
                  handleHeroImageSelected(e);
                }}
                // {...register("heroImg", {
                //   required: true,
                //   onChange : (e)=>{
                //     handleHeroImageSelected(e);
                //   }

                // })}
                ref={heroField}
              />
              {!heroImagePreview && errors.heroImg?.type === "required" && (
                <p className="small pt-1 lh-1 fw-normal text-danger">
                  Image is required
                </p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <label htmlFor="formFile" className="form-label">
                <span style={{ marginRight: "258px" }}>Banner One</span>
                <button
                  type="button"
                  className="btn"
                  onClick={handleBanner1EditButtonClick}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </label>
              {/* {banner2ImagePreview?.map((imgBanner2)=>{
                //("imgBanner2",imgBanner2)
                //("imgBanner2.path",imgBanner2.path)
                return(
                  <img
                    src={imgBanner2.path}
                    // alt="Image"
                    // className="image"
                    style={{ width: "25rem", height: "10rem" }}
                  />

                )

              })} */}
              {/* <img
                src={banner2ImagePreview}
                style={{ width: "25rem", height: "10rem" }}
              /> */}

              {flagForBanner1 && flagForBanner1 === true ? (
                <img
                  src={banner1ImagePreview}
                  // alt="Image"
                  // className="image"
                  style={{ width: "25rem", height: "10rem" }}
                />
              ) : (
                banner1ImagePreview?.map((imgBanner1) => {
                  // //("imgBanner1", imgBanner1);
                  // //("imgBanner1.path", imgBanner1.path);
                  return (
                    <img
                      src={imgBanner1}
                      // alt="Image"
                      // className="image"
                      style={{ width: "25rem", height: "10rem" }}
                    />
                  );
                })
              )}

              <input
                className="form-control"
                type="file"
                id="file-input"
                style={{ display: "none" }}
                // multiple
                name="picOne"
                onChange={(e) => {
                  // handleBanner2ImageSelected(e, "picTwo");
                  handleBanner1ImageSelected(e);
                }}
                // {...register("bannerTwo", { required: true ,
                //   onChange : (e)=>{
                //     handleBanner2ImageSelected(e);
                //   }
                //  })}
                ref={bannerOneField}
              />
              {!banner1ImagePreview && errors.picOne?.type === "required" && (
                <p className="small pt-1 lh-1 fw-normal text-danger">
                  Image is required
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="formFile" className="form-label">
                <span style={{ marginRight: "258px" }}>Banner Two</span>
                <button
                  type="button"
                  className="btn"
                  onClick={handleBanner2EditButtonClick}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </label>
              {/* {banner1ImagePreview?.map((imgBanner)=>{
                //("imgBanner",imgBanner)
                //("imgBanner.path",imgBanner.path)
                return(
                  <img
                    src={imgBanner.path}
                    // alt="Image"
                    // className="image"
                    style={{ width: "25rem", height: "10rem" }}
                  />

                )

              })} */}

              {flagForBanner2 && flagForBanner2 === true ? (
                <img
                  src={banner2ImagePreview}
                  // alt="Image"
                  // className="image"
                  style={{ width: "25rem", height: "10rem" }}
                />
              ) : (
                banner2ImagePreview?.map((imgBanner2) => {
                  // //("imgBanner2", imgBanner2);
                  // //("imgBanner2.path", imgBanner2.path);
                  return (
                    <img
                      src={imgBanner2}
                      // alt="Image"
                      // className="image"
                      style={{ width: "25rem", height: "10rem" }}
                    />
                  );
                })
              )}

              <input
                className="form-control"
                type="file"
                id="file-input"
                style={{ display: "none" }}
                // multiple
                name="picTwo"
                onChange={(e) => {
                  // handleBanner1ImageSelected(e, "picOne");
                  handleBanner2ImageSelected(e);
                }}
                // {...register("bannerOne", { required: true  , onChange : (e)=>{
                //   handleBanner1ImageSelected(e);
                // }})}
                ref={bannerTwoField}
              />
              {!banner2ImagePreview && errors.picTwo?.type === "required" && (
                <p className="small pt-1 lh-1 fw-normal text-danger">
                  Image is required
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div>
              <label htmlFor="formFile" className="form-label">
                Gallery
              </label>
              <div className="col-md-12">
                <div
                  // style={{ textAlign: "center" }}
                  className="drop-zone row"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  // onClick={handleBrowserClick}
                >
                  {
                    galleryImagesPreview?.map((viewImg) => {
                      // //("viewImg*****", viewImg);
                      return (
                        <>
                          <div className="mediaContainer col-md-4 col-sm-4 col-12">
                            <div className="imgContainer col-md-12 col-sm-12 col-12">
                              <img
                                src={viewImg}
                                alt="Gallery"
                                style={{
                                  height: "12rem",
                                  width: "12rem",
                                  margin: "10px",
                                }}
                              />
                            </div>
                            <div className="btnContainer col-md-12 col-12 col-sm-12 text-center">

                              <button type="button" className="btn btn-danger" onClick={()=>handleDeleteGalleryImg(viewImg)} >Delete</button>
                            </div>
                          </div>

                          {/* <button type="button" className="btn btn-primary" onClick={handleClick}>
                      Upload
                    </button> */}
                        </>
                      );
                    })

                    // : (
                    // <div style={{ textAlign: "center" }}>
                    //   {/* <i class="fa-solid fa-arrow-up-from-bracket fa-2xl"></i> */}
                    //   <i class="fa-sharp fa-solid fa-upload fa-beat-fade fa-2xl"></i>
                    //   <br />
                    //   <br />

                    //   <p>Choose a Image or Drag and Drop Image Here</p>
                    //   <br />
                    //   <br />
                    //   {/* <button type="button" className="btn btn-primary" onClick={handleClick}>
                    //     Upload
                    //   </button> */}
                    // </div>

                    //  )
                  }
                  <br />
                  <br />

                  <div className="uploadBtnContainer col-md-12 col-12 col-sm-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary col-md-3 col-3 col-sm-3"
                      onClick={handleClick}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <input
                className="form-control"
                type="file"
                id="file-input"
                style={{ display: "none" }}
                // value={propertyGallery[0]}
                name="propertyGallery"
                // {...register("images", {
                //   required: true,
                //   onChange : (e)=>{
                //     handlePropertyGalleryChange(e);
                //   }
                // })}
                onChange={(e) => {
                  handlePropertyGalleryChange(e);
                }}
                multiple
                ref={Galleryfield}
              />

              {!galleryImagesPreview &&
                errors.propertyGallery?.type === "required" && (
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
              // type="buildUpArea"
              className="form-control"
              id="buildUpArea"
              defaultValue={editabledata?.buildUpArea}
              name="buildUpArea"
              {...register("buildUpArea", {
                // required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.buildUpArea,
              })}
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
              // type="client"
              className="form-control"
              id="client"
              defaultValue={editabledata?.client}
              name="client"
              {...register("client", {
                // required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.client,
              })}
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
              defaultValue={editabledata?.client}
              {...register("sources", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.sources,
              })}
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
              // type="status"
              className="form-control"
              defaultValue={editabledata?.status}
              id="status"
              name="status"
              {...register("status", {
                // required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.status,
              })}
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
              id="exampleFormControlTextarea1"
              defaultValue={editabledata?.sustainableAccreditation}
              rows="3"
              name="sustainableAccreditation"
              {...register("sustainableAccreditation", {
                // required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.sustainableAccreditation,
              })}
            />
            {/* {errors.sustainableAccreditation?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                SustainableAccreditation is required
              </p>
            )} */}
          </div>
          <div className="col-12">
            <label for="exampleFormControlTextarea1" class="form-label">
              Starting Date
            </label>
            <input
              class="form-control"
              type="date"
              id="exampleFormControlTextarea1"
              defaultValue={new Date(editabledata?.startingDate)
                ?.toJSON()
                ?.slice(0, 10)}
              rows="3"
              name="startingDate"
              {...register("startingDate", {
                // required: true,
                // onChange: (e) => {
                //   handleChange(e);
                // },
              })}
            />
            {/* {errors.sustainableAccreditation?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">
                SustainableAccreditation is required
              </p>
            )} */}
          </div>
          <div className="col-12">
            <label for="exampleFormControlTextarea1" class="form-label">
              Completion Date
            </label>
            <input
              class="form-control"
              type="date"
              id="exampleFormControlTextarea1"
              defaultValue={new Date(editabledata?.completionDate)
                ?.toJSON()
                ?.slice(0, 10)}
              rows="3"
              name="completionDate"
              {...register("completionDate", {
                // required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                // value: editabledata?.completionDate,
              })}
            ></input>
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
              id="exampleFormControlTextarea1"
              rows="3"
              defaultValue={editabledata?.description}
              name="description"
              {...register("description", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.description,
              })}
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
              id="concept"
              rows="3"
              defaultValue={editabledata?.concept}
              name="concept"
              {...register("concept", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.concept,
              })}
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
              // type="text"
              className="form-control"
              defaultValue={editabledata?.location?.city}
              id="inputCity"
              name="city"
              {...register("city", {
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.location?.city,
              })}
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
              {...register("state", {
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.location?.state,
              })}
              // type="text"
              className="form-control"
              defaultValue={editabledata?.location?.state}
              id="state"
              name="state"
            />
            {/* <select
              name="state"
              id="inputState"
              defaultValue={editabledata?.location?.state}
              {...register("state", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.location?.state,
              })}
              className="form-select"
            >
              <option value={editabledata?.location?.state}>
                {editabledata?.location?.state}
              </option>
              {stateAllName?.map((stateData)=>{
              // //("stateData",stateData)
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
              {...register("country", {
                onChange: (e) => {
                  handleChange(e);
                },
                value: editabledata?.location?.country,
              })}
              // type="text"
              className="form-control"
              defaultValue={editabledata?.location?.country}
              id="country"
              name="country"
            />
            {/* {errors.country?.type === "required" && (
              <p className="small pt-1 lh-1 fw-normal text-danger">required</p>
            )} */}
          </div>
          <div className="col-12">
            {isLoading ? (
              "Loading..."
            ) : (
              <button
                // disabled={showLoader}
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default EditProject;
