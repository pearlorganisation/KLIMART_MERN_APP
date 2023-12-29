import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-select";
import { instance } from "../../services/axiosInstance";
import Lottie from "react-lottie";
import animation from "../../Lottie/Loader.json";

const UpdateBlog = () => {
  let location = useLocation();
  let id = location.state;
  console.log("location", location);
  const { register, handleSubmit, setValue } = useForm();
  const [data, setData] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [listOfTagsData, setListOfTagsData] = useState([]);
  const [listOfMainTag , setListOfMainTag] = useState([])
  const [defaultTagsValue, setDefaultTagsValue] = useState();
  const [defaultMainTag , setDefaultMainTag] = useState()
  const [selectedOptionsMainTag , setSelectedOptionsMainTag] = useState()
  const [imageFile, setImageFile] = useState(null);

  // const [defaultImagePreview,setDefaultImagePreview] = useState()
  const editor = useRef(null);
  const navigate = useNavigate();
  const reader = new FileReader();
  const propertyGalleryField = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: { showLoader },
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setShowLoader(true);
    console.log("id useEffect", id);
    instance
      .get(`/blog/${id}`, { withCredentials: true })
      .then((res) => {
        console.log("res updateBlog", res);
        console.log("res.data.Project updateBlog", res.data.data);
        console.log(
          "res.data.Project.content updateBlog",
          res.data.data.content
        );
        // console.log("res.data.Project.content updateBlog", JSON.parse(res.data.data.content))
        setShowLoader(false);
        setData(res.data.data);
        // console.log("res.data.blogs.tags",res.data.data.tags)
        let arr = [];
        res?.data?.data?.tags?.map((item) => {
           console.log("item tags:::::::::@@@####",item)
           console.log("item tags:::::::::@@@####",item._id)
          instance.get(`/tag/${item._id}`, { withCredentials: true }).then((res) => {
            // console.log("res.data$$$$$$$",res.data.data)
            // console.log("res.data$$$$$$$ id",res.data.data._id)
            // console.log("res.data$$$$$$$ tags_name",res.data.data.tags_name)
            arr.push({
              value: res.data.data._id,
              label: res.data.data.tags_name,
            });
          });
          
          
        });
        // console.log("res.data.data.propertyGallery",URL.createObjectURL(res.data.data.propertyGallery))
        console.log("arr*******************", arr);
        let mainTagsArr = []
        mainTagsArr.push({
          value : res?.data?.data?.mainTags?._id,
          label : res?.data?.data?.mainTags?.title

        })
        console.log("mainTagsArr**********",mainTagsArr)
        setDefaultTagsValue(arr);
        setSelectedOptions(arr)
        setDefaultMainTag(mainTagsArr)
        
        setValue("topic", res.data.data.topic);
        setValue("subTopic", res.data.data.subTopic);
        setValue("writer", res.data.data.writer);
        setValue("sources", res.data.data.sources);
        setImagePreview(res.data.data.propertyGallery);

        // setDefaultImagePreview('propertyGallery' , res.data.data.propertyGallery)

        setContent(JSON.parse(res.data.data.content));
        // console.log("res.data.data.propertyGallery" , res.data.data.propertyGallery)
        // setImagePreview('images' , res.data.data.propertyGallery)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [location.state]);

  useEffect(() => {
    listOfTags();
    listOfMainTags()
  }, []);

  // useEffect(() => {}, [content, data]);
  console.log("defaultTagsValue" ,  defaultTagsValue )
  const onSubmit = async (data) => {
    const Formdata = new FormData();
   
    console.log(defaultMainTag,"shivangi")
    Formdata.append("mainTags", defaultMainTag[0].value);
    Formdata.append("topic", data?.topic);
    Formdata.append("subTopic", data?.subTopic);

    Formdata.append("writer", data?.writer);
    Formdata.append("sources", data?.sources);
    Formdata.append("images", imageFile);

    // else{
    //   Formdata.append('images',data.propertyGallery);
    // }
    // Formdata.append('images', data.propertyGallery[0]);

    Formdata.append("content", JSON.stringify(content));
    let selectedList = [];
    selectedOptions?.map((ele) => {
      selectedList.push(ele.value);
    });
 

    for (let i = 0; i < selectedList.length; i++) {
      Formdata.append("tags", selectedList[i]);
      console.log("selectedList@@", selectedList);

    }
    // console.log("selectedOptions" , selectedOptions)
    // console.log("selectedOptions?.value   ,   defaultTagsValue?.value" , selectedOptions[0]?.label , selectedOptions[0]?.value, defaultTagsValue )
    // selectedOptions[0]?.value ? Formdata.append("tags", selectedOptions[0]?.value) : Formdata.append("tags", defaultTagsValue[0]?.value)

    // Formdata.append("tags", selectedOptions?.value) 
   
    try {
      const res = await instance.put(`/blog/${id}`, Formdata, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("blog is updated successfully");
        navigate("/blog");
      }
    } catch (err) {
      toast.error(err?.response?.message, { position: "top-center" });
      console.log("error", err);
    }
  };

  const listOfTags = async () => {
    try {
      let response = await instance.get(
        "/tag",
        { withCredentials: true }
      );
      let arr = [];
      response?.data?.Tags?.map((el) => {
        arr.push({ value: el._id, label: el.tags_name });
      });
      setListOfTagsData(arr);
      
    } catch (err) {
      console.log("err", err);
    }
  };

  const listOfMainTags = async () => {
    try {
      let responseMainTag = await instance.get(
        "/mainTag",
        { withCredentials: true }
      );
      console.log("responseMainTag****" , responseMainTag)
      let mainTagArray = [];
      responseMainTag?.data?.data?.map((el) => {
        console.log("el main tag",el)
        mainTagArray.push({ value: el._id, label: el.title });
      });
      console.log("mainTagArray&&&&&&&",mainTagArray)
      setListOfMainTag(mainTagArray);
      
    } catch (err) {
      console.log("err", err);
    }
  };



  const handleImageChange = (e) => {
    // setIsImageSelected(!!e.target.value); // !! converts the value to a boolean
    // reader.onloadend = () => {
    //   console.log("reader", reader);
    //   console.log("reader.result", reader.result);
    //   setImagePreview(reader.result);
    // };
    // reader.readAsDataURL(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      setImagePreview(null); // Clear the preview if no file is selected
      setImageFile(null);
    }
  };
  // console.log("IsImageSelected", isImageSelected);

  const handleSelect = (data) => {
    console.log("data" , data)
    setSelectedOptions(data);
  };
  const handleSelectMainTag = (data) => {
    console.log("data maintag handle select" , data)
    setSelectedOptionsMainTag(data);
    setDefaultMainTag([data])
  };
  console.log("defaultTagsValue", defaultTagsValue);
  const handleEditGalleryClick = (e) => {
    // propertyGalleryField.current.click()
    e.preventDefault();
    propertyGalleryField.current.click();
  };
  // console.log("imageFile", imageFile);
  // console.log("ImagePreview", imagePreview);
const handleDrop = (e)=>{
  e.preventDefault()
  let file = e.dataTransfer.files[0]
  setImageFile(file)
  setImagePreview(URL.createObjectURL(file))
}
const handleDrag = (e)=>{
  e.preventDefault()
}
console.log("listOfTagsData******",listOfTagsData)
console.log("listOfMainTag******", listOfMainTag)
console.log("selectedOptions" , selectedOptions)
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
        <form
          className="row g-3"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            border: "2px solid  #E4E4E4",
            width: "80%",
            margin: "1rem auto",
            padding: "1rem",
          }}
        >
          <div
            className="col-12 d-flex flex-row-reverse"
            style={{ borderBottom: "2px solid #E4E4E4", padding: "1rem" }}
          >
            <button
              type="submit"
              className="btn btn-primary "
              disabled={showLoader}
              style={{
                borderBottom: "2px solid #E4E4E4",
                paddingBottom: "0.5rem",
              }}
            >
              Update
            </button>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputTopic" className="form-label">
              Main Tag
            </label>
            <div className="dropdown-container">
              <Select
                defaultValue={defaultMainTag}
                options={listOfMainTag}
                placeholder="Select any Main Tag"
                value={selectedOptionsMainTag}
                onChange={handleSelectMainTag}
                isSearchable={true}
                // isMulti
              />
            </div>
          </div>



          <div className="col-md-12">
            <label htmlFor="inputTopic" className="form-label">
              Tags
            </label>
            <div className="dropdown-container">
              <Select
                defaultValue={selectedOptions}
                options={listOfTagsData}
                placeholder="Select any tags"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              />
            </div>
          </div>

          <div className="col-md-12">
            <label htmlFor="inputTopic" className="form-label">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              onChange={(e) => {
                setValue("topic", e.target.value);
              }}
              id="inputTopic"
              {...register("topic")}
              style={{ width: "85%" }}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputTopic" className="form-label">
              Subtopic
            </label>
            <input
              type="text"
              name="subTopic"
              onChange={(e) => {
                setValue("subTopic", e.target.value);
              }}
              id="inputTopic"
              {...register("subTopic")}
              style={{ width: "85%" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputWriter" className="form-label">
              Writer
            </label>
            <input
              type="text"
              name="writer"
              onChange={(e) => {
                setValue("writer", e.target.value); // Use setValue to update the form state
              }}
              id="inputWriter"
              {...register("writer")}
              style={{ width: "85%" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputWriter" className="form-label">
              Sources
            </label>
            <input
              type="text"
              name="sources"
              onChange={(e) => {
                setValue("sources", e.target.value); // Use setValue to update the form state
              }}
              id="inputWriter"
              {...register("sources")}
              style={{ width: "85%" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputImage" className="form-label">
              <span style={{ marginRight: "458px" }}>Image</span>
              <button
                className="btn"
                onClick={(e) => {
                  handleEditGalleryClick(e);
                }}
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
            </label>
             <div  
             onDrop={handleDrop}
            onDragOver={handleDrag}
             >

            <img
              src={imagePreview}
              alt="Image"
              className="image"
              style={{ width: "25rem", height: "15rem" }}
            />
             </div>

            {/* <img src={data.propertyGallery} alt="Image" className="image" style={{ width: "15rem", height: "15rem" }} /> */}
            <input
              type="file"
              name="propertyGallery"
              id="file-input"
              style={{ display: "none" }}
              // {...register("propertyGallery")}

              onChange={(e) => {
                handleImageChange(e);
              }}
              ref={propertyGalleryField}

              // style={{ width: "85%" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputContent" className="form-label">
              Content
            </label>
            <JoditEditor
              // value = {ReactHtmlParser(JSON.parse(DefaultContent))}
              // defaultValue = {DefaultContent}
              value={content}
              ref={editor}
              onChange={setContent} // Update the content state on change
            />
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateBlog;
