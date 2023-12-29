import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import AppContext from "../../features/ContextApi/ContextForProjects";
import { useContext } from "react";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  const { isLoadingTag, setIsLoadingTag, setProjectState } =
    useContext(AppContext);
  const [content, setContent] = useState("");
  const [tagsValue, setTagsValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [IsImageSelected, setIsImageSelected] = useState();
  const [ImagePreview, setImagePreview] = useState();
  const [ImageFile , setImageFile] = useState()
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(false);
  const [createTag, setCreateTag] = useState([]);
  const [afterAddedNewTag, setAfterAddedNewTag] = useState(false);
  const [isType, setIsType] = useState(false);
  // const refreshPage = useRef()
  const editor = useRef(null);
  const navigate = useNavigate();
  // const reader = new FileReader();
  const ImageField = useRef()
  useEffect(() => {
    handleTags();
  }, []);
  // useEffect(()=>{
  //   if(afterAddedNewTag == true){
  //     handleTags();
  //   }
  // },[afterAddedNewTag])
  const onSubmit = async (data) => {
    const isValid = await trigger();
    const Formdata = new FormData();
    // console.log("dataImage", data.propertyGallery[0]);
    // console.log("content", content);
    // console.log("data.tags", data.tags)
    let selectedList = [];
    selectedOptions.map((ele) => {
      // console.log("ele selectedOptions ", ele);
      selectedList.push(ele.value);
    });
    // console.log("selectedList::::", selectedList);
    // console.log("data.propertyGallery[0]:", data.propertyGallery[0]);
    if (isValid) {
      // Formdata.append('tags', selectedList)
      Formdata.append("topic", data.topic);
      Formdata.append("subTopic", data.subTopic);
      Formdata.append("writer", data.writer);
      Formdata.append("sources", data.sources);
      Formdata.append("images", ImageFile);
      Formdata.append("content", JSON.stringify(content));
      for (let i = 0; i < selectedList.length; i++) {
        Formdata.append("tags", selectedList[i]);
        console.log("fdjkgvugfk");
      }
      // console.log(selectedList.length,selectedList.length)
      setLoading(true);
      // {
      //   headers: { "Content-Type": "multipart/form-data" },
      // }
      await instance
        .post("/blog", Formdata, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          console.log("res", res);
          console.log("res.data addBlog", res.data);
          // alert("blog is created successfully")
          toast.success("blog is created successfully", {
            position: "top-center",
          });
          navigate("/blog");
        })
        .catch((err) => {
          toast.error(err.message, { position: "top-center" });
          console.log("error", err);
        });
    }
  };
  const handleTags = async () => {
    try {
      const response = await instance.get("/tag", { withCredentials: true });
      console.log("response.data.Tags ::::::::::####", response.data.Tags);
      let dataList = response?.data?.Tags;
      let arr = [];
      dataList?.map((e1) => {
        console.log("e1", e1);
        arr.push({ value: e1._id, label: e1.tags_name });
      });
      setTagsValue(arr);
      // console.log("response tags", response.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSelect = (data) => {
    console.log("data selected", data);
    setSelectedOptions(data);
  };
  console.log("selectedOptions", selectedOptions);

  const handleImageChange = (e) => {
    // setIsImageSelected(!!e.target.value); // !! converts the value to a boolean
    // reader.onloadend = () => {
    //   console.log("reader", reader);
    //   console.log("reader.result", reader.result);
    //   setImagePreview(reader.result);
    // };
    // reader.readAsDataURL(e.target.files[0]);
    const file = e.target.files[0]
    setImagePreview(URL.createObjectURL(file))
    setImageFile(file)
  };
  console.log("IsImageSelected ::::::::::%%%", IsImageSelected);

  const handleInputChange = (inputvalue) => {
    if (inputvalue.length > 0) {
      const createObj = { tags_name: inputvalue };
      console.log("createObj:::::::::::", createObj);
      setCreateTag(createObj);
      setIsType(true);
    } else {
      setIsType(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setLoadingType(true);
      try {
        const response = await instance.post("/tag", createTag, {
          withCredentials: true,
        });
        setLoadingType(false);
        setIsLoadingTag(1);
        toast.success("Tag Created Successfully", {
          position: "top-center",
        });
      } catch (err) {
        console.log("err", err);
        setLoadingType(false);
      }
    }
  };
  useEffect(() => {
    if (isLoadingTag === 1) {
      handleTags();
      setIsLoadingTag(0);
    }
  }, [isLoadingTag]);
const handleClick = ()=>{
  ImageField.current.click()
}
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ClipLoader color="#52bfd9" size={150} />
          <p style={{ marginTop: "10px" }}>Please wait...</p>
        </div>
      ) : (
        <form
          className="row g-3"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            border: "2px solid #E4E4E4",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <div
            className="col-12 d-flex flex-row-reverse "
            style={{
              borderBottom: "2px solid #E4E4E4",
              paddingBottom: "0.5rem",
            }}
          >
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="col-12">
            <label htmlFor="inputWriter" className="form-label">
              Tags
            </label>
            <div className="dropdown-container">
              {loadingType ? (
                <>
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  <Select
                    options={tagsValue}
                    placeholder="Select any Tags"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                    onInputChange={handleInputChange}
                    onKeyDown={isType ? handleKeyDown : ""}
                    // onClick={refreshPage}
                  />
                </>
              )}
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
                setValue("topic", e.target.value); // Use setValue to update the form state
              }}
              className={`form-control ${errors.topic ? "is-invalid" : ""}`}
              id="inputTopic"
              {...register("topic", { required: true })}
            />
            {errors.topic && <p style={{ color: "red" }}>Topic is required.</p>}
          </div>

          <div className="col-12">
            <label htmlFor="inputWriter" className="form-label">
              Subtopic
            </label>
            <input
              type="text"
              name="subTopic"
              onChange={(e) => {
                setValue("subTopic", e.target.value); // Use setValue to update the form state
              }}
              className={`form-control ${errors.subTopic ? "is-invalid" : ""}`}
              id="inputWriter"
              {...register("subTopic", { required: true })}
            />
            {errors.subTopic && (
              <p style={{ color: "red" }}>Subtopic is required.</p>
            )}
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
              className={`form-control ${errors.writer ? "is-invalid" : ""}`}
              id="inputWriter"
              {...register("writer", { required: true })}
            />
            {errors.writer && (
              <p style={{ color: "red" }}>Writer is required.</p>
            )}
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
              className={`form-control ${errors.sources ? "is-invalid" : ""}`}
              id="inputWriter"
              {...register("sources", { required: true })}
            />
            {errors.sources && (
              <p style={{ color: "red" }}>Sources is required.</p>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="inputImage" className="form-label">

            <span style={{ marginRight: "258px" }}>Image</span>
              <button className ='btn' onClick={handleClick}>
              <i class="fa-solid fa-arrow-up-from-bracket fa-xl"></i>
              </button>
            </label>
            {ImagePreview ? (
              <img
                src={ImagePreview}
                alt="Image"
                className="image"
                style={{ width: "15rem", height: "15rem" }}
              />
            ) : (
              <img
                src={
                  "https://icones.pro/wp-content/uploads/2021/06/icone-d-image-bleue.png"
                }
                alt="Image"
                className="image"
                style={{ width: "15rem", height: "15rem" }}
              />
            )}
            <input
              type="file"
              name="propertyGallery"
              id="file-input"
              style={{display:"none"}}
              // No need for the onChange event as file input doesn't need it.
              // className={`form-control ${
              //   errors.propertyGallery ? "is-invalid" : ""
              // }`}
             
              // {...register("propertyGallery", { required: true })}
              onChange={(e)=>{handleImageChange(e)}}
              ref = {ImageField}
            />
            {!ImagePreview && errors.propertyGallery && (
              <p style={{ color: "red" }}>Image is required.</p>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="inputContent" className="form-label">
              Content
            </label>

            <JoditEditor
              value={content}
              ref={editor}
              onChange={setContent} // Update the content state on change
            />
            {errors.content && (
              <p style={{ color: "red" }}>Content is required.</p>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default AddBlog;