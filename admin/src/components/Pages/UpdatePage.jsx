import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { instance } from "../../services/axiosInstance";
import axios from "axios";
import animation from "../../Lottie/Loader.json";
import Lottie from "react-lottie";

const UpdatePage = () => {
  let location = useLocation();
  let id = location.state;
  console.log("location", location);

  const { register, handleSubmit, setValue } = useForm();
  const [data, setData] = useState([]);
  // const [isImageSelected, setIsImageSelected] = useState(false)
  const [content, setContent] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();
  const reader = new FileReader();
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
    getSingleData();
  }, [location.state]);

  const getSingleData = async () => {
    try {
      const res = await instance.get(`/pages/${id}`, { withCredentials: true });

      setShowLoader(false);
      setData(res.data.page);
      setValue("page_name", res.data.page.page_name);
      setContent(JSON.parse(res.data.page.content));
    } catch (err) {
      console.log("err", err);
    }
  };
  // useEffect(() => {
  // }, [content, data])
  const onSubmit = async (data) => {
    let obj = {};
    obj.page_name = data.page_name;
    obj.content = JSON.stringify(content);
    try {
      const res = await instance.put(`/pages/${id}`, obj, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("page is updated successfully");
        navigate("/pages");
      }
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
      console.log("error", err);
    }
  };

  return (
    <>
      {showLoader ? (
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
              Page Name
            </label>
            <input
              type="text"
              name="page_name"
              onChange={(e) => {
                setValue("page_name", e.target.value);
              }}
              id="inputTopic"
              {...register("page_name")}
              style={{ width: "85%" }}
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

export default UpdatePage;
